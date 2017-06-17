# NLOptControl.jl (and JuliaMPC) Documentation


## Introduction

This software solves **nonlinear control problems** at a **high-level** very **quickly**.

It added to [juliaOpt](http://www.juliaopt.org/) community by:
 * Providing an implementation of of the [hp-pseudospectral method](http://vdol.mae.ufl.edu/JournalPublications/TOMS-GPOPS-II-August-2013.pdf) written in julia
 * Incorporating model predictive control functionality
 * Automatically visualizing the solution

## Installation

There are several packages that need to be installed, to do this run:
```julia
Pkg.clone("https://github.com/JuliaMPC/PrettyPlots.jl")
Pkg.clone("https://github.com/JuliaMPC/VehicleModels.jl")
Pkg.clone("https://github.com/JuliaMPC/NLOptControl.jl")
```

Either [Ipopt.jl](https://github.com/JuliaOpt/Ipopt.jl) or [KNITRO.jl](https://github.com/JuliaOpt/KNITRO.jl) can be used for the nonlinear solver. Since **Ipopt** is free, all of the examples will use it and it can be added with:
```julia
Pkg.add("Ipopt");Pkg.build("Ipopt");
```

If you are using **Linux** make sure that you have **gfortran** to run **Ipopt**:
```julia
sudo apt-get install gfortran
```

Also, a plotting backend will be required and there are several options:
```julia
Pkg.add("PGFPlots");Pkg.build("PGFPlots")   # best looking
Pkg.add("GR");Pkg.build("GR");              # most reliable
Pkg.add("PyPlot");Pkg.build("PyPlot")       # also a good option  
```

## Tutorials

For `NLOptControl.jl` there are several examples provided:

```@contents
Pages=[
      "tutorials/BrysonDenham/main.md",
      "tutorials/Brachistochrone/main.md",
      "tutorials/Beam/main.md",
      "tutorials/HyperSensitive/main.md",
      "tutorials/MoonLander/main.md",
      "tutorials/KinematicBicycle/main.md",
      "tutorials/RobotArm/main.md"
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

## Citation
If you find [NLOptControl.jl](https://github.com/JuliaMPC/NLOptControl.jl) useful, please cite it:
```
@software{hadoop,
  author = {{Huckleberry Febbo}},
  title = {NLOptControl.jl},
  url = {https://github.com/JuliaMPC/NLOptControl.jl},
  version = {0.0.1},
  date = {2017-06-17},
}
```

If you find [VehicleModels.jl](https://github.com/JuliaMPC/VehicleModels.jl) useful, please cite this paper:
```
@Conference{Febbo2017,
  author    = {Huckleberry Febbo, Jiechao Liu, Paramsothy Jayakumar, Jeffrey L. Stein, Tulga Ersal},
  title     = {Moving Obstacle Avoidance for Large, High-Speed Autonomous Ground Vehicles},
  year      = {2017},
  publisher = {IEEE}
}
```

## Acknowledgements
* [JuMP.jl](https://jump.readthedocs.io/en/latest/) is an important part of this NLOptControl.jl and discussions with Miles Lubin where helpful
* Chris Rackauckas is a very helpful member of the julia community and has provided me support and advice multiple times his software [DifferentialEquations.jl](https://github.com/JuliaDiffEq/DifferentialEquations.jl) is also part of NLOptControl.jl

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
