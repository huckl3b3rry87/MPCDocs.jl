# Bryson Denham

using NLOptControl,JuMP,PrettyPlots,Plots;gr()

## Differential Equations

@DiffEq(BrysonDenham,[:($(n.r.x)[j,2]*sin($(n.r.u)[j,1]));:($(n.r.u)[j,1])] )

n=define!(;numStates=2,numControls=1,X0=[0.,1],XF=[0.,-1.],XL=[0.,NaN],XU=[1/9,NaN],CL=[NaN],CU=[NaN]);

#@DiffEq(n,BD,[:($(n.r.x)[j,2]);:($(n.r.u)[j,1])])
#n.stateEquations=@DiffEq(n,BD,[:($(n.r.x)[j,2]);:($(n.r.u)[j,1])])
#n.stateEquations=@DiffEq(n,BD,[n.r.x[:,2];n.r.u[:,1] ])
#dx=[n.r.x[:,2];n.r.u[:,1] ];
#@DiffEq(n,[:($(n.r.x)[j,2]*sin($(n.r.u)[j,1]));:($(n.r.u)[j,1])] )

configure!(n;(:finalTimeDV=>false),(:tf=>1.0));

dx=Array(Any,n.numStatePoints-1,n.numStates)  #preset this? based off of integrationMethod
dx[:,1]=:(n.r.x[j,2]);   #TODO think about how to make references -> parameters?
dx[:,2]=:(n.r.u[j,1]);   #TODO make sure that this was not messed up
n.stateEquations=@DiffEq(n,BD,dx)

# optimal control problem
NLOptControl.OCPdef!(n);

obj=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared));
@NLobjective(n.mdl,Min,obj);

optimize!(n);

allPlots(n)


Then, in order to create a new directory to store the plots in call:
```@example MoonLander
resultsDir!(r);
nothing # hide
```


2) Another option is to define the solver and some optimization settings as:
```@example MoonLander
mdl=defineSolver!(n;name=:IPOPT,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3);
nothing # hide
```
