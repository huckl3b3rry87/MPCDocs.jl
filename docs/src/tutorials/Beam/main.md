# Beam Problem

*   An optimal control version of the Singly Supported NonLinear BEAM problem.
*   The energy of a beam of length 1 compressed by a force P is to be minimized.  
*   The control variable is the derivative of the deflection angle.

This problem can be found [here](https://github.com/JuliaOpt/JuMP.jl/blob/master/examples/optcontrol.jl).

## Packages that will be used
```@example Beam
using NLOptControl
nothing # hide
```

## Differential Equations
```@example Beam
de=[:(sin(x2[j])),:(u1[j])]
nothing # hide
```

## Define and Configure the Problem:
```@example Beam
n=define(de;numControls=1,X0=[NaN,NaN],XF=[NaN,NaN],XL=[-0.05,-1.0],XU=[-0.05,1.0],CL=[NaN],CU=[NaN]);
configure!(n;(:integrationScheme=>:trapezoidal),(:finalTimeDV=>false),(:tf=>1.0));
nothing # hide
```

## Objective Function
```@example Beam
obj1=integrate!(n,n.r.u[:,1];(:variable=>:control),(:integrand=>:squared));
obj2=integrate!(n,n.r.x[:,2];C=350.,(:variable=>:state),(:integrand=>:cos));
@NLobjective(n.mdl,Min,obj1+obj2);
nothing # hide
```
## Optimize
```@example Beam
optimize!(n);
nothing # hide
```

## Post Process
```@example Beam
using PrettyPlots
allPlots(n)
```
