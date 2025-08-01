# Flarum KaTeX Extension

A comprehensive KaTeX LaTeX math rendering extension for Flarum 2.0.

## Features

- **LaTeX Math Rendering**: Supports both inline `\(...\)` and block `$$...$$` delimiters
- **BBCode Support**: Additional `[imath]` and `[math]` tags for compatibility
- **Admin Configuration**: Customizable settings through admin panel
- **CDN Integration**: Uses KaTeX v0.16.8 via CDN for optimal performance
- **Copy-TeX Support**: Allows users to copy LaTeX source from rendered formulas
- **Error Handling**: Graceful fallback for invalid LaTeX expressions
- **Responsive Design**: Mobile-friendly styling
- **Internationalization**: English and Chinese (Simplified) translations

## Installation

Install with composer:

```bash
composer require linkerlin/flarum-katex
```

## Usage

### Inline Math
```
The quadratic formula is \(x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}\)
```

### Block Math
```
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
```

### BBCode
```
[imath]E = mc^2[/imath]
[math]\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}[/math]
```

## Configuration

Access the admin panel to configure:

- Enable/disable the extension
- Choose math delimiters
- Set error handling options
- Define custom macros
- Customize error colors

## Requirements

- Flarum 2.0+
- Modern web browser with JavaScript enabled

## License

MIT License. See [LICENSE](LICENSE) file for details.