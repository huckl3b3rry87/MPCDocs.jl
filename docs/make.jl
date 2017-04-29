using Documenter,MPCDocs#,NLOptControl,PrettyPlots,VehicleModels

#modules=[NLOptControl,PrettyPlots,VehicleModels],
makedocs(modules=[MPCDocs],
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
