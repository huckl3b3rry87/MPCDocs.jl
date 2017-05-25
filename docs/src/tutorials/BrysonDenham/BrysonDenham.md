# Bryson Denham


## Packages that will be used

```@example BrysonDenham
using NLOptControl,JuMP,Parameters,PrettyPlots,Plots;gr()
s=Settings();
n=NLOpt();
nothing # hide
```

## Differential Equations

```@example BrysonDenham
function BrysonDenham{T<:Any}(mdl::JuMP.Model,n::NLOpt,r::Result,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations
  if n.integrationMethod==:tm
    L = size(x)[1];
  else
    L = size(x)[1]-1;
  end
  dx = Array(Any,L,n.numStates)
  dx[:,1] =  @NLexpression(mdl, [j=1:L], x[j,2] );
  dx[:,2] =  @NLexpression(mdl, [j=1:L], u[j,1] );
  return dx
end
nothing # hide
```

## Define and Configure the Problem:
```@example BrysonDenham
L=1/9;
define!(n,stateEquations=BrysonDenham,numStates=2,numControls=1,X0=[0.,1],XF=[0.,-1.],XL=[0.,NaN],XU=[L,NaN],CL=[NaN],CU=[NaN])
configure!(n,Ni=2,Nck=[10,5];(:integrationMethod => :ps),(:integrationScheme => :lgrExplicit),(:finalTimeDV=>false),(:tf=>1.0))
#n = configure(n,N=100;(:integrationMethod => :tm),(:integrationScheme => :bkwEuler),(:finalTimeDV => false),(:tf => 1.0))
#n = configure(n,N=10;(:integrationMethod => :tm),(:integrationScheme => :trapezoidal),(:finalTimeDV => false),(:tf => 1.0))
nothing # hide
```

## Configure Solver Settings
```@example BrysonDenham
mdl=defineSolver!(n;name=:IPOPT,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3);
nothing # hide
```

## Optimize
```@example BrysonDenham
r=OCPdef!(mdl,n,s);
obj=integrate!(mdl,n,r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared))
@NLobjective(mdl, Min,obj);
optimize!(mdl,n,r,s)
nothing # hide
```
## Post Process
```@example BrysonDenham
resultsDir!(r);
allPlots(n,r,1)
```
