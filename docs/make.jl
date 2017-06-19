Pkg.add("Ipopt");Pkg.build("Ipopt");
#Pkg.add("PyPlot");Pkg.build("PyPlot")
#Pkg.add("PGFPlots");Pkg.build("PGFPlots");
Pkg.add("GR");Pkg.build("GR")

using Documenter,MPCDocs,NLOptControl,PrettyPlots,VehicleModels

println("\n before make \n")

makedocs(modules=[NLOptControl,PrettyPlots,VehicleModels],
        doctest=false, clean=true,
        format =:html,
        authors="Huckleberry Febbo",
        sitename="NLOptControl.jl",
        pages = Any[
        "Home" => "index.md",
        "Tutorials"=>Any[
            "tutorials/BrysonDenham/main.md",
            "tutorials/Brachistochrone/main.md",
            "tutorials/Beam/main.md",
            "tutorials/HyperSensitive/main.md",
            "tutorials/MoonLander/main.md",
            "tutorials/KinematicBicycle/main.md",
            "tutorials/RobotArm/main.md"
         ],
         "Exported Functions"=>Any[
         "functions/NLOptControl.md",
         "functions/VehicleModels.md",
         "functions/PrettyPlots.md"
         ]
         ])

println("\n before deploy \n")

deploydocs(
    deps=Deps.pip("mkdocs","python-markdown-math"),
    repo="github.com/JuliaMPC/MPCDocs.jl.git",
    target="build",
    osname="linux",
    julia="0.5",
    make=nothing)
