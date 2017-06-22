# Moon Lander

This problem can be found [here](http://www.gpops2.com/Examples/MoonLander.html).

## Packages that will be used
```@example MoonLander
using NLOptControl
nothing # hide
```

## Differential Equations
```@example MoonLander
de=[:(x2[j]),:(u1[j]-1.625)]
nothing # hide
```

## Define and Configure the Problem:
```@example MoonLander
n=define(de;numStates=2,numControls=1,X0=[10.,-2],XF=[0.,0.],XL=[NaN,NaN],XU=[NaN,NaN],CL=[0.],CU=[3.]);
configure!(n,Nck=[10,10,10,10];(:finalTimeDV=>true));
nothing # hide
```

## Additional information
```@example MoonLander
names=[:h,:v]; descriptions = ["h(t)","v(t)"]; stateNames!(n,names,descriptions);
```
## Objective Function
```@example MoonLander
obj=integrate!(n,n.r.u[:,1];C=1.0,(:variable=>:control),(:integrand=>:default));
@NLobjective(n.mdl, Min, obj);
nothing # hide
```
## Optimize
```@example MoonLander
optimize!(n);
nothing # hide
```

## Post Process
```@example MoonLander
using PrettyPlots
allPlots(n)
```
