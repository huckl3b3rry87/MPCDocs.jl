# Rocket

This problem can be found [here](https://github.com/JuliaOpt/juliaopt-notebooks/blob/master/notebooks/JuMP-Rocket.ipynb).

## Packages that will be used
```@example Rocket
using NLOptControl
nothing # hide
```

## Differential Equations
```@example Rocket
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

const EP=2*eps()
function Rocket{T<:Any}(n::NLOpt,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations
  if n.s.integrationMethod==:tm; L=size(x)[1]; else; L=size(x)[1]-1; end
  dx=Array(Any,L,n.numStates);
  Q=5;
  I_t=@NLexpression(n.mdl, [j=1:L], ((Q-x[j,1])^3+x[j,1]^3)/3*sin(x[j,5])^2 );
  I_p=@NLexpression(n.mdl, [j=1:L], ((Q-x[j,1])^3+x[j,1]^3)/3 );

  dx[:,1]=@NLexpression(n.mdl, [j=1:L], x[j,2]);
  dx[:,2]=@NLexpression(n.mdl, [j=1:L], u[j,1]/Q);
  dx[:,3]=@NLexpression(n.mdl, [j=1:L], x[j,4]);
  dx[:,4]=@NLexpression(n.mdl, [j=1:L], u[j,2]/(I_t[j]+EP));
  dx[:,5]=@NLexpression(n.mdl, [j=1:L], x[j,6]);
  dx[:,6]=@NLexpression(n.mdl, [j=1:L], u[j,3]/(I_p[j]+EP));
  return dx
end
nothing # hide
```

## Define and Configure the Problem:
```@example Rocket
n=define!(Rocket;numStates=6,numControls=3,X0=[9/2,0.0,0.0,0.0,pi/4,0.0],XF=[9/2,0.0,2*pi/3,0.0,pi/4,0.0],XL=[NaN,NaN,NaN,0.0,NaN,NaN],XU=[NaN,NaN,NaN,1.0,NaN,NaN],CL=[-1.,-1.,-1.],CU=[1.,1.,1.])
configure!(n;(:finalTimeDV=>true))
nothing # hide
```

## Objective Function
```@example Rocket
@NLobjective(n.mdl,Min,n.tf);
nothing # hide
```

## Optimize
```@example Rocket
optimize!(n);
nothing # hide
```

## Post Process
```@example Rocket
using PrettyPlots
allPlots(n)
```
