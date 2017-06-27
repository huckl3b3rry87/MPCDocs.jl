# Rocket

This problem can be found [here](https://github.com/JuliaOpt/juliaopt-notebooks/blob/master/notebooks/JuMP-Rocket.ipynb).

## Packages that will be used
```@example Rocket
using NLOptControl
nothing # hide
```

## Constants
```@example Rocket
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
nothing # hide
```

## Differential Equations
```@setup Rocket
dx=[:(x2[j]);
:((u1[j]-($D_c*x2[j]^2*exp(-$h_c*(x1[j]-$h_0)/$h_0)))/x3[j]-($g_0*($h_0/x1[j])^2));
:(-u1[j]/$c)];
```

```julia
Drag=:($D_c*x2[j]^2*exp(-$h_c*(x1[j]-$h_0)/$h_0));
Grav=:($g_0*($h_0/x1[j])^2);
dx=Array{Expr}(3,);
dx[1]=:(x2[j]);
dx[2]=:((u1[j]-$Drag)/x3[j]-$Grav)
dx[3]=:(-u1[j]/$c);
```


## Define and Configure the Problem:
```@example Rocket
n=define(dx;numStates=3,numControls=1,X0=[h_0,v_0,m_0],XF=[NaN,NaN,m_f],XL=[h_0,v_0,m_f],XU=[NaN,NaN,m_0],CL=[0.0],CU=[T_max]);
configure!(n;(:finalTimeDV=>true));
nothing # hide
```
## Optional Plot Labels
```@example Rocket
names=[:h,:v,:m]; descriptions=["height (t)","velocity (t)","mass (t)"];
stateNames!(n,names,descriptions);
names=[:T]; descriptions=["thrust (t)"];
controlNames!(n,names,descriptions);
```

## Objective Function
```@example Rocket
names=[:h,:v,:m]; descriptions=["height (t)","velocity (t)","mass (t)"];
stateNames!(n,names,descriptions);
names=[:T]; descriptions=["thrust (t)"];
controlNames!(n,names,descriptions);
@NLobjective(n.mdl,Max,n.r.x[end,1]);
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
