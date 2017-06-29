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
    "text": "This software solves nonlinear control problems at a high-level very quickly.It added to juliaOpt community by:Providing an implementation of of the hp-pseudospectral method written in julia\nIncorporating model predictive control functionality\nAutomatically visualizing the solution"
},

{
    "location": "index.html#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "There are several packages that need to be installed, to do this run:Pkg.clone(\"https://github.com/JuliaMPC/PrettyPlots.jl\")\nPkg.clone(\"https://github.com/JuliaMPC/VehicleModels.jl\")\nPkg.add(\"NLOptControl.jl\")Either Ipopt.jl or KNITRO.jl can be used for the nonlinear solver. Since Ipopt is free, all of the examples will use it and it can be added with:Pkg.add(\"Ipopt\");Pkg.build(\"Ipopt\");If you are using Linux make sure that you have gfortran to run Ipopt:sudo apt-get install gfortranAlso, a plotting backend will be required and there are several options:Pkg.add(\"PGFPlots\");Pkg.build(\"PGFPlots\")   # best looking\nPkg.add(\"GR\");Pkg.build(\"GR\");              # most reliable\nPkg.add(\"PyPlot\");Pkg.build(\"PyPlot\")       # also a good option  "
},

{
    "location": "index.html#juliaCon-Workshop-Notebook-1",
    "page": "Home",
    "title": "2017 juliaCon Workshop Notebook",
    "category": "section",
    "text": "Currently the most descriptive explanation for using this software is in a Jupyter notebook.After installation, the notebook can be viewed:using IJulia\nnotebook(dir=Pkg.dir(\"NLOptControl/examples\"))Also, on the left side of this site, there are many tutorials that provide complete examples for using this software."
},

{
    "location": "index.html#Citation-1",
    "page": "Home",
    "title": "Citation",
    "category": "section",
    "text": "If you find NLOptControl.jl useful, please cite it:@software{nlopt,\n  author = {{Huckleberry Febbo}},\n  title = {NLOptControl.jl},\n  url = {https://github.com/JuliaMPC/NLOptControl.jl},\n  version = {0.0.1},\n  date = {2017-06-17},\n}If you find VehicleModels.jl useful, please cite this paper:@Conference{Febbo2017,\n  author    = {Huckleberry Febbo, Jiechao Liu, Paramsothy Jayakumar, Jeffrey L. Stein, Tulga Ersal},\n  title     = {Moving Obstacle Avoidance for Large, High-Speed Autonomous Ground Vehicles},\n  year      = {2017},\n  publisher = {IEEE}\n}"
},

{
    "location": "index.html#Acknowledgements-1",
    "page": "Home",
    "title": "Acknowledgements",
    "category": "section",
    "text": "JuMP.jl is an important part of this NLOptControl.jl and discussions with Miles Lubin where helpful\nChris Rackauckas is a very helpful member of the julia community and has provided me support and advice multiple times his software DifferentialEquations.jl is also part of NLOptControl.jl"
},

{
    "location": "index.html#Exported-Functions-1",
    "page": "Home",
    "title": "Exported Functions",
    "category": "section",
    "text": "The following link provides documentation all of the exported functions for NLOptControl.jl, VehicleModels.jl, and PrettyPlots.jl.Pages=[\n    \"functions/NLOptControl.md\",\n    \"functions/PrettyPlots.md\"\n    ]\nDepth=1"
},

{
    "location": "tutorials/BrysonDenham/main.html#",
    "page": "Bryson Denham",
    "title": "Bryson Denham",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/BrysonDenham/main.html#Bryson-Denham-1",
    "page": "Bryson Denham",
    "title": "Bryson Denham",
    "category": "section",
    "text": "This problem can be found here."
},

{
    "location": "tutorials/BrysonDenham/main.html#Packages-that-will-be-used-1",
    "page": "Bryson Denham",
    "title": "Packages that will be used",
    "category": "section",
    "text": "using NLOptControl\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/main.html#Differential-Equations-1",
    "page": "Bryson Denham",
    "title": "Differential Equations",
    "category": "section",
    "text": "de=[:(x2[j]),:(u1[j])]\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/main.html#Define-and-Configure-the-Problem:-1",
    "page": "Bryson Denham",
    "title": "Define and Configure the Problem:",
    "category": "section",
    "text": "n=define(de;numStates=2,numControls=1,X0=[0.,1],XF=[0.,-1.],XL=[0.,NaN],XU=[1/9,NaN],CL=[NaN],CU=[NaN]);\nconfigure!(n;(:finalTimeDV=>false),(:tf=>1.0));\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/main.html#Objective-Function-1",
    "page": "Bryson Denham",
    "title": "Objective Function",
    "category": "section",
    "text": "obj=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared));\n@NLobjective(n.mdl,Min,obj);\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/main.html#Optimize-1",
    "page": "Bryson Denham",
    "title": "Optimize",
    "category": "section",
    "text": "optimize!(n);\nnothing # hide"
},

{
    "location": "tutorials/BrysonDenham/main.html#Post-Process-1",
    "page": "Bryson Denham",
    "title": "Post Process",
    "category": "section",
    "text": "using PrettyPlots\nallPlots(n)"
},

{
    "location": "tutorials/Brachistochrone/main.html#",
    "page": "Brachistochrone",
    "title": "Brachistochrone",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/Brachistochrone/main.html#Brachistochrone-1",
    "page": "Brachistochrone",
    "title": "Brachistochrone",
    "category": "section",
    "text": "This problem can be found here."
},

{
    "location": "tutorials/Brachistochrone/main.html#Packages-that-will-be-used-1",
    "page": "Brachistochrone",
    "title": "Packages that will be used",
    "category": "section",
    "text": "using NLOptControl\nnothing # hide"
},

{
    "location": "tutorials/Brachistochrone/main.html#Differential-Equations-1",
    "page": "Brachistochrone",
    "title": "Differential Equations",
    "category": "section",
    "text": "de=[:(x3[j]*sin(u1[j])),:(x3[j]*cos(u1[j])),:(9.81*cos(u1[j]))]\nnothing # hide"
},

{
    "location": "tutorials/Brachistochrone/main.html#Define-and-Configure-the-Problem:-1",
    "page": "Brachistochrone",
    "title": "Define and Configure the Problem:",
    "category": "section",
    "text": "n=define(de;numStates=3,numControls=1,X0=[0.0,0.0,0.0],XF=[2.,2.,NaN],XL=[-NaN,-NaN,-NaN],XU=[NaN,NaN,NaN],CL=[-NaN],CU=[NaN]);\nconfigure!(n;(:Nck=>[100]),(:finalTimeDV=>true));\nnothing # hide\n"
},

{
    "location": "tutorials/Brachistochrone/main.html#Additional-Information-1",
    "page": "Brachistochrone",
    "title": "Additional Information",
    "category": "section",
    "text": "names=[:x,:y,:v]; descriptions=[\"x(t)\",\"y(t)\",\"v(t)\"];\nstateNames!(n,names,descriptions);\nnames=[:u]; descriptions=[\"u(t)\"];\ncontrolNames!(n,names,descriptions);\nnothing # hide"
},

{
    "location": "tutorials/Brachistochrone/main.html#Objective-Function-1",
    "page": "Brachistochrone",
    "title": "Objective Function",
    "category": "section",
    "text": "@NLobjective(n.mdl,Min,n.tf);\nnothing # hide"
},

{
    "location": "tutorials/Brachistochrone/main.html#Optimize-1",
    "page": "Brachistochrone",
    "title": "Optimize",
    "category": "section",
    "text": "optimize!(n);\nnothing # hide"
},

{
    "location": "tutorials/Brachistochrone/main.html#Post-Process-1",
    "page": "Brachistochrone",
    "title": "Post Process",
    "category": "section",
    "text": "using PrettyPlots\nallPlots(n)"
},

{
    "location": "tutorials/Beam/main.html#",
    "page": "Beam Problem",
    "title": "Beam Problem",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/Beam/main.html#Beam-Problem-1",
    "page": "Beam Problem",
    "title": "Beam Problem",
    "category": "section",
    "text": "An optimal control version of the Singly Supported NonLinear BEAM problem.\nThe energy of a beam of length 1 compressed by a force P is to be minimized.  \nThe control variable is the derivative of the deflection angle.This problem can be found here."
},

{
    "location": "tutorials/Beam/main.html#Packages-that-will-be-used-1",
    "page": "Beam Problem",
    "title": "Packages that will be used",
    "category": "section",
    "text": "using NLOptControl\nnothing # hide"
},

{
    "location": "tutorials/Beam/main.html#Differential-Equations-1",
    "page": "Beam Problem",
    "title": "Differential Equations",
    "category": "section",
    "text": "de=[:(sin(x2[j])),:(u1[j])]\nnothing # hide"
},

{
    "location": "tutorials/Beam/main.html#Define-and-Configure-the-Problem:-1",
    "page": "Beam Problem",
    "title": "Define and Configure the Problem:",
    "category": "section",
    "text": "n=define(de;numStates=2,numControls=1,X0=[NaN,NaN],XF=[NaN,NaN],XL=[-0.05,-1.0],XU=[-0.05,1.0],CL=[NaN],CU=[NaN]);\nconfigure!(n;(:integrationScheme=>:trapezoidal),(:finalTimeDV=>false),(:tf=>1.0));\nnothing # hide"
},

{
    "location": "tutorials/Beam/main.html#Objective-Function-1",
    "page": "Beam Problem",
    "title": "Objective Function",
    "category": "section",
    "text": "obj1=integrate!(n,n.r.u[:,1];(:variable=>:control),(:integrand=>:squared));\nobj2=integrate!(n,n.r.x[:,2];C=350.,(:variable=>:state),(:integrand=>:cos));\n@NLobjective(n.mdl,Min,obj1+obj2);\nnothing # hide"
},

{
    "location": "tutorials/Beam/main.html#Optimize-1",
    "page": "Beam Problem",
    "title": "Optimize",
    "category": "section",
    "text": "optimize!(n);\nnothing # hide"
},

{
    "location": "tutorials/Beam/main.html#Post-Process-1",
    "page": "Beam Problem",
    "title": "Post Process",
    "category": "section",
    "text": "using PrettyPlots\nallPlots(n)"
},

{
    "location": "tutorials/HyperSensitive/main.html#",
    "page": "HyperSensitive",
    "title": "HyperSensitive",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/HyperSensitive/main.html#HyperSensitive-1",
    "page": "HyperSensitive",
    "title": "HyperSensitive",
    "category": "section",
    "text": "This problem can be found here."
},

{
    "location": "tutorials/HyperSensitive/main.html#Packages-that-will-be-used-1",
    "page": "HyperSensitive",
    "title": "Packages that will be used",
    "category": "section",
    "text": "using NLOptControl\nnothing # hide"
},

{
    "location": "tutorials/HyperSensitive/main.html#Differential-Equations-1",
    "page": "HyperSensitive",
    "title": "Differential Equations",
    "category": "section",
    "text": "de=[:(-x1[j]^3+u1[j])]\nnothing # hide"
},

{
    "location": "tutorials/HyperSensitive/main.html#Define-and-Configure-the-Problem:-1",
    "page": "HyperSensitive",
    "title": "Define and Configure the Problem:",
    "category": "section",
    "text": "n=define(de;numStates=1,numControls=1,X0=[1.5],XF=[1.],XL=[NaN],XU=[NaN],CL=[NaN],CU=[NaN])\nconfigure!(n,Nck=[20,3,3,3,3,3,3,3,3,3,3,20];(:finalTimeDV=>false),(:tf=>10000.0))\nnothing # hide"
},

{
    "location": "tutorials/HyperSensitive/main.html#Objective-Function-1",
    "page": "HyperSensitive",
    "title": "Objective Function",
    "category": "section",
    "text": "obj1=integrate!(n,n.r.x[:,1];C=0.5,(:variable=>:state),(:integrand=>:squared))\nobj2=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared))"
},

{
    "location": "tutorials/HyperSensitive/main.html#Optimize-1",
    "page": "HyperSensitive",
    "title": "Optimize",
    "category": "section",
    "text": "optimize!(n);\nnothing # hide"
},

{
    "location": "tutorials/HyperSensitive/main.html#Post-Process-1",
    "page": "HyperSensitive",
    "title": "Post Process",
    "category": "section",
    "text": "using PrettyPlots\nallPlots(n)"
},

{
    "location": "tutorials/MoonLander/main.html#",
    "page": "Moon Lander",
    "title": "Moon Lander",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/MoonLander/main.html#Moon-Lander-1",
    "page": "Moon Lander",
    "title": "Moon Lander",
    "category": "section",
    "text": "This problem can be found here."
},

{
    "location": "tutorials/MoonLander/main.html#Packages-that-will-be-used-1",
    "page": "Moon Lander",
    "title": "Packages that will be used",
    "category": "section",
    "text": "using NLOptControl\nnothing # hide"
},

{
    "location": "tutorials/MoonLander/main.html#Differential-Equations-1",
    "page": "Moon Lander",
    "title": "Differential Equations",
    "category": "section",
    "text": "de=[:(x2[j]),:(u1[j]-1.625)]\nnothing # hide"
},

{
    "location": "tutorials/MoonLander/main.html#Define-and-Configure-the-Problem:-1",
    "page": "Moon Lander",
    "title": "Define and Configure the Problem:",
    "category": "section",
    "text": "n=define(de;numStates=2,numControls=1,X0=[10.,-2],XF=[0.,0.],XL=[NaN,NaN],XU=[NaN,NaN],CL=[0.],CU=[3.]);\nconfigure!(n,Nck=[10,10,10,10];(:finalTimeDV=>true));\nnothing # hide"
},

{
    "location": "tutorials/MoonLander/main.html#Additional-information-1",
    "page": "Moon Lander",
    "title": "Additional information",
    "category": "section",
    "text": "names=[:h,:v]; descriptions = [\"h(t)\",\"v(t)\"]; stateNames!(n,names,descriptions);"
},

{
    "location": "tutorials/MoonLander/main.html#Objective-Function-1",
    "page": "Moon Lander",
    "title": "Objective Function",
    "category": "section",
    "text": "obj=integrate!(n,n.r.u[:,1];C=1.0,(:variable=>:control),(:integrand=>:default));\n@NLobjective(n.mdl, Min, obj);\nnothing # hide"
},

{
    "location": "tutorials/MoonLander/main.html#Optimize-1",
    "page": "Moon Lander",
    "title": "Optimize",
    "category": "section",
    "text": "optimize!(n);\nnothing # hide"
},

{
    "location": "tutorials/MoonLander/main.html#Post-Process-1",
    "page": "Moon Lander",
    "title": "Post Process",
    "category": "section",
    "text": "using PrettyPlots\nallPlots(n)"
},

{
    "location": "tutorials/RobotArm/main.html#",
    "page": "RobotArm",
    "title": "RobotArm",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/RobotArm/main.html#RobotArm-1",
    "page": "RobotArm",
    "title": "RobotArm",
    "category": "section",
    "text": "This problem can be found here.  although that example is missing initial and final state constraints and limits on x4"
},

{
    "location": "tutorials/RobotArm/main.html#Packages-that-will-be-used-1",
    "page": "RobotArm",
    "title": "Packages that will be used",
    "category": "section",
    "text": "using NLOptControl\nnothing # hide"
},

{
    "location": "tutorials/RobotArm/main.html#Constants-1",
    "page": "RobotArm",
    "title": "Constants",
    "category": "section",
    "text": "EP=2*eps(); # to avoid divide/0\nQ=5;"
},

{
    "location": "tutorials/RobotArm/main.html#Differential-Equations-1",
    "page": "RobotArm",
    "title": "Differential Equations",
    "category": "section",
    "text": "# Diff Eqs\ndx=[:(x2[j]);\n    :(u1[j]/$Q);\n    :(x4[j]);\n    :(u2[j]/(((($Q-x1[j])^3+x1[j]^3)/3*sin(x5[j])^2)+$EP));\n    :(x6[j]);\n    :(u3[j]/(((($Q-x1[j])^3+x1[j]^3)/3 )+$EP))]\nnothing # hide# expressions\nI_t= :((($Q-x1[j])^3+x1[j]^3)/3*sin(x5[j])^2);\nI_p= :((($Q-x1[j])^3+x1[j]^3)/3 );\n\n# Diff Eqs\ndx=Array{Expr}(6,);\ndx[1]=:(x2[j]);\ndx[2]=:(u1[j]/$Q);\ndx[3]=:(x4[j]);\ndx[4]=:(u2[j]/($I_t+$EP));\ndx[5]=:(x6[j]);\ndx[6]=:(u3[j]/($I_p+$EP));"
},

{
    "location": "tutorials/RobotArm/main.html#Define-and-Configure-the-Problem:-1",
    "page": "RobotArm",
    "title": "Define and Configure the Problem:",
    "category": "section",
    "text": "n=define(dx;numStates=6,numControls=3,X0=[9/2,0.0,0.0,0.0,pi/4,0.0],XF=[9/2,0.0,2*pi/3,0.0,pi/4,0.0],XL=[NaN,NaN,NaN,0.0,NaN,NaN],XU=[NaN,NaN,NaN,1.0,NaN,NaN],CL=[-1.,-1.,-1.],CU=[1.,1.,1.])\nconfigure!(n;(:finalTimeDV=>true))\nnothing # hide"
},

{
    "location": "tutorials/RobotArm/main.html#Objective-Function-1",
    "page": "RobotArm",
    "title": "Objective Function",
    "category": "section",
    "text": "@NLobjective(n.mdl,Min,n.tf);\nnothing # hide"
},

{
    "location": "tutorials/RobotArm/main.html#Optimize-1",
    "page": "RobotArm",
    "title": "Optimize",
    "category": "section",
    "text": "optimize!(n);\nnothing # hide"
},

{
    "location": "tutorials/RobotArm/main.html#Post-Process-1",
    "page": "RobotArm",
    "title": "Post Process",
    "category": "section",
    "text": "using PrettyPlots\nallPlots(n)"
},

{
    "location": "tutorials/Rocket/main.html#",
    "page": "Rocket",
    "title": "Rocket",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/Rocket/main.html#Rocket-1",
    "page": "Rocket",
    "title": "Rocket",
    "category": "section",
    "text": "This problem can be found here."
},

{
    "location": "tutorials/Rocket/main.html#Packages-that-will-be-used-1",
    "page": "Rocket",
    "title": "Packages that will be used",
    "category": "section",
    "text": "using NLOptControl\nnothing # hide"
},

{
    "location": "tutorials/Rocket/main.html#Constants-1",
    "page": "Rocket",
    "title": "Constants",
    "category": "section",
    "text": "# Note that all parameters in the model have been normalized\n# to be dimensionless. See the COPS3 paper for more info.\nh_0 = 1    # Initial height\nv_0 = 0    # Initial velocity\nm_0 = 1    # Initial mass\ng_0 = 1    # Gravity at the surface\n\n# Parameters\nT_c = 3.5  # Used for thrust\nh_c = 500  # Used for drag\nv_c = 620  # Used for drag\nm_c = 0.6  # Fraction of initial mass left at end\n\n# Derived parameters\nc     = 0.5*sqrt(g_0*h_0)  # Thrust-to-fuel mass\nm_f   = m_c*m_0            # Final mass\nD_c   = 0.5*v_c*m_0/g_0    # Drag scaling\nT_max = T_c*g_0*m_0        # Maximum thrust\nnothing # hide"
},

{
    "location": "tutorials/Rocket/main.html#Differential-Equations-1",
    "page": "Rocket",
    "title": "Differential Equations",
    "category": "section",
    "text": "dx=[:(x2[j]);\n:((u1[j]-($D_c*x2[j]^2*exp(-$h_c*(x1[j]-$h_0)/$h_0)))/x3[j]-($g_0*($h_0/x1[j])^2));\n:(-u1[j]/$c)];Drag=:($D_c*x2[j]^2*exp(-$h_c*(x1[j]-$h_0)/$h_0));\nGrav=:($g_0*($h_0/x1[j])^2);\ndx=Array{Expr}(3,);\ndx[1]=:(x2[j]);\ndx[2]=:((u1[j]-$Drag)/x3[j]-$Grav)\ndx[3]=:(-u1[j]/$c);"
},

{
    "location": "tutorials/Rocket/main.html#Define-and-Configure-the-Problem:-1",
    "page": "Rocket",
    "title": "Define and Configure the Problem:",
    "category": "section",
    "text": "n=define(dx;numStates=3,numControls=1,X0=[h_0,v_0,m_0],XF=[NaN,NaN,m_f],XL=[h_0,v_0,m_f],XU=[NaN,NaN,m_0],CL=[0.0],CU=[T_max]);\nconfigure!(n;(:finalTimeDV=>true));\nnothing # hide"
},

{
    "location": "tutorials/Rocket/main.html#Optional-Plot-Labels-1",
    "page": "Rocket",
    "title": "Optional Plot Labels",
    "category": "section",
    "text": "names=[:h,:v,:m]; descriptions=[\"height (t)\",\"velocity (t)\",\"mass (t)\"];\nstateNames!(n,names,descriptions);\nnames=[:T]; descriptions=[\"thrust (t)\"];\ncontrolNames!(n,names,descriptions);"
},

{
    "location": "tutorials/Rocket/main.html#Objective-Function-1",
    "page": "Rocket",
    "title": "Objective Function",
    "category": "section",
    "text": "names=[:h,:v,:m]; descriptions=[\"height (t)\",\"velocity (t)\",\"mass (t)\"];\nstateNames!(n,names,descriptions);\nnames=[:T]; descriptions=[\"thrust (t)\"];\ncontrolNames!(n,names,descriptions);\n@NLobjective(n.mdl,Max,n.r.x[end,1]);\nnothing # hide"
},

{
    "location": "tutorials/Rocket/main.html#Optimize-1",
    "page": "Rocket",
    "title": "Optimize",
    "category": "section",
    "text": "optimize!(n);\nnothing # hide"
},

{
    "location": "tutorials/Rocket/main.html#Post-Process-1",
    "page": "Rocket",
    "title": "Post Process",
    "category": "section",
    "text": "using PrettyPlots\nallPlots(n)"
},

{
    "location": "tutorials/KinematicBicycle/main.html#",
    "page": "Kinematic Bicycle Model",
    "title": "Kinematic Bicycle Model",
    "category": "page",
    "text": ""
},

{
    "location": "tutorials/KinematicBicycle/main.html#Kinematic-Bicycle-Model-1",
    "page": "Kinematic Bicycle Model",
    "title": "Kinematic Bicycle Model",
    "category": "section",
    "text": "The vehicle model comes from the BARC-project"
},

{
    "location": "tutorials/KinematicBicycle/main.html#Packages-that-will-be-used-1",
    "page": "Kinematic Bicycle Model",
    "title": "Packages that will be used",
    "category": "section",
    "text": "using NLOptControl,Parameters,VehicleModels\nnothing # hide"
},

{
    "location": "tutorials/KinematicBicycle/main.html#Parameters-form-VehicleModels.jl-1",
    "page": "Kinematic Bicycle Model",
    "title": "Parameters form VehicleModels.jl",
    "category": "section",
    "text": "pa=VparaKB(x0_=0.);  \n@unpack_VparaKB pa # vehicle parameters\nX0=[x0_,y0_,psi0_,u0_];\nXF=[NaN,NaN,NaN,NaN];\nXL=[x_min,y_min,psi_min,u_min];\nXU=[x_max,y_max,psi_max,u_max];\nCL=[sa_min,ax_min];\nCU=[sa_max,ax_max];\nnothing # hide"
},

{
    "location": "tutorials/KinematicBicycle/main.html#Differential-Equations-1",
    "page": "Kinematic Bicycle Model",
    "title": "Differential Equations",
    "category": "section",
    "text": "n=define(KinematicBicycle;numStates=4,numControls=2,X0=X0,XF=XF,XL=XL,XU=XU,CL=CL,CU=CU);\nnothing # hide"
},

{
    "location": "tutorials/KinematicBicycle/main.html#Add-Parameters-to-the-Model-1",
    "page": "Kinematic Bicycle Model",
    "title": "Add Parameters to the Model",
    "category": "section",
    "text": "n.params=[pa];   # vehicle parameters\nnothing # hide"
},

{
    "location": "tutorials/KinematicBicycle/main.html#Define-and-Configure-the-Problem:-1",
    "page": "Kinematic Bicycle Model",
    "title": "Define and Configure the Problem:",
    "category": "section",
    "text": "configure!(n,Nck=[15,10];(:finalTimeDV=>false),(:tf=>4.0));\nnothing # hide"
},

{
    "location": "tutorials/KinematicBicycle/main.html#additional-information-1",
    "page": "Kinematic Bicycle Model",
    "title": "additional information",
    "category": "section",
    "text": "names=[:x,:y,:psi,:ux];\ndescriptions=[\"X (m)\",\"Y (m)\",\"Yaw Angle (rad)\",\"Longitudinal Velocity (m/s)\"];\nstateNames!(n,names,descriptions)\nnames = [:sr,:jx];\ndescriptions=[\"Steering Angle (rad)\",\"Longitudinal Acceleration (m/s^2)\"];\ncontrolNames!(n,names,descriptions);\nnothing # hide"
},

{
    "location": "tutorials/KinematicBicycle/main.html#Linear-State-Tolerances-1",
    "page": "Kinematic Bicycle Model",
    "title": "Linear State Tolerances",
    "category": "section",
    "text": "mXL=Any[false,false,false,false];\nmXU=Any[false,false,false,-1];  # set to false if you don't want to taper that side\nlinearStateTolerances!(n;mXL=mXL,mXU=mXU);\nnothing # hide"
},

{
    "location": "tutorials/KinematicBicycle/main.html#Objective-Function-1",
    "page": "Kinematic Bicycle Model",
    "title": "Objective Function",
    "category": "section",
    "text": "x_ref = 10; y_ref = 100; # define target\n@NLobjective(n.mdl, Min, (n.r.x[end,1]-x_ref)^2 + (n.r.x[end,2]-y_ref)^2);\nnothing # hide"
},

{
    "location": "tutorials/KinematicBicycle/main.html#Optimize-1",
    "page": "Kinematic Bicycle Model",
    "title": "Optimize",
    "category": "section",
    "text": "optimize!(n);\nnothing # hide"
},

{
    "location": "tutorials/KinematicBicycle/main.html#Post-Process-1",
    "page": "Kinematic Bicycle Model",
    "title": "Post Process",
    "category": "section",
    "text": "using PrettyPlots\nallPlots(n)Notice the longitudinal velocity is pushed down to 29 m/s using the linearStateTolerances!() function."
},

]}
