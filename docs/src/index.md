# NLOptControl.jl Documentation


## Introduction
...

## Installation

There are several packages that need to be installed, to do this run:
```julia
Pkg.clone("https://github.com/JuliaMPC/PrettyPlots.jl")
Pkg.clone("https://github.com/JuliaMPC/VehicleModels.jl")
Pkg.clone("https://github.com/JuliaMPC/NLOptControl.jl")
```

## Citation

If you find this package useful, please cite this paper:
```
@Conference{Febbo2017,
  author    = {Huckleberry Febbo, Jiechao Liu, Paramsothy Jayakumar, Jeffrey L. Stein, Tulga Ersal},
  title     = {Moving Obstacle Avoidance for Large, High-Speed Autonomous Ground Vehicles},
  year      = {2017},
  publisher = {IEEE}
}
```

## Tutorials

For `NLOptControl.jl` there are several examples provided:

```@contents
Pages=[
      "tutorials/BrysonDenham/main.md",
      "tutorials/Brachistochrone/main.md",
      "tutorials/HyperSensitive/main.md",
      "tutorials/MoonLander/main.md",
      "tutorials/KinematicBicycle/main.md"
       ]
Depth=1
```

## Background Info
While detailed information on these approaches to discretizing infinite dimensional (or continuous) optimal control problems can be found (and comes from) [this Ph.D. dissertation](http://etd.fcla.edu/UF/UFE0042778/darby_c.pdf), [this related journal publication](http://vdol.mae.ufl.edu/JournalPublications/TOMS-GPOPS-II-August-2013.pdf) and [this technical report](http://systemdesign.illinois.edu/publications/Her15a.pdf), the Background Information section will cover some basics.

```@contents
Pages = [
    "background/lagrange_poly.md",
    "background/optimal_control.md",
    "background/ocp.md",
    "background/time_marching.md",
    "background/pseudospectral_methods.md",
    "background/hp-psuedospectral.md"
    ]
Depth=1
```

## Exported Functions

The following link provides documentation all of the exported functions for `NLOptControl.jl`, `VehicleModels.jl`, and `PrettyPlots.jl`.

```@contents
Pages=[
    "functions/NLOptControl.md",
    "functions/VehicleModels.md",
    "functions/PrettyPlots.md"
    ]
Depth=1
```


## Acknowledgements
Miles Lubin, https://jump.readthedocs.io/en/latest/
Chris Rackauckas, https://github.com/JuliaDiffEq/DifferentialEquations.jl
