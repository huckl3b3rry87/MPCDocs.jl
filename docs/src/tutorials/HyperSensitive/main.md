# HyperSensitive

This problem can be found [here](http://www.gpops2.com/Examples/Brachistochrone.html).


## Packages that will be used

```@example HyperSensitive
using NLOptControl
nothing # hide
```

## Differential Equations

```@example HyperSensitive
de=[:(-x1[j]^3+u1[j])]
nothing # hide
```

## Define and Configure the Problem:
```@example HyperSensitive
n=define!(de;numStates=1,numControls=1,X0=[1.5],XF=[1.],XL=[NaN],XU=[NaN],CL=[NaN],CU=[NaN])
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
optimize!(n);
nothing # hide
```
## Post Process
```@example HyperSensitive
using PrettyPlots
allPlots(n)
```
