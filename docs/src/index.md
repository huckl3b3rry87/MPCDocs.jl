# NLOptControl.jl Documentation


## Introduction

This software solves **nonlinear control problems** at a **high-level** very **quickly**.

It added to [juliaOpt](http://www.juliaopt.org/) community by:
 * Providing an implementation of of the [hp-pseudospectral method](http://vdol.mae.ufl.edu/JournalPublications/TOMS-GPOPS-II-August-2013.pdf) written in julia
 * Incorporating model predictive control functionality
 * Automatically visualizing the solution

## Installation

There are several packages that need to be installed, to do this run:
```julia
Pkg.add("PrettyPlots")
Pkg.add("VehicleModels")
Pkg.add("NLOptControl")
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

## Citation
If you find [NLOptControl.jl](https://github.com/JuliaMPC/NLOptControl.jl) useful, please cite it:
```
@software{nlopt,
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

## MPC Functionality

The following link provides documentation all of the MPC specific functionality for `NLOptControl.jl`.

```@contents
Pages=[
    "functions/MPC.md",
    ]
Depth=1
```

## 2017 juliaCon Workshop Notebook (OUT OF DATE!)

After installation, the notebook can be viewed:
```julia
using IJulia
notebook(dir=Pkg.dir("NLOptControl/examples"))
```

Also, on the left side of this site, there are many tutorials that provide complete examples for using this software. Please look at these for information on how to use this tool.


## Acknowledgements
* [JuMP.jl](https://jump.readthedocs.io/en/latest/) is an important part of this NLOptControl.jl and discussions with Miles Lubin where helpful
* Chris Rackauckas is a very helpful member of the julia community and has provided me support and advice multiple times his software [DifferentialEquations.jl](https://github.com/JuliaDiffEq/DifferentialEquations.jl) is also part of NLOptControl.jl

## Exported Functions

The following link provides documentation all of the exported functions for `NLOptControl.jl`, `VehicleModels.jl`, and `PrettyPlots.jl`.

```@contents
Pages=[
    "functions/NLOptControl.md",
    "functions/PrettyPlots.md"
    ]
Depth=1
```
