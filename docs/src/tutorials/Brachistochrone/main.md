# Brachistochrone

This problem can be found [here](http://www.gpops2.com/Examples/Brachistochrone.html).

## Packages that will be used
```@example Brachistochrone
using NLOptControl
nothing # hide
```

## Differential Equations
```@example Brachistochrone
de=[:(x3[j]*sin(u1[j])),:(x3[j]*cos(u1[j])),:(9.81*cos(u1[j]))]
nothing # hide
```

## Define and Configure the Problem:
```@example Brachistochrone
n=define(de;numControls=1,X0=[0.0,0.0,0.0],XF=[2.,2.,NaN],XL=[-NaN,-NaN,-NaN],XU=[NaN,NaN,NaN],CL=[-NaN],CU=[NaN]);
configure!(n;(:Nck=>[100]),(:finalTimeDV=>true));
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
using PrettyPlots
allPlots(n)
```
