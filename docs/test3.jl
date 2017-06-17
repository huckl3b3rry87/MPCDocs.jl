

using NLOptControl

de=[:(sin(x2[j])),:(u1[j])]

n=define!(de;numStates=2,numControls=1,X0=[NaN,NaN],XF=[NaN,NaN],XL=[-0.05,-1.0],XU=[-0.05,1.0],CL=[NaN],CU=[NaN]);
configure!(n;(:finalTimeDV=>false),(:tf=>1.0));
#configure!(n;(:integrationScheme=>:bkwEuler),(:finalTimeDV=>false),(:tf=>1.0));

obj1=integrate!(n,n.r.u[:,1];(:variable=>:control),(:integrand=>:squared));
obj2=integrate!(n,n.r.x[:,2];C=350.,(:variable=>:state),(:integrand=>:cos));
@NLobjective(n.mdl,Min,obj1+obj2);


optimize!(n);

using PrettyPlots
allPlots(n)
