# Brachistochrone


Brachistochrone Problem  


## Packages that will be used

```@example Brachistochrone
using NLOptControl,JuMP,Parameters,PrettyPlots,Plots;gr()
s=Settings();
n=NLOpt();
nothing # hide
```

## Differential Equations

```@example Brachistochrone
const g = 9.81; # m/s^2
function Brachistochrone{T<:Any}(mdl::JuMP.Model,n::NLOpt,r::Result,x::Array{T,2},u::Array{T,2})
  if n.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end
  dx = Array(Any,L,n.numStates)
  dx[:,1] =  @NLexpression(mdl, [j=1:L], x[j,3]*sin(u[j,1]) );
  dx[:,2] =  @NLexpression(mdl, [j=1:L], x[j,3]*cos(u[j,1]) );
  dx[:,3] =  @NLexpression(mdl, [j=1:L], g*cos(u[j,1]) );
  return dx
end
nothing # hide
```

## Define and Configure the Problem:

```@example Brachistochrone
define!(n,stateEquations=Brachistochrone,numStates=3,numControls=1,X0=[0.0,0.0,0.0],XF=[2.,2.,NaN],XL=[-NaN,-NaN,-NaN],XU=[NaN,NaN,NaN],CL=[-NaN],CU=[NaN]);
#configure!(n,N=30;(:integrationMethod=>:tm),(:integrationScheme=>:trapezoidal),(:finalTimeDV =>false),(:tf=>4));
configure!(n,Ni=4,Nck=[10,10,10,10];(:integrationMethod=>:ps),(:integrationScheme=>:lgrExplicit),(:finalTimeDV=>true),(:tf=>4));
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

## Configure Solver Settings
```@example Brachistochrone
mdl=defineSolver!(n;name=:IPOPT,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3);
nothing # hide
```

## Optimize
```@example Brachistochrone
r=OCPdef!(mdl,n,s);
@NLobjective(mdl, Min, n.tf);
optimize!(mdl,n,r,s)
nothing # hide
```
## Post Process

```@example Brachistochrone
resultsDir!(r);
allPlots(n,r,1)
```
