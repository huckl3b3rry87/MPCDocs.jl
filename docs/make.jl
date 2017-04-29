using Documenter,MPCDocs,NLOptControl,PrettyPlots,VehicleModels

makedocs(modules=[NLOptControl,PrettyPlots,VehicleModels],
        doctest=false, clean=true,
        format =:html,
        authors="Huckleberry Febbo",
        sitename="NLOptControl.jl",
        pages = Any[
        "Home" => "index.md",
        "Tutorials" => Any[
          "tutorials/MoonLander.md"
         ]
         ])

deploydocs(
    deps   = Deps.pip("mkdocs", "python-markdown-math"),
    repo="https://github.com/JuliaMPC/MPCDocs.jl.git",
    target = "build",
    osname = "linux",
    julia = "0.5",
    deps=nothing,
    make=nothing)
#=
makedocs(modules=[NLOptControl,PrettyPlots,VehicleModels],
         doctest=false, clean=true,
         format =:html,
         sitename="NLOptControl.jl",
         authors="Huckleberry Febbo",
         pages = Any[
         "Home" => "index.md",
         "Tutorials" => Any[
           "tutorials/MoonLander.md"
         ]
])

deploydocs(
   repo = "github.com/JuliaMPC/MPCDocs.jl.git",
   target = "build",
   osname = "linux",
   julia = "0.5",
   deps = nothing)
   =#
#=
deploydocs(
   repo = "github.com/JuliaMPC/MPCDocs.jl.git",
   target = "build",
   osname = "linux",
   julia = "0.5",
   deps = nothing,
make = nothing)
=#
