# KaTeX Examples

This document provides examples of mathematical expressions you can use with the Flarum KaTeX extension.

## Basic Math

### Numbers and Variables
```latex
\( x \), \( y \), \( z \)
\( 123 \), \( 3.14159 \)
```

### Superscripts and Subscripts
```latex
\( x^2 \), \( x^{10} \), \( x^{y+z} \)
\( x_1 \), \( x_{ij} \), \( x_{i+j} \)
\( x_1^2 \), \( x_{i,j}^{(n)} \)
```

### Fractions
```latex
\( \frac{1}{2} \), \( \frac{x}{y} \), \( \frac{x+1}{y-1} \)
\( \frac{\frac{1}{2}}{\frac{3}{4}} \)
```

### Roots
```latex
\( \sqrt{x} \), \( \sqrt{x+y} \), \( \sqrt[3]{x} \), \( \sqrt[n]{x} \)
```

## Advanced Math

### Summations and Products
```latex
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$
$$\prod_{i=1}^{n} i = n!$$
$$\sum_{i=0}^{\infty} \frac{1}{2^i} = 2$$
```

### Integrals
```latex
$$\int_0^1 x^2 dx = \frac{1}{3}$$
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
$$\oint_C f(z) dz = 2\pi i \sum \text{Res}(f, a_k)$$
```

### Limits
```latex
$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$
$$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$$
```

### Derivatives
```latex
\( f'(x) \), \( \frac{df}{dx} \), \( \frac{\partial f}{\partial x} \)
$$\frac{d}{dx} \sin x = \cos x$$
$$\frac{\partial^2 f}{\partial x \partial y}$$
```

## Matrices and Arrays

### Basic Matrices
```latex
$$\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}$$

$$\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}$$

$$\begin{vmatrix}
a & b \\
c & d
\end{vmatrix} = ad - bc$$
```

### Systems of Equations
```latex
$$\begin{cases}
x + y = 1 \\
x - y = 0
\end{cases}$$

$$\begin{align}
x + y &= 1 \\
2x - y &= 0
\end{align}$$
```

## Greek Letters

### Lowercase
```latex
\( \alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta \)
\( \iota, \kappa, \lambda, \mu, \nu, \xi, \pi, \rho \)
\( \sigma, \tau, \upsilon, \phi, \chi, \psi, \omega \)
```

### Uppercase
```latex
\( \Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma \)
\( \Upsilon, \Phi, \Psi, \Omega \)
```

## Special Symbols

### Mathematical Operators
```latex
\( \pm, \mp, \times, \div, \cdot, \ast, \star \)
\( \cap, \cup, \setminus, \subset, \supset, \subseteq, \supseteq \)
\( \in, \notin, \ni, \emptyset, \varnothing \)
```

### Arrows
```latex
\( \leftarrow, \rightarrow, \leftrightarrow, \Leftarrow, \Rightarrow, \Leftrightarrow \)
\( \uparrow, \downarrow, \updownarrow, \nearrow, \searrow, \swarrow, \nwarrow \)
```

### Logic Symbols
```latex
\( \land, \lor, \lnot, \implies, \iff, \forall, \exists, \nexists \)
```

## Functions

### Trigonometric
```latex
\( \sin x, \cos x, \tan x, \cot x, \sec x, \csc x \)
\( \arcsin x, \arccos x, \arctan x \)
\( \sinh x, \cosh x, \tanh x \)
```

### Logarithmic
```latex
\( \log x, \ln x, \log_2 x, \log_{10} x \)
$$\log_a b = \frac{\ln b}{\ln a}$$
```

## Physics and Chemistry

### Physics Formulas
```latex
$$E = mc^2$$
$$F = ma$$
$$PV = nRT$$
$$\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}$$
```

### Chemistry
```latex
\( \ce{H2O} \), \( \ce{CO2} \), \( \ce{NaCl} \)
\( \ce{H2SO4} \), \( \ce{Ca(OH)2} \)
```

## Complex Examples

### Fourier Transform
```latex
$$\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i x \xi} dx$$
```

### Schrödinger Equation
```latex
$$i\hbar \frac{\partial}{\partial t} \Psi = \hat{H} \Psi$$
```

### Maxwell's Equations
```latex
$$\begin{align}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{align}$$
```

### Probability and Statistics
```latex
$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$
$$\sigma^2 = \mathbb{E}[(X - \mu)^2]$$
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
```

## Tips for Writing Math

1. **Use proper delimiters**: `\( ... \)` for inline, `$$ ... $$` for block
2. **Group with braces**: Use `{}` to group expressions: `x^{2y}` not `x^2y`
3. **Use proper spacing**: KaTeX handles most spacing automatically
4. **Test complex expressions**: Preview your math before posting
5. **Use BBCode as fallback**: `[imath]...[/imath]` and `[math]...[/math]` also work

## Common Mistakes

1. **Missing braces**: `x^2y` vs `x^{2y}`
2. **Wrong delimiters**: Using `$` instead of `$$` for block math
3. **Unescaped characters**: Remember to escape `\`, `{`, `}` when needed
4. **Nested fractions**: Use `\frac{\frac{a}{b}}{\frac{c}{d}}` carefully

For more KaTeX functions and symbols, visit: https://katex.org/docs/supported.html