\begin{equation*}
  \begin{aligned}
     & \underset{{\boldsymbol{\xi}} ,\;{\boldsymbol{\zeta}} ,\;{1}{\textbf{minimize}}
     & & {\cal{F}}(1)+{\cal{I}}(\boldsymbol{\xi}(\tau),\boldsymbol{\zeta}(\tau)) \\
     & \textbf{subject to}
     & & \dot{\boldsymbol{\xi}}(\tau) = {\color{green}{\frac{T_p-T_0}{2}}}\mathbfcal{V}(\boldsymbol{\xi}(\tau),\boldsymbol{\zeta}(\tau))
     & \textbf{\color{blue}Dynamic} \\
     & & & \boldsymbol{\xi}_{min}(\tau) \le \boldsymbol{\xi}(\tau) \le \boldsymbol{\xi}_{max}(\tau)
     & \textbf{\color{blue}State Limit} \\
     & & & \boldsymbol{\zeta}_{min}(\tau) \le \boldsymbol{\zeta}(\tau) \le \boldsymbol{\zeta}_{max}(\tau)
     & \textbf{\color{blue}Control Limit} \\
     & & &{\mathbfcal{T}}(\boldsymbol{\Xi_0},\boldsymbol{\xi}(-1),{\mathbfcal{G}},\boldsymbol{\xi}(1)) \le 0
     & \textbf{\color{blue}Initial and Terminal State} \\
     & & & {\mathbfcal{H}}({\mathbfcal{E}(\tau)},\boldsymbol{\xi}(\tau),\boldsymbol{\zeta}(\tau)) \le 0
     & \textbf{\color{blue}Additional Constraints}
  \end{aligned}
\end{equation*}

where,
\begin{center}
  \begin{tabular}{c c | c c}
    \hline
     ${\boldsymbol{\Xi_{0}}}$ & actual intial vehicle state & ${\boldsymbol{\xi}}$ & state vectors \\
    \hline
    ${\boldsymbol{\zeta}}$ & control vectors &  $t$ & time  \\
    \hline
    $T_{0}$ & constant intial time & $T_{p}$ & variable final time \\
    \hline
    ${\mathbfcal{G}}$ & goal info. & ${\mathbfcal{E}}$ & environment info. \\
    \hline
  \end{tabular}
\end{center}
