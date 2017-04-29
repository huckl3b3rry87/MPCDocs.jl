using Documenter,MPCDocs,NLOptControl,PrettyPlots,VehicleModels

makedocs(
    format=:html,
    sitename="MPCDocs.jl",
    modules=[MPCDocs,NLOptControl],
    pages=["index.md"])

deploydocs(
    repo="https://github.com/JuliaMPC/MPCDocs.jl.git",
    julia="0.5",
    target="build",
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
