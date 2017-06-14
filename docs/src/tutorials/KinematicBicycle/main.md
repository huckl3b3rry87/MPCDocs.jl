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

## Differential Equations
```@example Bicycle
n=define!(KinematicBicycle;numStates=4,numControls=2,X0=X0,XF=XF,XL=XL,XU=XU,CL=CL,CU=CU);
nothing # hide
```
## Add Parameters to the Model
```@example Bicycle
n.params=[pa];   # vehicle parameters
nothing # hide
```

## Define and Configure the Problem:

```@example Bicycle
configure!(n,Nck=[15,10];(:finalTimeDV=>false),(:tf=>4.0));
nothing # hide
```

## additional information
```@example Bicycle
names=[:x,:y,:psi,:ux];
descriptions=["X (m)","Y (m)","Yaw Angle (rad)","Longitudinal Velocity (m/s)"];
stateNames!(n,names,descriptions)
names = [:sr,:jx];
descriptions=["Steering Angle (rad)","Longitudinal Acceleration (m/s^2)"];
controlNames!(n,names,descriptions);
nothing # hide
```
#mXL=Any[false,false,false,false];mXU=Any[false,false,false,-1];  # set to false if you don't want to taper that side
#linearStateTolerances(n;mXL=mXL,mXU=mXU);

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
