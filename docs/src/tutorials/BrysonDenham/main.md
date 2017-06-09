# Bryson Denham

This problem can be found [here](http://www.gpops2.com/Examples/Brachistochrone.html).

This example is using the `@DiffEq()` to define the differential equations, but currently this macro is limited to linear odes.

## Packages that will be used
```@example BrysonDenham
using NLOptControl,JuMP,PrettyPlots,Plots;gr()
nothing # hide
```

## Differential Equations
```@example BrysonDenham
function BrysonDenham{T<:Any}(n::NLOpt,x::Array{T,2},u::Array{T,2})
  if n.s.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end
  dx = Array(Any,L,n.numStates)
  dx[:,1]=@NLexpression(n.mdl, [j=1:L], x[j,2] );
  dx[:,2]=@NLexpression(n.mdl, [j=1:L], u[j,1] );
  return dx
end
nothing # hide
```

## Define and Configure the Problem:
```@example BrysonDenham
n=define!(;stateEquations=BrysonDenham,numStates=2,numControls=1,X0=[0.,1],XF=[0.,-1.],XL=[0.,NaN],XU=[1/9,NaN],CL=[NaN],CU=[NaN]);
configure!(n;(:finalTimeDV=>false),(:tf=>1.0));
nothing # hide
```

## Objective Function
```@example BrysonDenham
obj=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared));
@NLobjective(n.mdl,Min,obj);
nothing # hide
```
## Optimize
```@example BrysonDenham
optimize!(n);
nothing # hide
```

## Post Process
```@example BrysonDenham
allPlots(n)
```
