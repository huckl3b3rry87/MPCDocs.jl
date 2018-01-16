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

## Define Case
```@example Bicycle
## Goal
type Goal
    name
    x_ref
    y_ref
end
function Goal()
       Goal(:test,
             0.,
            100.);
end

# Obstacle
type Obs
  A
  B
  s_x
  s_y
  X0
  Y0
end
function Obs()
  Obs([5.],
      [5.],
      [0.0],
      [0.0],
      [0.],
      [50.]);
end

abstract type AbstractCase end
type Case <: AbstractCase
 g::Goal        # goal data
 o::Obs         # obstacle data
end

c=Case(Goal(),Obs())

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
configure!(n;(:Nck=>[12,10,8]),(:finalTimeDV=>true));
nothing # hide
```

## Nonlinear Obstacle Avoidance Constraints
```@example Bicycle
sm = 2;
x=n.r.x[:,1];y=n.r.x[:,2]; # pointers to JuMP variables
obs_con=@NLconstraint(n.mdl, [i=1:n.numStatePoints-1], 1 <= ((x[(i+1)]-c.o.X0[1])^2)/((c.o.A[1]+sm)^2) + ((y[(i+1)]-c.o.Y0[1])^2)/((c.o.B[1]+sm)^2));
newConstraint!(n,obs_con,:obs_con);
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
@NLobjective(n.mdl, Min, n.tf + (n.r.x[end,1]-c.g.x_ref)^2 + (n.r.x[end,2]-c.g.y_ref)^2);
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
plotSettings(;(:size=>(700,700)));
allPlots(n)
```
Notice the longitudinal velocity is pushed down to 29 m/s using the `linearStateTolerances!()` function.


The state limits can be turned off in the plots with `(:lims=>false)` and the obstacle plot handle can be passed to `statePlot()` in the 5th argument and by using `(:append=>true)`.


```@example Bicycle
plotSettings(;(:size=>(400,400)));
obs=obstaclePlot(n,c)
statePlot(n,1,1,2,obs;(:append=>true),(:lims=>false))
xlims!(-45,55);
ylims!(0,110);
```
