using NLOptControl,JuMP,PrettyPlots,Plots;gr()

#@DiffEq(Brachistochrone,[x[j,3]*sin(u[j,1]);x[j,3]*cos(u[j,1]);9.81*cos(u[j,1])])
#@DiffEq(Brachistochrone,[u[j,1];u[j,1];u[j,1]])
#$(refcall) =

#JuMP.NonlinearExpression($m, @JuMP.processNLExpr($m, $(esc(x))))
#=
ex = JuMP.@processNLExpr($m, $(esc(x)))
dx=Array(JuMP.NonlinearExpression,3,1);
dx[1]=:($(n.r.x)[j,3]*sin($(n.r.u)[j,1]));
dx[2]=:($(n.r.x)[j,3]*cos($(n.r.u)[j,1]));
dx[3]=:(9.81*cos($(n.r.u)[j,1]));
=#
#@DiffEq(Brachistochrone,[$(x[j,3])*sin(u[j,1]);$(x[j,3])*cos($(u[j,1]));9.81*cos($(u[j,1]))])  # can do this afterwards

function Brachistochrone{T<:Any}(n::NLOpt,x::Array{T,2},u::Array{T,2})
  if n.s.integrationMethod==:tm; L=size(x)[1]; else L=size(x)[1]-1; end
  dx = Array(Any,L,n.numStates)
  dx[:,1]=@NLexpression(n.mdl, [j=1:L], x[j,3]*sin(u[j,1]) );
  dx[:,2]=@NLexpression(n.mdl, [j=1:L], x[j,3]*cos(u[j,1]) );
  dx[:,3]=@NLexpression(n.mdl, [j=1:L], 9.81*cos(u[j,1]) );
  return dx
end

n=define!(stateEquations=Brachistochrone;numStates=3,numControls=1,X0=[0.0,0.0,0.0],XF=[2.,2.,NaN],XL=[-NaN,-NaN,-NaN],XU=[NaN,NaN,NaN],CL=[-NaN],CU=[NaN]);
configure!(n,Nck=[100];(:finalTimeDV=>true));

#configure!(n,N=30;(:integrationMethod=>:tm),(:integrationScheme=>:trapezoidal),(:finalTimeDV=>true));
#configure!(n,Ni=4,Nck=[10,10,10,10];(:integrationMethod=>:ps),(:integrationScheme=>:lgrExplicit),(:finalTimeDV=>true),(:tf=>4));
names=[:x,:y,:v]; descriptions=["x(t)","y(t)","v(t)"];
stateNames!(n,names,descriptions);
names=[:u]; descriptions=["u(t)"];
controlNames!(n,names,descriptions);

obj=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared));
@NLobjective(n.mdl,Min,n.tf);
optimize!(n);
allPlots(n)
