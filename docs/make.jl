Pkg.add("Ipopt");Pkg.build("Ipopt")
#Pkg.add("PyPlot");Pkg.build("PyPlot")
#Pkg.add("PGFPlots");Pkg.build("PGFPlots")
Pkg.add("GR");Pkg.build("GR")

using Documenter,MPCDocs,NLOptControl,PrettyPlots
makedocs(modules=[NLOptControl,PrettyPlots],
        doctest=false, clean=true,
        format =:html,
        authors="Huckleberry Febbo",
        sitename="NLOptControl.jl",
        pages = Any[
        "Home" => "index.md",
        "Tutorials"=>Any[
              "tutorials/Brachistochrone/main.md",
              "tutorials/MoonLander/main.md",
              "tutorials/BrysonDenham/main.md",
              "tutorials/Beam/main.md",
              "tutorials/HyperSensitive/main.md",
              "tutorials/RobotArm/main.md",
              "tutorials/Rocket/main.md",
              "tutorials/Unicycle/main.md",
              "tutorials/KinematicBicycle/main.md"
               ]
               ]
               )

deploydocs(
    deps=Deps.pip("mkdocs","python-markdown-math"),
    repo="github.com/JuliaMPC/MPCDocs.jl.git",
    target="build",
    osname="linux",
    julia="0.6",
    make=nothing)

#=

     "Exported Functions"=>Any[
     "functions/NLOptControl.md",
     "functions/PrettyPlots.md"
     ]
     ]=#
