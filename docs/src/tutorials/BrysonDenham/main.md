# Bryson Denham

This problem can be found [here](http://www.gpops2.com/Examples/Bryson-Denham.html).

## Packages that will be used
```@example BrysonDenham
using NLOptControl
nothing # hide
```

## Differential Equations
```@example BrysonDenham
de=[:(x2[j]),:(u1[j])]
nothing # hide
```

## Define and Configure the Problem:
```@example BrysonDenham
n=define(de;numStates=2,numControls=1,X0=[0.,1],XF=[0.,-1.],XL=[0.,NaN],XU=[1/9,NaN],CL=[NaN],CU=[NaN]);
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
using PrettyPlots
allPlots(n)
```
