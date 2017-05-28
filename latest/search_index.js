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
    "location": "index.html#Introduction-1",
    "page": "Home",
    "title": "Introduction",
    "category": "section",
    "text": "..."
},

{
    "location": "index.html#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "There are several packages that need to be installed, to do this run:Pkg.clone(\"https://github.com/JuliaMPC/PrettyPlots.jl\")\nPkg.clone(\"https://github.com/JuliaMPC/VehicleModels.jl\")\nPkg.clone(\"https://github.com/JuliaMPC/NLOptControl.jl\")"
},

{
    "location": "index.html#Citation-1",
    "page": "Home",
    "title": "Citation",
    "category": "section",
    "text": "If you find this package useful, please cite this paper:@Conference{Febbo2017,\n  author    = {Huckleberry Febbo, Jiechao Liu, Paramsothy Jayakumar, Jeffrey L. Stein, Tulga Ersal},\n  title     = {Moving Obstacle Avoidance for Large, High-Speed Autonomous Ground Vehicles},\n  year      = {2017},\n  publisher = {IEEE}\n}"
},

{
    "location": "index.html#Tutorials-1",
    "page": "Home",
    "title": "Tutorials",
    "category": "section",
    "text": "For NLOptControl.jl there are several examples provided:Pages=[\n      \"tutorials/BrysonDenham/BrysonDenham.md\",\n      \"tutorials/MoonLander/MoonLander.md\",\n      \"tutorials/KinematicBicycle/KinematicBicycle.md\"\n       ]\nDepth=2"
},

{
    "location": "index.html#Background-Info-1",
    "page": "Home",
    "title": "Background Info",
    "category": "section",
    "text": "Pages = [\n    \"background/index.md\"\n    ]\nDepth=2"
},

{
    "location": "index.html#Exported-Functions-1",
    "page": "Home",
    "title": "Exported Functions",
    "category": "section",
    "text": "The following link provides documentation all of the exported functions for NLOptControl.jl, VehicleModels.jl, and PrettyPlots.jl.Pages=[\n    \"functions/NLOptControl.md\",\n    \"functions/VehicleModels.md\",\n    \"functions/PrettyPlots.md\"\n    ]\nDepth=1"
},

{
    "location": "index.html#Index-1",
    "page": "Home",
    "title": "Index",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#Acknowledgements-1",
    "page": "Home",
    "title": "Acknowledgements",
    "category": "section",
    "text": ""
},

{
    "location": "tutorials/BrysonDenham/BrysonDenham.html#",
    "page": "Bryson Denham",
    "title": "Bryson Denham",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/BrysonDenham/BrysonDenham.html#Bryson-Denham-1",
    "page": "Bryson Denham",
    "title": "Bryson Denham",
    "category": "section",
    "text": ""
},

{
    "location": "tutorials/BrysonDenham/BrysonDenham.html#Packages-that-will-be-used-1",
    "page": "Bryson Denham",
    "title": "Packages that will be used",
    "category": "section",
    "text": "using NLOptControl,JuMP,Parameters,PrettyPlots,Plots;gr()\ns=Settings();\nn=NLOpt();\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/BrysonDenham.html#Differential-Equations-1",
    "page": "Bryson Denham",
    "title": "Differential Equations",
    "category": "section",
    "text": "function BrysonDenham{T<:Any}(mdl::JuMP.Model,n::NLOpt,r::Result,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations\n  if n.integrationMethod==:tm\n    L = size(x)[1];\n  else\n    L = size(x)[1]-1;\n  end\n  dx = Array(Any,L,n.numStates)\n  dx[:,1] =  @NLexpression(mdl, [j=1:L], x[j,2] );\n  dx[:,2] =  @NLexpression(mdl, [j=1:L], u[j,1] );\n  return dx\nend\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/BrysonDenham.html#Define-and-Configure-the-Problem:-1",
    "page": "Bryson Denham",
    "title": "Define and Configure the Problem:",
    "category": "section",
    "text": "L=1/9;\ndefine!(n,stateEquations=BrysonDenham,numStates=2,numControls=1,X0=[0.,1],XF=[0.,-1.],XL=[0.,NaN],XU=[L,NaN],CL=[NaN],CU=[NaN])\nconfigure!(n,Ni=2,Nck=[10,5];(:integrationMethod => :ps),(:integrationScheme => :lgrExplicit),(:finalTimeDV=>false),(:tf=>1.0))\n#n = configure(n,N=100;(:integrationMethod => :tm),(:integrationScheme => :bkwEuler),(:finalTimeDV => false),(:tf => 1.0))\n#n = configure(n,N=10;(:integrationMethod => :tm),(:integrationScheme => :trapezoidal),(:finalTimeDV => false),(:tf => 1.0))\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/BrysonDenham.html#Configure-Solver-Settings-1",
    "page": "Bryson Denham",
    "title": "Configure Solver Settings",
    "category": "section",
    "text": "mdl=defineSolver!(n;name=:IPOPT,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3);\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/BrysonDenham.html#Optimize-1",
    "page": "Bryson Denham",
    "title": "Optimize",
    "category": "section",
    "text": "r=OCPdef!(mdl,n,s);\nobj=integrate!(mdl,n,r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared))\n@NLobjective(mdl, Min,obj);\noptimize!(mdl,n,r,s)\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/BrysonDenham.html#Post-Process-1",
    "page": "Bryson Denham",
    "title": "Post Process",
    "category": "section",
    "text": "resultsDir!(r);\nallPlots(n,r,1)"
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
    "text": "First setup the packages that will be used:using NLOptControl,JuMP,Parameters,PrettyPlots,Plots;gr()\ns=Settings();\nn=NLOpt();\nnothing # hideWhere, the objects s and n are the settings and optimal control problem structures, respectively.Next define the basic differential equation used to model the system:const g = 1.62519; # m/s^2\nfunction MoonLander{T<:Any}(mdl::JuMP.Model,n::NLOpt,r::Result,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations\n  if n.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end\n  dx = Array(Any,L,n.numStates)\n  dx[:,1] = @NLexpression(mdl, [j=1:L], x[j,2] );\n  dx[:,2] = @NLexpression(mdl, [j=1:L], u[j,1] - g);\n  return dx\nend\nnothing # hideMost of this code is boiler-plate and should be copied directly. The important things to note are thatu is the control variable matrix and x is the state variable matrix. So, in the above example the only thing that the user needs to modify is the right hand side of the dx[] expressions. The indecies for the number of the state or control variable are in the columns. For instance, x[:,2] represents the entire vector for second state variable.NOTE: eventually most of this code will be pushed to a lower level.  Now that the dynamic constraint equations have been established, the next step is to define the problem:define!(n,stateEquations=MoonLander,numStates=2,numControls=1,X0=[10.,-2],XF=[0.,0.],XL=[NaN,NaN],XU=[NaN,NaN],CL=[0.],CU=[3.]);\nnothing # hideTo do this the user passes n, and defines the stateEquations to be the dynamic constraint equations defined in MoonLander().Basics: numStates = number of state variables numControls = number of control variables X0 = intial sttae TODO-> mention XL etc.There are several different ways to ensure that the stateEquations are satisfied that are set using the keys :integrationMethod and :integrationScheme. In this example the hp-Gaussian Quadrature Collocation Method is used with Radau Nodes. Finally, the final time may be either fixed and set before hand or it can be a variable. This option is set using the :finalTimeDV key and it is set to true in this example.configure!(n,Ni=4,Nck=[10,10,10,10];(:integrationMethod=>:ps),(:integrationScheme=> :lgrExplicit),(:finalTimeDV=>true));\nnothing # hideThe next parts are optional.Names and descriptions may be added to both the control and state variables as follows:names=[:h,:v]; descriptions = [\"h(t)\",\"v(t)\"]; stateNames!(n,names,descriptions);\nnothing # hideNOTE: The names will show up in the results data and the descriptions will show up in the graphsAnother option is to define the solver and some optimization settings as:mdl=defineSolver!(n;name=:IPOPT,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3);\nnothing # hideNow, back to the required parts. The optimal control problem must be defined as:r=OCPdef!(mdl,n,s);\nnothing # hideThe object r stores all of the results as well as both the control and state variables. For instance r.x[:,1] should now be used to access the entire vector for the first state.For generality, integrate!() will also be demonstrated in this example. integrate!() is used to add terms to the cost function that need to be integrated. Currently there are several forms that these integrals can take (more can be added). In this example the first control variable r.u[:,1] and sets up this variable to be integrated over the entire time of the control problem with the following line of code:obj=integrate!(mdl,n,r.u[:,1];C=1.0,(:variable=>:control),(:integrand=>:default));\nnothing # hideNext the cost function can be defined as:@NLobjective(mdl, Min, obj);\nnothing # hideAt this stage, the optimal control problem can be solved with:optimize!(mdl,n,r,s);\nnothing # hideThen, in order to quickly visualize the problem, functionality is also provided for automated visualization."
},

{
    "location": "tutorials/MoonLander/MoonLander.html#The-next-part-is-optional:-1",
    "page": "Moon Lander",
    "title": "The next part is optional:",
    "category": "section",
    "text": "The plot settings can be modified from the default using the following code:plotSettings(;(:mpc_lines =>[(4.0,:blue,:solid)]),(:size=>(700,700)));\nnothing # hideThen, in order to create a new directory to store the plots in call:resultsDir!(r);\nnothing # hideFinally, in order to plot all of the states and controls call:allPlots(n,r,1);"
},

{
    "location": "tutorials/KinematicBicycle/KinematicBicycle.html#",
    "page": "initialize",
    "title": "initialize",
    "category": "page",
    "text": "using NLOptControl, JuMP, Parameters, VehicleModels main_dir=pwd(); error(\"update this\")"
},

{
    "location": "tutorials/KinematicBicycle/KinematicBicycle.html#initialize-1",
    "page": "initialize",
    "title": "initialize",
    "category": "section",
    "text": "n = NLOpt(); s = Settings();"
},

{
    "location": "tutorials/KinematicBicycle/KinematicBicycle.html#define-1",
    "page": "initialize",
    "title": "define",
    "category": "section",
    "text": "pa = VparaKB(x0_=0.);  @unpack_VparaKB pa # vehicle parameters X0 = [x0_,y0_,psi0_,u0_]; XF = [NaN,NaN,NaN,NaN]; XL = [x_min,y_min,psi_min,u_min]; XU = [x_max,y_max,psi_max,u_max]; CL = [sa_min,ax_min]; CU = [sa_max,ax_max]; n = define(n,stateEquations=KinematicBicycle,numStates=4,numControls=2,X0=X0,XF=XF,XL=XL,XU=XU,CL=CL,CU=CU)"
},

{
    "location": "tutorials/KinematicBicycle/KinematicBicycle.html#build-1",
    "page": "initialize",
    "title": "build",
    "category": "section",
    "text": "n = configure(n,Ni=2,Nck=[15,10];(:integrationMethod => :ps),(:integrationScheme => :lgrExplicit),(:finalTimeDV => false),(:tf => 4.0)) mdl=defineSolver(n)"
},

{
    "location": "tutorials/KinematicBicycle/KinematicBicycle.html#addtional-information-1",
    "page": "initialize",
    "title": "addtional information",
    "category": "section",
    "text": "names = [:x,:y,:psi,:ux]; descriptions = [\"X (m)\",\"Y (m)\",\"Yaw Angle (rad)\",\"Longitudinal Velocity (m/s)\"]; stateNames(n,names,descriptions) names = [:sr,:jx]; descriptions = [\"Steering Angle (rad)\",\"Longitudinal Acceleration (m/s^2)\"]; controlNames(n,names,descriptions);mXL=Any[false,false,false,false];mXU=Any[false,false,false,-1];  # set to false if you don't want to taper that side linearStateTolerances(n;mXL=mXL,mXU=mXU);"
},

{
    "location": "tutorials/KinematicBicycle/KinematicBicycle.html#setup-OCP-1",
    "page": "initialize",
    "title": "setup OCP",
    "category": "section",
    "text": "params = [pa];   # vehicle parameters n,r = OCPdef(mdl,n,s,params); x_ref = 10; y_ref = 100; # define target @NLobjective(mdl, Min, (r.x[end,1]-x_ref)^2 + (r.x[end,2]-y_ref)^2);"
},

{
    "location": "tutorials/KinematicBicycle/KinematicBicycle.html#solve-1",
    "page": "initialize",
    "title": "solve",
    "category": "section",
    "text": "optimize(mdl,n,r,s)"
},

{
    "location": "tutorials/KinematicBicycle/KinematicBicycle.html#post-process-1",
    "page": "initialize",
    "title": "post process",
    "category": "section",
    "text": "using PrettyPlots, Plots gr(); allPlots(n,r,1)"
},

{
    "location": "background/index.html#",
    "page": "Background Information",
    "title": "Background Information",
    "category": "page",
    "text": "orphan :   "
},

{
    "location": "background/index.html#Background-Information-1",
    "page": "Background Information",
    "title": "Background Information",
    "category": "section",
    "text": "While detailed information on these approaches to discretizing infinite dimensional (or continuous) optimal control problems can be found (and comes from) this Ph.D. dissertation  <http://etd.fcla.edu/UF/UFE0042778/darby_c.pdf>_, this related journal publication <http://vdol.mae.ufl.edu/JournalPublications/TOMS-GPOPS-II-August-2013.pdf>_ and this technical report <http://systemdesign.illinois.edu/publications/Her15a.pdf>_, the Background Information section will cover some basics.Pages = [\n    \"lagrange_poly.md\",\n    \"optimal_control.md\",\n    \"ocp.md\",\n    \"time_marching.md\",\n    \"pseudospectral_methods.md\",\n    \"hp-psuedospectral.md\"\n    ]\nDepth = 2"
},

{
    "location": "functions/NLOptControl.html#",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.jl",
    "category": "page",
    "text": ""
},

{
    "location": "functions/NLOptControl.html#NLOptControl.OCPdef!-Tuple{JuMP.Model,NLOptControl.NLOpt,NLOptControl.Settings,Vararg{Any,N}}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.OCPdef!",
    "category": "Method",
    "text": "n,r=OCPdef(mdl,n,s)\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 1/14/2017, Last Modified: 5/4/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.configure!-Tuple{NLOptControl.NLOpt,Vararg{Any,N}}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.configure!",
    "category": "Method",
    "text": "n = configure!(n::NLOpt,Ni=4,Nck=[3, 3, 7, 2];(:integrationMethod => :ps),(:integrationScheme => :lgrExplicit),(:finalTimeDV => false),(:tf => 1))\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 1/1/2017, Last Modified: 3/25/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.define!-Tuple{NLOptControl.NLOpt}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.define!",
    "category": "Method",
    "text": "n = define!(n,numStates=2,numControls=1,X0=[0.,1],XF=[0.,-1.],XL=[0.,-Inf],XU=[1/9,Inf],CL=[-Inf],CU=[Inf])\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 1/1/2017, Last Modified: 4/3/2017 \n\nCitations: \n\n\n\nInitially Influenced by: S. Hughes.  steven.p.hughes@nasa.gov Source: DecisionVector.m located here ––––––––––––––––––––––––––––––––––––––––––-\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.defineSolver!-Tuple{NLOptControl.NLOpt}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.defineSolver!",
    "category": "Method",
    "text": "mdl=defineSolver!(n;name=:KNITRO,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3)\n\nTODO make an option to run solvers with default settings\n\nfigure out best correspondence between IPOPT and KNITRO settings\n\nTo debug KNITRO turn up the optput level\n\nTry to tune KNITRO\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/9/2017, Last Modified: 4/3/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.defineTolerances!-Tuple{NLOptControl.NLOpt}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.defineTolerances!",
    "category": "Method",
    "text": "defineTolerances!(n)\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/8/2017, Last Modified: 2/8/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.evalMaxDualInf-Tuple{NLOptControl.NLOpt,NLOptControl.Result}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.evalMaxDualInf",
    "category": "Method",
    "text": "maxDualInf = evalMaxDualInf(n,r)\n\nfuntionality to evaluate maximum dual infeasibility of problem\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/13/2017, Last Modified: 2/13/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.integrate!-Tuple{JuMP.Model,NLOptControl.NLOpt,Array{JuMP.Variable,1},Vararg{Any,N}}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.integrate!",
    "category": "Method",
    "text": "integrating JuMP variables\n\nExpr=integrate!(mdl,n,u;(:mode=>:control)) Expr=integrate!(mdl,n,u,idx=1;C=0.5,(:variable=>:control),(:integrand=>:squared)) Expr=integrate!(mdl,n,r.u[:,1];D=rand(n.numStatePoints),(:variable=>:control),(:integrand=>:squared),(:integrandAlgebra=>:subtract)) #TODO fix D  ::Array{JuMP.NonlinearParameter,1} –––––––––––––––––––––––––––––––––––––––––––\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 1/2/2017, Last Modified: 4/12/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.linearStateTolerances!-Tuple{NLOptControl.NLOpt}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.linearStateTolerances!",
    "category": "Method",
    "text": "linearStateTolerances!(n)\n\nthe purpose of this function is to taper the tolerances on the constant state constraints\n\nthe idea is that when doing MPC, the final states are well within the bounds so that the next optimization is not initalized at an infeasible point\n\nif you want a constant bond, set the slope to zero\n\ndefault is a positive slope on the lower bound and a negative slope on the upper bound\n\nthis functionality in not needed for states like position, so you do not need to add a linearStateTol for all states\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/23/2017, Last Modified: 3/25/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.maxDF-Tuple{Any,Any}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.maxDF",
    "category": "Method",
    "text": "\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 12/8/2016, Last Modified: 3/29/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.minDF-Tuple{Any,Any}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.minDF",
    "category": "Method",
    "text": "maximum(x->maximum(x[:A]), dfs) -> consider\n\nmaximum(x->maximum(filter(y->y !== nothing, x[:A])), dfs)\n\nminimum(x->maximum(filter(y->y !== nothing, x[:t])), dfs)\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 12/8/2016, Last Modified: 3/29/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.resultsDir!-Tuple{Any}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.resultsDir!",
    "category": "Method",
    "text": "description = string( \" *    \")\n\nsetupResults(r;results_name,description=description)\n\nremoves results folder and creates a new one\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/26/2017, Last Modified: 5/19/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.savePlantData-Tuple{Any,Any}",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.savePlantData",
    "category": "Method",
    "text": "\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/26/2017, Last Modified: 4/27/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/NLOptControl.html#NLOptControl.jl-1",
    "page": "NLOptControl.jl",
    "title": "NLOptControl.jl",
    "category": "section",
    "text": "The following link provides documentation all of the exported NLOptControl.jl functions:Modules = [NLOptControl]\nPrivate = false\nOrder = [:function]\nDepth = 2"
},

{
    "location": "functions/VehicleModels.html#",
    "page": "VehicleModels.jl",
    "title": "VehicleModels.jl",
    "category": "page",
    "text": ""
},

{
    "location": "functions/VehicleModels.html#VehicleModels.KinematicBicycle-Tuple{JuMP.Model,Any,Any,Array{T,2},Array{T,2},Any}",
    "page": "VehicleModels.jl",
    "title": "VehicleModels.KinematicBicycle",
    "category": "Method",
    "text": "dx=KinematicBicycle(mdl,n,R,x,u,params)\n\nOriginal Authors: BARC Project, Berkely MPC Laboratory -> https://github.com/MPC-Berkeley/barc Modified for NLOptControl.jl by: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/9/2017, Last Modified: 2/9/2017 \n\n\n\nthis vehicle model is controlled using steering angle and longitudinal acceleration\n\n\n\n"
},

{
    "location": "functions/VehicleModels.html#VehicleModels.ThreeDOFv1-Tuple{JuMP.Model,Any,Any,Array{T,2},Array{T,2},Any}",
    "page": "VehicleModels.jl",
    "title": "VehicleModels.ThreeDOFv1",
    "category": "Method",
    "text": "dx = ThreeDOFv1(mdl,n,R,x,u,params)\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 10/20/2017, Last Modified: 2/1/2017 \n\n\n\nthis vehicle model is controlled using steering angle and speed\n\n\n\n"
},

{
    "location": "functions/VehicleModels.html#VehicleModels.ThreeDOFv1-Tuple{VehicleModels.Vpara,Array{T,1},Array{T,1},Array{T,2},Float64,Float64}",
    "page": "VehicleModels.jl",
    "title": "VehicleModels.ThreeDOFv1",
    "category": "Method",
    "text": "\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 10/01/2016, Last Modified: 4/4/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/VehicleModels.html#VehicleModels.ThreeDOFv2-Tuple{JuMP.Model,Any,Any,Array{T,2},Array{T,2},Any}",
    "page": "VehicleModels.jl",
    "title": "VehicleModels.ThreeDOFv2",
    "category": "Method",
    "text": "dx = ThreeDOFv2(mdl,n,x,u,params)\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 10/20/2017, Last Modified: 2/6/2017 \n\n\n\nthis vehicle model is controlled using steering rate and longitudinal jerk\n\n\n\n"
},

{
    "location": "functions/VehicleModels.html#VehicleModels.ThreeDOFv2-Tuple{VehicleModels.Vpara,Array{T,1},Array{T,1},Array{T,2},Float64,Float64}",
    "page": "VehicleModels.jl",
    "title": "VehicleModels.ThreeDOFv2",
    "category": "Method",
    "text": "\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 10/01/2016, Last Modified: 4/11/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/VehicleModels.html#VehicleModels.jl-1",
    "page": "VehicleModels.jl",
    "title": "VehicleModels.jl",
    "category": "section",
    "text": "The following link provides documentation all of the exported VehicleModels.jl functions:Modules = [VehicleModels]\nPrivate = false\nOrder = [:function]\nDepth = 2"
},

{
    "location": "functions/PrettyPlots.html#",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.jl",
    "category": "page",
    "text": ""
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.allPlots-Tuple{NLOptControl.NLOpt,NLOptControl.Result,Int64}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.allPlots",
    "category": "Method",
    "text": "allPlots(n,r,Settings(),idx)\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/10/2017, Last Modified: 3/11/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.controlPlot-Tuple{NLOptControl.NLOpt,NLOptControl.Result,Int64,Int64,Vararg{Any,N}}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.controlPlot",
    "category": "Method",
    "text": "ctrp=controlPlot(n,r,idx,ctr); ctrp=controlPlot(n,r,idx,ctr,ctrp;(:append=>true));\n\nto plot control signals\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/10/2017, Last Modified: 3/11/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.currentSettings-Tuple{}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.currentSettings",
    "category": "Method",
    "text": "currentSettings()\n\nshow the current plot settings\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.mainSim-Tuple{Any,Any,Any,Any}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.mainSim",
    "category": "Method",
    "text": "mainSim(n,r,c,pa;(:mode=>:open1))\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 4/13/2017, Last Modified: 5/1/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.obstaclePlot-Tuple{Any,Any,Any,Any,Vararg{Any,N}}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.obstaclePlot",
    "category": "Method",
    "text": "to visualize the current obstacle in the field\n\nobstaclePlot(n,c)\n\nto run it after a single optimization\n\npp=obstaclePlot(n,r,c,1);\n\nto create a new plot\n\npp=obstaclePlot(n,r,c,idx);\n\nto add to an exsting position plot\n\npp=obstaclePlot(n,r,c,idx,pp;(:append=>true));\n\nposterPlot\n\npp=obstaclePlot(n,r,c,ii,pp;(:append=>true),(:posterPlot=>true)); # add obstacles\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/11/2017, Last Modified: 4/3/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.plotSettings-Tuple{}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.plotSettings",
    "category": "Method",
    "text": "plotSettings(;(:simulate=>true)) plotSettings(;(:mpc_lines   =>[(4.0,:blueviolet,:solid),(4.0,:blueviolet,:dash)]),               (:plant_lines =>[(3.0,:darkgreen,:solid),(3.0,:darkgreen,:solid)]),               (:limit_lines =>[(2.0,:turquoise,:solid),(2.0,:violet,:solid),(2.0,:orchid,:solid),(2.0,:darksalmon,:solid)]),               (:size=>(1000,1000))              ) plotSettings(;(:obstacle_marker =>(:circle,:red,10.0,1.0)),                   (:goal_marker=>(:circle,:green,10.0,1.0))              )  plotSettings(;(:mpc_lines =>[(4.0,:blueviolet,:solid)]),(:size=>(700,700)))\n\nthis function can be called to modify the default settings in PrettyPlots.jl\n\ncheck out Colors.jl for an incredible amount of colors!\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.posPlot-Tuple{Any,Any,Any,Any}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.posPlot",
    "category": "Method",
    "text": "to plot the second solution\n\npp=posPlot(n,r,c,2) pp=posPlot(n,r,c,idx) –––––––––––––––––––––––––––––––––––––––––––\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/28/2017, Last Modified: 5/1/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.posterP-Tuple{Any,Any,Any,Any}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.posterP",
    "category": "Method",
    "text": "default(guidefont = font(17), tickfont = font(15), legendfont = font(12), titlefont = font(20)) s=Settings(;save=true,MPC=true,simulate=false,format=:png,plantOnly=true); posterP(n,r,c,pa) –––––––––––––––––––––––––––––––––––––––––––\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 4/13/2017, Last Modified: 4/13/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.statePlot-Tuple{NLOptControl.NLOpt,NLOptControl.Result,Int64,Int64,Int64,Vararg{Any,N}}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.statePlot",
    "category": "Method",
    "text": "stp=statePlot(n,r,idx,st1,st2); stp=statePlot(n,r,idx,st1,st2;(:legend=>\"test1\")); stp=statePlot(n,r,idx,st1,st2,stp;(:append=>true),(:lims=>false));\n\nto compare two different states\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/10/2017, Last Modified: 3/11/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.statePlot-Tuple{NLOptControl.NLOpt,NLOptControl.Result,Int64,Int64,Vararg{Any,N}}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.statePlot",
    "category": "Method",
    "text": "stp=statePlot(n,r,r.eval_num,7); stp=statePlot(n,r,idx,st); stp=statePlot(n,r,idx,st;(:legend=>\"test1\")); stp=statePlot(n,r,idx,st,stp;(:append=>true)); –––––––––––––––––––––––––––––––––––––––––––\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 2/10/2017, Last Modified: 5/2/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.tPlot-Tuple{NLOptControl.NLOpt,NLOptControl.Result,Int64,Vararg{Any,N}}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.tPlot",
    "category": "Method",
    "text": "tp=tPlot(n,r,idx) tp=tPlot(n,r,idx,tp;(:append=>true))\n\nplot the optimization times\n\nthis is an MPC plot\n\n\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/11/2017, Last Modified: 3/11/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.trackPlot-Tuple{Any,Vararg{Any,N}}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.trackPlot",
    "category": "Method",
    "text": "to visualize the current track in the field\n\ntrackPlot(c)\n\npp=trackPlot(c,pp;(:append=>true));\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/28/2017, Last Modified: 5/1/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.vtPlot-Tuple{NLOptControl.NLOpt,NLOptControl.Result,VehicleModels.Vpara,Any,Int64}",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.vtPlot",
    "category": "Method",
    "text": "vt=vtPlot(n,r,pa,c,idx)\n\nAuthor: Huckleberry Febbo, Graduate Student, University of Michigan Date Create: 3/11/2017, Last Modified: 3/11/2017 \n\n\n\n\n\n"
},

{
    "location": "functions/PrettyPlots.html#PrettyPlots.jl-1",
    "page": "PrettyPlots.jl",
    "title": "PrettyPlots.jl",
    "category": "section",
    "text": "The following link provides documentation all of the exported PrettyPlots.jl functions:Modules = [PrettyPlots]\nPrivate = false\nOrder = [:function]\nDepth = 2"
},

]}
