# Kinematic Bicycle Model

The vehicle model comes from the [BARC-project](https://github.com/MPC-Berkeley/barc)

## Packages that will be used
```@example Bicycle
using NLOptControl,Parameters,VehicleModels
nothing # hide
```

## Parameters form VehicleModels.jl
```@example Bicycle
pa=VparaKB(x0_=0.);  
@unpack_VparaKB pa # vehicle parameters
X0=[x0_,y0_,psi0_,u0_];
XF=[NaN,NaN,NaN,NaN];
XL=[x_min,y_min,psi_min,u_min];
XU=[x_max,y_max,psi_max,u_max];
CL=[sa_min,ax_min];
CU=[sa_max,ax_max];
nothing # hide
```

## Define the Problem
```@example Bicycle
n=define(numStates=4,numControls=2,X0=X0,XF=XF,XL=XL,XU=XU,CL=CL,CU=CU);
nothing # hide
```

## State and Control Names
```@example Bicycle
names=[:x,:y,:psi,:ux];
descriptions=["X (m)","Y (m)","Yaw Angle (rad)","Longitudinal Velocity (m/s)"];
states!(n,names,descriptions=descriptions)
names = [:sa,:ax];
descriptions=["Steering Angle (rad)","Longitudinal Acceleration (m/s^2)"];
controls!(n,names,descriptions=descriptions);
nothing # hide
```

## Differential Equations
```@example Bicycle
dynamics!(n,KinematicBicycle(pa))
nothing # hide
```

## Define and Configure the Problem:
```@example Bicycle
configure!(n,Nck=[15,10];(:finalTimeDV=>false),(:tf=>4.0));
nothing # hide
```

## Linear State Tolerances
```@example Bicycle
mXL=Any[false,false,false,false];
mXU=Any[false,false,false,-1];  # set to false if you don't want to taper that side
linearStateTolerances!(n;mXL=mXL,mXU=mXU);
nothing # hide
```

## Objective Function
```@example Bicycle
x_ref = 10; y_ref = 100; # define target
@NLobjective(n.mdl, Min, (n.r.x[end,1]-x_ref)^2 + (n.r.x[end,2]-y_ref)^2);
nothing # hide
```

## Optimize
```@example Bicycle
optimize!(n);
nothing # hide
```

## Post Process
```@example Bicycle
using PrettyPlots
allPlots(n)
```
Notice the longitudinal velocity is pushed down to 29 m/s using the `linearStateTolerances!()` function.

The state limits can be turned off in the plots with:
```@example Bicycle
statePlot(n,1,1,2;(:lims=>false))
```
