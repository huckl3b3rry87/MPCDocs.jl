# Moon Lander

First setup the packages that will be used:
```@example MoonLander
using NLOptControl,JuMP,Parameters,PrettyPlots,Plots;gr()
s=Settings();
n=NLOpt();
nothing # hide
```
Where, the objects `s` and `n` are the settings and optimal control problem structures, respectively.

Next define the basic differential equation used to model the system:

```@example MoonLander
const g = 1.62519; # m/s^2
function MoonLander{T<:Any}(mdl::JuMP.Model,n::NLOpt,r::Result,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations
  if n.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end
  dx = Array(Any,L,n.numStates)
  dx[:,1] = @NLexpression(mdl, [j=1:L], x[j,2] );
  dx[:,2] = @NLexpression(mdl, [j=1:L], u[j,1] - g);
  return dx
end
nothing # hide
```
Most of this code is boiler-plate and should be copied directly. The important things to note are that`u` is the control variable matrix and `x` is the state variable matrix. So, in the above example the only thing that the user needs to modify is the right hand side of the `dx[]` expressions. The indecies for the number of the state or control variable are in the columns. For instance, `x[:,2]` represents the entire vector for second state variable.

NOTE: eventually most of this code will be pushed to a lower level.  

Now that the dynamic constraint equations have been established, the next step is to define the problem:

```@example MoonLander
define!(n,stateEquations=MoonLander,numStates=2,numControls=1,X0=[10.,-2],XF=[0.,0.],XL=[NaN,NaN],XU=[NaN,NaN],CL=[0.],CU=[3.]);
nothing # hide
```
To do this the user passes `n`, and defines the `stateEquations` to be the dynamic constraint equations defined in `MoonLander()`.

Basics:
`numStates` = number of state variables
`numControls` = number of control variables
`X0` = intial sttae
TODO-> mention XL etc.

There are several different ways to ensure that the `stateEquations` are satisfied that are set using the keys `:integrationMethod` and `:integrationScheme`. In this example the hp-Gaussian Quadrature Collocation Method is used with Radau Nodes. Finally, the final time may be either fixed and set before hand or it can be a variable. This option is set using the `:finalTimeDV` key and it is set to `true` in this example.
```@example MoonLander
configure!(n,Ni=4,Nck=[10,10,10,10];(:integrationMethod=>:ps),(:integrationScheme=> :lgrExplicit),(:finalTimeDV=>true));
nothing # hide
```

The next parts are optional.

1)  Names and descriptions may be added to both the control and state variables as follows:
```@example MoonLander
names=[:h,:v]; descriptions = ["h(t)","v(t)"]; stateNames!(n,names,descriptions);
nothing # hide
```
NOTE: The names will show up in the results data and the descriptions will show up in the graphs

2) Another option is to define the solver and some optimization settings as:
```@example MoonLander
mdl=defineSolver!(n;name=:IPOPT,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3);
nothing # hide
```

Now, back to the required parts. The optimal control problem must be defined as:
```@example MoonLander
r=OCPdef!(mdl,n,s);
nothing # hide
```
The object `r` stores all of the results as well as both the control and state variables. For instance `r.x[:,1]` should now be used to access the entire vector for the first state.

For generality, `integrate!()` will also be demonstrated in this example. `integrate!()` is used to add terms to the cost function that need to be integrated. Currently there are several forms that these integrals can take (more can be added). In this example the first control variable `r.u[:,1]` and sets up this variable to be integrated over the entire time of the control problem with the following line of code:
```@example MoonLander  
obj=integrate!(mdl,n,r.u[:,1];C=1.0,(:variable=>:control),(:integrand=>:default));
nothing # hide
```
Next the cost function can be defined as:
```@example MoonLander
@NLobjective(mdl, Min, obj);
nothing # hide
```

At this stage, the optimal control problem can be solved with:
```@example MoonLander
optimize!(mdl,n,r,s);
nothing # hide
```

Then, in order to quickly visualize the problem, functionality is also provided for automated visualization.

## The next part is optional:
The plot settings can be modified from the default using the following code:
```@example MoonLander
plotSettings(;(:mpc_lines =>[(4.0,:blue,:solid)]),(:size=>(700,700)));
nothing # hide
```

Then, in order to create a new directory to store the plots in call:
```@example MoonLander
resultsDir!(r);
nothing # hide
```
Finally, in order to plot all of the states and controls call:
```@example MoonLander
allPlots(n,r,1);
```
