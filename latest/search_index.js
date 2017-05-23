var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#NLOptControl.jl-Documentation-1",
    "page": "Home",
    "title": "NLOptControl.jl Documentation",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#Guide-1",
    "page": "Home",
    "title": "Guide",
    "category": "section",
    "text": "Pages = [\"main/intro.md\"]\nDepth = 1"
},

{
    "location": "index.html#Tutorials-1",
    "page": "Home",
    "title": "Tutorials",
    "category": "section",
    "text": "Pages = [\n    \"tutorials/MoonLander/MoonLander.md\"\n    ]\nDepth = 2"
},

{
    "location": "index.html#NLOptControl.OCPdef!-Tuple{JuMP.Model,NLOptControl.NLOpt,NLOptControl.Settings,Vararg{Any,N}}",
    "page": "Home",
    "title": "NLOptControl.OCPdef!",
    "category": "Method",
    "text": "n,r=OCPdef(mdl,n,s)\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 1/14/2017, Last Modified: 5/4/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.configure!-Tuple{NLOptControl.NLOpt,Vararg{Any,N}}",
    "page": "Home",
    "title": "NLOptControl.configure!",
    "category": "Method",
    "text": "n = configure!(n::NLOpt,Ni=4,Nck=[3, 3, 7, 2];(:integrationMethod => :ps),(:integrationScheme => :lgrExplicit),(:finalTimeDV => false),(:tf => 1))\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 1/1/2017, Last Modified: 3/25/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.define!-Tuple{NLOptControl.NLOpt}",
    "page": "Home",
    "title": "NLOptControl.define!",
    "category": "Method",
    "text": "n = define!(n,numStates=2,numControls=1,X0=[0.,1],XF=[0.,-1.],XL=[0.,-Inf],XU=[1/9,Inf],CL=[-Inf],CU=[Inf])\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 1/1/2017, Last Modified: 4/3/2017 \n\nCitations: \n\n\n\nInitially Influenced by: S. Hughes.  steven.p.hughes@nasa.gov Source: DecisionVector.m located here ––––––––––––––––––––––––––––––––––––––––––-\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.defineSolver!-Tuple{NLOptControl.NLOpt}",
    "page": "Home",
    "title": "NLOptControl.defineSolver!",
    "category": "Method",
    "text": "mdl=defineSolver!(n;name=:KNITRO,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3)\n\nTODO make an option to run solvers with default settings\n\nfigure out best correspondence between IPOPT and KNITRO settings\n\nTo debug KNITRO turn up the optput level\n\nTry to tune KNITRO\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/9/2017, Last Modified: 4/3/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.defineTolerances!-Tuple{NLOptControl.NLOpt}",
    "page": "Home",
    "title": "NLOptControl.defineTolerances!",
    "category": "Method",
    "text": "defineTolerances!(n)\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/8/2017, Last Modified: 2/8/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.evalMaxDualInf-Tuple{NLOptControl.NLOpt,NLOptControl.Result}",
    "page": "Home",
    "title": "NLOptControl.evalMaxDualInf",
    "category": "Method",
    "text": "maxDualInf = evalMaxDualInf(n,r)\n\nfuntionality to evaluate maximum dual infeasibility of problem\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/13/2017, Last Modified: 2/13/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.integrate!-Tuple{JuMP.Model,NLOptControl.NLOpt,Array{JuMP.Variable,1},Vararg{Any,N}}",
    "page": "Home",
    "title": "NLOptControl.integrate!",
    "category": "Method",
    "text": "integrating JuMP variables\n\nExpr=integrate!(mdl,n,u;(:mode=>:control)) Expr=integrate!(mdl,n,u,idx=1;C=0.5,(:variable=>:control),(:integrand=>:squared)) Expr=integrate!(mdl,n,r.u[:,1];D=rand(n.numStatePoints),(:variable=>:control),(:integrand=>:squared),(:integrandAlgebra=>:subtract)) #TODO fix D  ::Array{JuMP.NonlinearParameter,1} –––––––––––––––––––––––––––––––––––––––––––\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 1/2/2017, Last Modified: 4/12/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.linearStateTolerances!-Tuple{NLOptControl.NLOpt}",
    "page": "Home",
    "title": "NLOptControl.linearStateTolerances!",
    "category": "Method",
    "text": "linearStateTolerances!(n)\n\nthe purpose of this function is to taper the tolerances on the constant state constraints\n\nthe idea is that when doing MPC, the final states are well within the bounds so that the next optimization is not initalized at an infeasible point\n\nif you want a constant bond, set the slope to zero\n\ndefault is a positive slope on the lower bound and a negative slope on the upper bound\n\nthis functionality in not needed for states like position, so you do not need to add a linearStateTol for all states\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/23/2017, Last Modified: 3/25/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.maxDF-Tuple{Any,Any}",
    "page": "Home",
    "title": "NLOptControl.maxDF",
    "category": "Method",
    "text": "\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 12/8/2016, Last Modified: 3/29/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.minDF-Tuple{Any,Any}",
    "page": "Home",
    "title": "NLOptControl.minDF",
    "category": "Method",
    "text": "maximum(x->maximum(x[:A]), dfs) -> consider\n\nmaximum(x->maximum(filter(y->y !== nothing, x[:A])), dfs)\n\nminimum(x->maximum(filter(y->y !== nothing, x[:t])), dfs)\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 12/8/2016, Last Modified: 3/29/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.resultsDir!-Tuple{Any}",
    "page": "Home",
    "title": "NLOptControl.resultsDir!",
    "category": "Method",
    "text": "description = string( \" *    \")\n\nsetupResults(r;results_name,description=description)\n\nremoves results folder and creates a new one\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/26/2017, Last Modified: 5/19/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#NLOptControl.savePlantData-Tuple{Any,Any}",
    "page": "Home",
    "title": "NLOptControl.savePlantData",
    "category": "Method",
    "text": "\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/26/2017, Last Modified: 4/27/2017 \n\n\n\n\n\n"
},

{
    "location": "index.html#Basic-Functions-1",
    "page": "Home",
    "title": "Basic Functions",
    "category": "section",
    "text": "Modules = [NLOptControl]\nPrivate = false\nOrder = [:function]Pages = [\n    \"functions/basics.md\",\n    \"functions/plotting.md\",\n    \"functions/mpc.md\"\n    ]\nDepth = 2"
},

{
    "location": "index.html#Background-Info-1",
    "page": "Home",
    "title": "Background Info",
    "category": "section",
    "text": "Pages = [\n    \"background/index.md\"\n    ]\nDepth = 2"
},

{
    "location": "index.html#Index-1",
    "page": "Home",
    "title": "Index",
    "category": "section",
    "text": ""
},

{
    "location": "tutorials/MoonLander/MoonLander.html#",
    "page": "Moon Lander",
    "title": "Moon Lander",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/MoonLander/MoonLander.html#Moon-Lander-1",
    "page": "Moon Lander",
    "title": "Moon Lander",
    "category": "section",
    "text": "First setup the packages that will be used:using NLOptControl,JuMP,Parameters,PrettyPlots,Plots\ns=Settings();n=NLOpt();gr(); nothing # hideWhere, the objects s and n are the settings and optimal control problem structures, respectively.NOTE: Other plotting backends may be used like gr() and pyplot().Next define the basic differential equation used to model the system:const g = 1.62519; # m/s^2\nfunction MoonLander{T<:Any}(mdl::JuMP.Model,n::NLOpt,r::Result,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations\n  if n.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end\n  dx = Array(Any,L,n.numStates)\n  dx[:,1] =  @NLexpression(mdl, [j=1:L], x[j,2] );\n  dx[:,2] =  @NLexpression(mdl, [j=1:L], u[j,1] - g);\n  return dx\nend\nnothing # hideMost of this code is boiler-plate and should be copied directly. The important things to note are thatu is the control variable matrix and x is the state variable matrix. So, in the above example the only thing that the user needs to modify is the right hand side of the dx[] expressions. The indecies for the number of the state or control variable are in the columns. For instance, x[:,2] represents the entire vector for second state variable.NOTE: eventually most of this code will be pushed to a lower level.  Now that the dynamic constraint equations have been established, the next step is to define the problem:define!(n,stateEquations=MoonLander,numStates=2,numControls=1,X0=[10.,-2],XF=[0.,0.],XL=[NaN,NaN],XU=[NaN,NaN],CL=[0.],CU=[3.])\nnothing # hideTo do this the user passes n, and defines the stateEquations to be the dynamic constraint equations defined in MoonLander().Basics: numStates = number of state variables numControls = number of control variables X0 = intial sttae TODO-> mention XL etc.There are several different ways to ensure that the stateEquations are satisfied that are set using the keys :integrationMethod and :integrationScheme. In this example the hp-Gaussian Quadrature Collocation Method is used with Radau Nodes. Finally, the final time may be either fixed and set before hand or it can be a variable. This option is set using the :finalTimeDV key and it is set to true in this example.configure!(n,Ni=4,Nck=[10,10,10,10];(:integrationMethod => :ps),(:integrationScheme => :lgrExplicit),(:finalTimeDV =>true))The next parts are optional.Names and descriptions may be added to both the control and state variables as follows:names = [:h,:v]; descriptions = [\"h(t)\",\"v(t)\"]; stateNames!(n,names,descriptions); nothing # hideNOTE: The names will show up in the results data and the descriptions will show up in the graphsAnother option is to define the solver and some optimization settings as:mdl=defineSolver!(n;name=:IPOPT,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3); nothing # hideNow, back to the required parts. The optimal control problem must be defined as:r=OCPdef!(mdl,n,s); nothing # hideThe object r stores all of the results as well as both the control and state variables. For instance r.x[:,1] should now be used to access the entire vector for the first state.For generality, integrate!() will also be demonstrated in this example. integrate!() is used to add terms to the cost function that need to be integrated. Currently there are several forms that these integrals can take (more can be added). In this example the first control variable r.u[:,1] and sets up this variable to be integrated over the entire time of the control problem with the following line of code:obj=integrate!(mdl,n,r.u[:,1];C=1.0,(:variable=>:control),(:integrand=>:default)); nothing # hideNext the cost function can be defined as:@NLobjective(mdl, Min, obj); nothing # hideAt this stage, the optimal control problem can be solved with:optimize!(mdl,n,r,s); nothing # hideThen, in order to quickly visualize the problem, functionality is also provided for automated visualization.The next part is optional:The plot settings can be modified from the default using the following code:plotSettings(;(:mpc_lines =>[(4.0,:blue,:solid)]),(:size=>(700,700))); nothing # hideThen, in order to create a new directory to store the plots in call:resultsDir!(r); nothing # hideFinally, in order to plot all of the states and controls call:allPlots(n,r,1);"
},

]}
