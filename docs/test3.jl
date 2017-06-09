using NLOptControl,JuMP,PrettyPlots,Plots;gr()


n=define!(;numStates=3,numControls=1,X0=[0.0,0.0,0.0],XF=[2.,2.,NaN],XL=[-NaN,-NaN,-NaN],XU=[NaN,NaN,NaN],CL=[-NaN],CU=[NaN]);
@DiffEq(n,[x[j,3]*sin(u[j,1]);x[j,3]*cos(u[j,1]);9.81*cos(u[j,1])])

configure!(n,Nck=[100];(:finalTimeDV=>true));
