# RobotArm

This problem can be found [here](http://www.gpops2.com/Examples/RobotArm.html).
 although that example is missing initial and final state constraints and limits on x4


## Packages that will be used
```@example RobotArm
using NLOptControl
nothing # hide
```

## Differential Equations
```@example RobotArm
# constants
EP=2*eps(); # to avoid divide/0
Q=5;

# Diff Eqs
dx=[:(x2[j]);
    :(u1[j]/$Q);
    :(x4[j]);
    :(u2[j]/(((($Q-x1[j])^3+x1[j]^3)/3*sin(x5[j])^2)+$EP));
    :(x6[j]);
    :(u3[j]/(((($Q-x1[j])^3+x1[j]^3)/3 )+$EP))]
nothing # hide
```


# NOTE
In practice, the differential equations do not have to be written in a giant array of expressions. They can be broken up as:
```@example RobotArm
# expressions
I_t= :((($Q-x1[j])^3+x1[j]^3)/3*sin(x5[j])^2);
I_p= :((($Q-x1[j])^3+x1[j]^3)/3 );

# Diff Eqs
de=Array{Expr}(6,);
de[1]=:(x2[j]);
de[2]=:(u1[j]/$Q);
de[3]=:(x4[j]);
de[4]=:(u2[j]/($I_t+$EP));
de[5]=:(x6[j]);
de[6]=:(u3[j]/($I_p+$EP));
```
But, this does not work when using [Documentor.jl](https://github.com/JuliaDocs/Documenter.jl/issues/521)


## Define and Configure the Problem:
```@example RobotArm
n=define(dx;numControls=3,X0=[9/2,0.0,0.0,0.0,pi/4,0.0],XF=[9/2,0.0,2*pi/3,0.0,pi/4,0.0],XL=[NaN,NaN,NaN,0.0,NaN,NaN],XU=[NaN,NaN,NaN,1.0,NaN,NaN],CL=[-1.,-1.,-1.],CU=[1.,1.,1.])
configure!(n;(:finalTimeDV=>true))
nothing # hide
```

## Objective Function
```@example RobotArm
@NLobjective(n.mdl,Min,n.tf);
nothing # hide
```

## Optimize
```@example RobotArm
optimize!(n);
nothing # hide
```

## Post Process
```@example RobotArm
using PrettyPlots
allPlots(n)
```
