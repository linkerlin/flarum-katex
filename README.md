# Flarum KaTeX Extension

A KaTeX math rendering extension for Flarum 2.0 that allows users to write LaTeX mathematical expressions in posts.

## Features

- **LaTeX Math Rendering**: Render mathematical expressions using KaTeX
- **Inline and Block Math**: Support for both inline `\( ... \)` and block `$$ ... $$` math
- **BBCode Support**: Internal BBCode tags `[imath]...[/imath]` and `[math]...[/math]`
- **Copy-TeX Support**: Allow users to copy LaTeX source from rendered math
- **Configurable**: Customizable delimiters, error handling, and CDN sources
- **Responsive**: Mobile-friendly math rendering
- **Flarum 2.0 Compatible**: Built specifically for Flarum 2.0 API

## Installation

Install using Composer:

```bash
composer require linkerlin/flarum-katex
```

## Usage

### Inline Math
Use `\( ... \)` for inline mathematical expressions:

```
The quadratic formula is \( x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \).
```

### Block Math
Use `$$ ... $$` for block mathematical expressions:

```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### BBCode (Alternative)
You can also use BBCode tags:

- Inline: `[imath]x^2 + y^2 = z^2[/imath]`
- Block: `[math]\sum_{i=1}^{n} i = \frac{n(n+1)}{2}[/math]`

## Configuration

The extension provides several configuration options in the admin panel:

- **Delimiters**: Customize the delimiters for inline and block math
- **Error Handling**: Choose how to handle rendering errors
- **Output Mode**: Select HTML, MathML, or both
- **Copy-TeX**: Enable/disable LaTeX source copying
- **CDN Sources**: Configure KaTeX library sources

## Examples

Here are some example mathematical expressions you can use:

### Basic Math
- `\( a^2 + b^2 = c^2 \)` - Pythagorean theorem
- `\( \frac{1}{2} \)` - Fractions
- `\( \sqrt{x} \)` - Square roots

### Advanced Math
- `$$ \sum_{i=1}^{n} i = \frac{n(n+1)}{2} $$` - Summation
- `$$ \int_0^1 x^2 dx = \frac{1}{3} $$` - Integration
- `$$ \lim_{x \to \infty} \frac{1}{x} = 0 $$` - Limits

### Matrices
```
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$
```

## Requirements

- Flarum 2.0 or higher
- PHP 8.1 or higher

## License

This extension is licensed under the MIT License.

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/linkerlin/flarum-katex).

## Credits

- Built for Flarum 2.0
- Uses [KaTeX](https://katex.org/) for math rendering
- Inspired by the MathRen extension for Flarum 1.x