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
    "text": "Pages = [\"main/intro.md\"]\nDepth = 1#Documentation TitleSome text describing the package."
},

{
    "location": "index.html#Subtitle-1",
    "page": "Home",
    "title": "Subtitle",
    "category": "section",
    "text": "More text"
},

{
    "location": "index.html#Tutorials-1",
    "page": "Home",
    "title": "Tutorials",
    "category": "section",
    "text": "Pages = [\n    \"tutorials/MoonLander/MoonLander.md\"\n    ]\nDepth = 2"
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
    "text": "using NLOptControl,JuMP,Parameters,PrettyPlots,Plots\ns=Settings();n=NLOpt();pgfplots();\nconst g = 1.62519; # m/s^2\nfunction MoonLander{T<:Any}(mdl::JuMP.Model,n::NLOpt,r::Result,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations\n  if n.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end\n  dx = Array(Any,L,n.numStates)\n  dx[:,1] =  @NLexpression(mdl, [j=1:L], x[j,2] );\n  dx[:,2] =  @NLexpression(mdl, [j=1:L], u[j,1] - g);\n  return dx\nend\ndefine!(n,stateEquations=MoonLander,numStates=2,numControls=1,X0=[10.,-2],XF=[0.,0.],XL=[NaN,NaN],XU=[NaN,NaN],CL=[0.],CU=[3.])\nconfigure!(n,Ni=4,Nck=[10,10,10,10];(:integrationMethod => :ps),(:integrationScheme => :lgrExplicit),(:finalTimeDV =>true))\n#configure!(n,N=40;(:integrationMethod => :tm),(:integrationScheme => :bkwEuler),(:finalTimeDV =>true))\n\nnames = [:h,:v]; descriptions = [\"h(t)\",\"v(t)\"]; stateNames!(n,names,descriptions);\nmdl=defineSolver!(n;name=:IPOPT,max_iter=1000,feastol_abs=1.0e-3,infeastol=1.0e-8,opttol_abs=1.0e-3);\nr=OCPdef!(mdl,n,s);\nobj=integrate!(mdl,n,r.u[:,1];C=1.0,(:variable=>:control),(:integrand=>:default))\n@NLobjective(mdl, Min, obj); optimize!(mdl,n,r,s);\nplotSettings(;(:mpc_lines =>[(4.0,:blue,:solid)]),(:size=>(700,700)));\nresultsDir!(r);\nallPlots(n,r,1);(Image: ) (Image: )"
},

]}
