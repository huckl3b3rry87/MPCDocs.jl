using NLOptControl,JuMP,PrettyPlots,Plots;
pyplot()
#gr()

function HyperSensitive{T<:Any}(n::NLOpt,x::Array{T,2},u::Array{T,2}) # dynamic constraint equations
  if n.s.integrationMethod==:tm; L=size(x)[1]; else; L=size(x)[1]-1; end
  dx=Array(Any,L,n.numStates);
  dx[:,1]=@NLexpression(n.mdl, [j=1:L], -x[j,1]^3 + u[j,1] );
  return dx
end

n=define!(;stateEquations=HyperSensitive,numStates=1,numControls=1,X0=[1.],XF=[1.5],XL=[NaN],XU=[NaN],CL=[NaN],CU=[NaN])
#configure!(n,N=1000;(:integrationMethod=>:tm),(:integrationScheme=>:trapezoidal),(:finalTimeDV=>false),(:tf=>10000.0))
#configure!(n,N=10000;(:integrationMethod=>:tm),(:integrationScheme=>:bkwEuler),(:finalTimeDV=>false),(:tf=>10000.0))

#configure!(n,Nck=[3,3,3,3,3,3,3,3,3,3];(:finalTimeDV=>false),(:tf=>10000.0))
#configure!(n,Nck=[20,3,3,3,3,3,3,3,3,3,3,20];(:finalTimeDV=>false),(:tf=>10000.0))
configure!(n,Nck=[200];(:finalTimeDV=>false),(:tf=>10000.0))

obj1=integrate!(n,n.r.x[:,1];C=0.5,(:variable=>:state),(:integrand=>:squared))
obj2=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared))
@NLobjective(n.mdl,Min,obj1+obj2);

optimize!(n)
allPlots(n)
