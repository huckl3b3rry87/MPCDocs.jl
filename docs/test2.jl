using NLOptControl,JuMP,PrettyPlots,Plots;gr()

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

# Forces
# Drag(h,v) = Dc v^2 exp( -hc * (h - h0) / h0 )
@NLexpression(mod, drag[j=0:n], D_c*(v[j]^2)*exp(-h_c*(h[j]-h_0)/h_0))
# Grav(h)   = go * (h0 / h)^2
@NLexpression(mod, grav[j=0:n], g_0*(h_0/h[j])^2)
# Time of flight
@NLexpression(mod, t_f, Δt*n)

function Rocket{T<:Any}(n::NLOpt,x::Array{T,2},u::Array{T,2})
  if n.s.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end
  dx = Array(Any,L,n.numStates)
  dx[:,1]=@NLexpression(n.mdl, [j=1:L], x[j,2] );
  dx[:,2]=@NLexpression(n.mdl, [j=1:L], (T[j]-drag[j])/m[j]-grav[j] );
  dx[:,3]=@NLexpression(n.mdl, [j=1:L], -T[j]/c );
  return dx
end

n=define!(stateEquations=Rocket;numStates=3,numControls=1,X0=[0.0,0.0,0.0],XF=[2.,2.,NaN],XL=[-NaN,-NaN,-NaN],XU=[NaN,NaN,NaN],CL=[-NaN],CU=[NaN]);
configure!(n,Nck=[100];(:finalTimeDV=>true));
names=[:x,:y,:v]; descriptions=["x(t)","y(t)","v(t)"];
stateNames!(n,names,descriptions);
names=[:u]; descriptions=["u(t)"];
controlNames!(n,names,descriptions);

obj=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared));
@NLobjective(n.mdl,Min,n.tf);
optimize!(n);
allPlots(n)
