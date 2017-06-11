using NLOptControl,JuMP,PrettyPlots,Plots;pyplot()

## ref: https://github.com/JuliaOpt/juliaopt-notebooks/blob/master/notebooks/JuMP-Rocket.ipynb
# Constants
# Note that all parameters in the model have been normalized
# to be dimensionless. See the COPS3 paper for more info.
const h_0 = 1.    # Initial height
const v_0 = 0.    # Initial velocity
const m_0 = 1.    # Initial mass
const g_0 = 1.    # Gravity at the surface

# Parameters
const T_c = 3.5  # Used for thrust
const h_c = 500  # Used for drag
const v_c = 620  # Used for drag
const m_c = 0.6  # Fraction of initial mass left at end

# Derived parameters
const c     = 0.5*sqrt(g_0*h_0)  # Thrust-to-fuel mass
const m_f   = m_c*m_0            # Final mass
const D_c   = 0.5*v_c*m_0/g_0    # Drag scaling
const T_max = T_c*g_0*m_0        # Maximum thrust
###

function Rocket{T<:Any}(n::NLOpt,x::Array{T,2},u::Array{T,2})
  if n.s.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end
  dx = Array(Any,L,n.numStates);

  # Forces
  @NLexpression(n.mdl, drag[j=1:L], D_c*(x[j,2]^2)*exp(-h_c*(x[j,1]-h_0)/h_0))
  @NLexpression(n.mdl, grav[j=1:L], g_0*(h_0/x[j,1])^2)

  dx[:,1]=@NLexpression(n.mdl, [j=1:L], x[j,2] );                          # height
  dx[:,2]=@NLexpression(n.mdl, [j=1:L], (u[j,1]-drag[j])/x[j,3]-grav[j] ); # velocity
  dx[:,3]=@NLexpression(n.mdl, [j=1:L], -u[j,1]/c );                       # mass
  return dx
end

N=800;
n=define!(stateEquations=Rocket;numStates=3,numControls=1,X0=[h_0,v_0,m_0],XF=[NaN,NaN,m_f],XL=[h_0,v_0,m_f],XU=[NaN,NaN,m_0],CL=[0.0],CU=[T_max]);
#configure!(n,N=N;(:integrationMethod=>:tm),(:integrationScheme=>:bkwEuler),(:finalTimeDV=>true));
configure!(n,N=N;(:integrationMethod=>:tm),(:integrationScheme=>:trapezoidal),(:finalTimeDV=>true));
#configure!(n,Nck=[20];(:finalTimeDV=>true));
#configure!(n,Nck=[5,5,5,5];(:finalTimeDV=>true));

# Provide starting solution
for j in 1:n.numStatePoints
    setvalue(n.r.x[j,1], 1)
    setvalue(n.r.x[j,2], (j/N)*(1 - (j/N)))
    setvalue(n.r.x[j,3], (m_f - m_0)*(j/N) + m_0)
end
for j in 1:n.numControlPoints; setvalue(n.r.u[j,1], T_max/2); end

names=[:h,:v,:m]; descriptions=["height (t)","velocity (t)","mass (t)"];
stateNames!(n,names,descriptions);
names=[:T]; descriptions=["thrust (t)"];
controlNames!(n,names,descriptions);

@NLobjective(n.mdl,Max,n.r.x[end,1]);

@time optimize!(n);
allPlots(n)
