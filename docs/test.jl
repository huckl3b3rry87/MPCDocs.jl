using JuMP
using Ipopt
# Create JuMP model, using Ipopt as the solver
mod = Model(solver=IpoptSolver(print_level=0))

# Constants
# Note that all parameters in the model have been normalized
# to be dimensionless. See the COPS3 paper for more info.
h_0 = 1    # Initial height
v_0 = 0    # Initial velocity
m_0 = 1    # Initial mass
g_0 = 1    # Gravity at the surface

# Parameters
T_c = 3.5  # Used for thrust
h_c = 500  # Used for drag
v_c = 620  # Used for drag
m_c = 0.6  # Fraction of initial mass left at end

# Derived parameters
c     = 0.5*sqrt(g_0*h_0)  # Thrust-to-fuel mass
m_f   = m_c*m_0            # Final mass
D_c   = 0.5*v_c*m_0/g_0    # Drag scaling
T_max = T_c*g_0*m_0        # Maximum thrust

n = 800   # Time steps

@variables(mod, begin
    Δt ≥ 0, (start = 1/n) # Time step
    # State variables
    v[0:n] ≥ 0            # Velocity
    h[0:n] ≥ h_0          # Height
    m_f ≤ m[0:n] ≤ m_0    # Mass
    # Control
    0 ≤ T[0:n] ≤ T_max    # Thrust
end)

# Objective: maximize altitude at end of time of flight
@objective(mod, Max, h[n])

# Initial conditions
@constraints(mod, begin
    v[0] == v_0
    h[0] == h_0
    m[0] == m_0
    m[n] == m_f
end)

# Forces
# Drag(h,v) = Dc v^2 exp( -hc * (h - h0) / h0 )
@NLexpression(mod, drag[j=0:n], D_c*(v[j]^2)*exp(-h_c*(h[j]-h_0)/h_0))
# Grav(h)   = go * (h0 / h)^2
@NLexpression(mod, grav[j=0:n], g_0*(h_0/h[j])^2)
# Time of flight
@NLexpression(mod, t_f, Δt*n)

# Dynamics
for j in 1:n
    # h' = v
    # Rectangular integration
    # @NLconstraint(mod, h[j] == h[j-1] + Δt*v[j-1])
    # Trapezoidal integration
    @NLconstraint(mod,
        h[j] == h[j-1] + 0.5*Δt*(v[j]+v[j-1]))

    # v' = (T-D(h,v))/m - g(h)
    # Rectangular integration
    # @NLconstraint(mod, v[j] == v[j-1] + Δt*(
    #                 (T[j-1] - drag[j-1])/m[j-1] - grav[j-1]))
    # Trapezoidal integration
    @NLconstraint(mod,
        v[j] == v[j-1] + 0.5*Δt*(
            (T[j  ] - drag[j  ] - m[j  ]*grav[j  ])/m[j  ] +
            (T[j-1] - drag[j-1] - m[j-1]*grav[j-1])/m[j-1] ))

    # m' = -T/c
    # Rectangular integration
    # @NLconstraint(mod, m[j] == m[j-1] - Δt*T[j-1]/c)
    # Trapezoidal integration
    @NLconstraint(mod,
        m[j] == m[j-1] - 0.5*Δt*(T[j] + T[j-1])/c)
end

# Provide starting solution
for k in 0:n
    setvalue(h[k], 1)
    setvalue(v[k], (k/n)*(1 - (k/n)))
    setvalue(m[k], (m_f - m_0)*(k/n) + m_0)
    setvalue(T[k], T_max/2)
end

# Solve for the control and state
println("Solving...")
@time status = solve(mod)

# Display results
println("Solver status: ", status)
println("Max height: ", getobjectivevalue(mod))
