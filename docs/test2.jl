###Bryson Denham
de=[:(x2[j]),:(u1[j])]
n=define(de;numStates=2,numControls=1,X0=[0.,1],XF=[0.,-1.],XL=[0.,NaN],XU=[1/9,NaN],CL=[NaN],CU=[NaN]);
configure!(n;(:finalTimeDV=>false),(:tf=>1.0));
obj=integrate!(n,n.r.u[:,1];C=0.5,(:variable=>:control),(:integrand=>:squared));
@NLobjective(n.mdl,Min,obj);
optimize!(n);
allPlots(n)

## Rocket
Drag=:($D_c*x2[j]^2*exp(-$h_c*(x1[j]-$h_0)/$h_0));
Grav=:($g_0*($h_0/x1[j])^2);

de=Array{Expr}(3,);
de[1]=:(x2[j]);
de[2]=:((u1[j]-$Drag)/x3[j]-$Grav)
de[3]=:(-u1[j]/$c);

n=define(de;numStates=3,numControls=1,X0=[h_0,v_0,m_0],XF=[NaN,NaN,m_f],XL=[h_0,v_0,m_f],XU=[NaN,NaN,m_0],CL=[0.0],CU=[T_max]);
configure!(n;(:finalTimeDV=>true));

names=[:h,:v,:m]; descriptions=["height (t)","velocity (t)","mass (t)"];
stateNames!(n,names,descriptions);
names=[:T]; descriptions=["thrust (t)"];
controlNames!(n,names,descriptions);
@NLobjective(n.mdl,Max,n.r.x[end,1]);

optimize!(n);
allPlots(n)
