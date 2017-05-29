# HyperSensitive


## Packages that will be used

```@example HyperSensitive
using NLOptControl,JuMP,Parameters,PrettyPlots,Plots;gr()
s=Settings();
n=NLOpt();
nothing # hide
```

## Differential Equations

```@example HyperSensitive
function HyperSensitive{T<:Any}(mdl::JuMP.Model,n::NLOpt,r::Result,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations
  if n.integrationMethod==:tm
    L = size(x)[1];
  else
    L = size(x)[1]-1;
  end
  dx = Array(Any,L,n.numStates)
  dx[:,1] =  @NLexpression(mdl, [j=1:L], -x[j,1]^3 + u[j,1] );
  return dx
end
nothing # hide
```

## Define and Configure the Problem:
```@example HyperSensitive
define!(n,stateEquations=HyperSensitive,numStates=1,numControls=1,X0=[1.5],XF=[1.],XL=[NaN],XU=[NaN],CL=[NaN],CU=[NaN])
#configure!(n,Ni=2,Nck=[10,5];(:integrationMethod => :ps),(:integrationScheme => :lgrExplicit),(:finalTimeDV=>false),(:tf=>10000.0))
#configure!(n,N=100;(:integrationMethod => :tm),(:integrationScheme => :bkwEuler),(:finalTimeDV => false),(:tf => 1.0))
configure!(n,N=100;(:integrationMethod => :tm),(:integrationScheme => :trapezoidal),(:finalTimeDV => false),(:tf => 10000.0))
nothing # hide
```

## Configure Solver Settings
```@example HyperSensitive
mdl=defineSolver!(n;name=:IPOPT,max_iter=1000,feastol_abs=1.0e-8,infeastol=1.0e-8,opttol_abs=1.0e-8);
nothing # hide
```

## Optimize
```@example HyperSensitive
r=OCPdef!(mdl,n,s);
obj1=integrate!(mdl,n,r.x[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared))
obj2=integrate!(mdl,n,r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared))
@NLobjective(mdl,Min,obj1+obj2);
optimize!(mdl,n,r,s)
nothing # hide
```
## Post Process
```@example HyperSensitive
resultsDir!(r);
allPlots(n,r,1)
```
