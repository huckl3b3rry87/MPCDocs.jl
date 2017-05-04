# CREDIT: parts of this implementation were inspired by Plots.jl

"""
Holds all data needed for a documentation example... header, description, and plotting expression (Expr)
"""
type Example
  header::AbstractString
  desc::AbstractString
  exprs::Vector{Expr}
end

# the _examples we'll run for each
const _examples = Example[

Example("Lines",
    "A simple line plot of the columns.",
    [:(begin
        println("testing")
    end)]
),


]

# ---------------------------------------------------------------------------------

# make and display one plot
function test_examples(problem::Symbol, idx::Int; disp = true)
  info("Testing Problem: $problem:$idx:$(_examples[idx].header)")
  defineProb(pkgname)
  map(eval, _examples[idx].exprs)



end
