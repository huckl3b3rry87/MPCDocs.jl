using NLOptControl
de=[:(x3[j]*sin(u1[j])),:(x3[j]*cos(u1[j])),:(9.81*cos(u1[j]))]

n=define!(de;numStates=3,numControls=1,X0=[0.0,0.0,0.0],XF=[2.,2.,NaN],XL=[-NaN,-NaN,-NaN],XU=[NaN,NaN,NaN],CL=[-NaN],CU=[NaN]);
configure!(n;(:Nck=>[5,5,5,5]),(:finalTimeDV=>true));


names=[:x,:y,:v]; descriptions=["x(t)","y(t)","v(t)"];
stateNames!(n,names,descriptions);
names=[:u]; descriptions=["u(t)"];
controlNames!(n,names,descriptions);

obj=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared));
@NLobjective(n.mdl,Min,n.tf);
optimize!(n);

using PrettyPlots
allPlots(n)


D=
[-1.0         1.50639   -1.10639    0.6;
-0.210639   -0.155051   0.713568  -0.347878;
 0.0506395  -0.233568  -0.644949   0.827878;
-0.0666667   0.276429  -2.00976    1.8]
P=[0.0
1.77526
4.22474
5.0]
