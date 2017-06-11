using NLOptControl

@DiffEq Brachistochrone begin
  dx[:,1]=@NLexpression(n.mdl, [j=1:L], x[j,3]*sin(u[j,1]) );
  dx[:,2]=@NLexpression(n.mdl, [j=1:L], x[j,3]*cos(u[j,1]) );
  dx[:,3]=@NLexpression(n.mdl, [j=1:L], 9.81*cos(u[j,1]) );
end

n=define!(;stateEquations=Brachistochrone,numStates=3,numControls=1,X0=[0.0,0.0,0.0],XF=[2.,2.,NaN],XL=[-NaN,-NaN,-NaN],XU=[NaN,NaN,NaN],CL=[-NaN],CU=[NaN]);
configure!(n,Nck=[100];(:finalTimeDV=>true));

names=[:x,:y,:v]; descriptions=["x(t)","y(t)","v(t)"];
stateNames!(n,names,descriptions);
names=[:u]; descriptions=["u(t)"];
controlNames!(n,names,descriptions);

obj=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared));
@NLobjective(n.mdl,Min,n.tf);

using PrettyPlots
allPlots(n)
