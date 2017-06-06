# Brachistochrone


This problem can be found [here](http://www.gpops2.com/Examples/Brachistochrone.html).



## Packages that will be used
```@example Brachistochrone
using NLOptControl,JuMP,PrettyPlots,Plots;gr()
nothing # hide
```

## Differential Equations
```@example Brachistochrone
function Brachistochrone{T<:Any}(n::NLOpt,x::Array{T,2},u::Array{T,2})
  if n.s.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end
  dx = Array(Any,L,n.numStates)
  dx[:,1]=@NLexpression(n.mdl, [j=1:L], x[j,3]*sin(u[j,1]) );
  dx[:,2]=@NLexpression(n.mdl, [j=1:L], x[j,3]*cos(u[j,1]) );
  dx[:,3]=@NLexpression(n.mdl, [j=1:L], 9.81*cos(u[j,1]) );
  return dx
end
nothing # hide
```

## Define and Configure the Problem:
```@example Brachistochrone
n=define!(;stateEquations=Brachistochrone,numStates=3,numControls=1,X0=[0.0,0.0,0.0],XF=[2.,2.,NaN],XL=[-NaN,-NaN,-NaN],XU=[NaN,NaN,NaN],CL=[-NaN],CU=[NaN]);
configure!(n,Nck=[100];(:finalTimeDV=>true));
nothing # hide

```
## Additional Information
```@example Brachistochrone
names=[:x,:y,:v]; descriptions=["x(t)","y(t)","v(t)"];
stateNames!(n,names,descriptions);
names=[:u]; descriptions=["u(t)"];
controlNames!(n,names,descriptions);
nothing # hide
```

## Objective Function
```@example Brachistochrone
obj=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared));
@NLobjective(n.mdl,Min,n.tf);
nothing # hide
```

## Optimize
```@example Brachistochrone
optimize!(n);
nothing # hide
```

## Post Process
```@example Brachistochrone
allPlots(n)
```
