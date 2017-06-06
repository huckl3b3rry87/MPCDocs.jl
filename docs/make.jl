Pkg.add("Ipopt")
Pkg.build("Ipopt")
#Pkg.add("PGFPlots")
#Pkg.add("PyPlot");Pkg.build("PyPlot")
Pkg.add("GR"); Pkg.build("GR")

using Documenter,MPCDocs,NLOptControl,PrettyPlots,VehicleModels

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
            "tutorials/Brachistochrone/main_test.md",
            "tutorials/HyperSensitive/main.md",
            "tutorials/MoonLander/main.md",
            "tutorials/KinematicBicycle/main.md"
         ],
         "Background Information"=>Any[
             "background/lagrange_poly.md",
             "background/ocp.md",
             "background/time_marching.md",
             "background/pseudospectral_methods.md",
             "background/hp_psuedospectral.md"
             ],
         "Exported Functions"=>Any[
         "functions/NLOptControl.md",
         "functions/VehicleModels.md",
         "functions/PrettyPlots.md"
         ]
         ])
deploydocs(
    deps=Deps.pip("mkdocs","python-markdown-math"),
    repo="github.com/JuliaMPC/MPCDocs.jl.git",
    target="build",
    osname="linux",
    julia="0.5",
    make=nothing)
