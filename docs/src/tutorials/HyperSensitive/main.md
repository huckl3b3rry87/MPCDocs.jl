# HyperSensitive

This problem can be found [here](http://www.gpops2.com/Examples/Brachistochrone.html).


## Packages that will be used

```@example HyperSensitive
using NLOptControl,JuMP,PrettyPlots,Plots;gr()
nothing # hide
```

## Differential Equations

```@example HyperSensitive
function HyperSensitive{T<:Any}(n::NLOpt,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations
  if n.s.integrationMethod==:tm; L=size(x)[1]; else; L=size(x)[1]-1; end
  dx=Array(Any,L,n.numStates);
  dx[:,1]=@NLexpression(n.mdl, [j=1:L], -x[j,1]^3 + u[j,1] );
  return dx
end
nothing # hide
```

## Define and Configure the Problem:
```@example HyperSensitive
n=define!(;stateEquations=HyperSensitive,numStates=1,numControls=1,X0=[1.5],XF=[1.],XL=[NaN],XU=[NaN],CL=[NaN],CU=[NaN])
configure!(n,Nck=[20,3,3,3,3,3,3,3,3,3,3,20];(:finalTimeDV=>false),(:tf=>10000.0))
nothing # hide
```

## Objective Function
```@example HyperSensitive
obj1=integrate!(n,n.r.x[:,1];C=0.5,(:variable=>:state),(:integrand=>:squared))
obj2=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared))
```

## Optimize
```@example HyperSensitive
optimize!(n)
nothing # hide
```
## Post Process
```@example HyperSensitive
allPlots(n)
```
