# Installation Guide

## Requirements

- Flarum 2.0 or higher
- PHP 8.1 or higher
- Composer

## Installation

### Method 1: Composer (Recommended)

```bash
composer require linkerlin/flarum-katex
```

### Method 2: Manual Installation

1. Download the extension files
2. Extract to your Flarum's `extensions` directory
3. Run composer install in the extension directory:
   ```bash
   cd extensions/linkerlin-flarum-katex
   composer install --no-dev
   ```

## Enable the Extension

1. Go to your Flarum admin panel
2. Navigate to Extensions
3. Find "KaTeX Math Renderer" and enable it

## Configuration

After enabling the extension, you can configure it in the admin panel:

### Basic Settings

- **Inline Math Delimiters**: Default `\(%e%\)` - for inline math like `\(x^2\)`
- **Block Math Delimiters**: Default `$$%e%$$` - for block math like `$$x^2$$`
- **BBCode Delimiters**: Internal delimiters used for processing (usually don't need to change)

### Advanced Settings

- **Error Handling**: Choose whether to throw errors or display error messages
- **Error Color**: Color for error text (default: #cc0000)
- **Output Mode**: Choose HTML, MathML, or both
- **Copy-TeX**: Enable users to copy LaTeX source from rendered math

### CDN Settings

- **KaTeX JavaScript CDN**: URL for KaTeX library
- **KaTeX CSS CDN**: URL for KaTeX stylesheet
- **Copy-TeX CDN**: URL for copy-tex extension

## Usage Examples

### Inline Math
```
The quadratic formula is \( x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \).
```

### Block Math
```
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

### BBCode Alternative
```
Inline: [imath]x^2 + y^2 = z^2[/imath]
Block: [math]\int_0^1 x^2 dx = \frac{1}{3}[/math]
```

## Troubleshooting

### Math Not Rendering

1. Check that the extension is enabled
2. Verify KaTeX CDN URLs are accessible
3. Check browser console for JavaScript errors
4. Ensure proper delimiter syntax

### Performance Issues

1. Consider using a local KaTeX installation instead of CDN
2. Disable copy-tex if not needed
3. Use HTML-only output mode for better performance

### Mobile Display Issues

The extension includes responsive CSS, but you may need to adjust your theme's CSS for optimal mobile display.

## Customization

### Custom Delimiters

You can customize the delimiters in the admin panel. The `%e%` placeholder represents the mathematical expression.

### Custom Styling

Add custom CSS to your theme to modify the appearance:

```css
.katex-inline {
    /* Custom inline math styles */
}

.katex-block {
    /* Custom block math styles */
}
```

### Local KaTeX Installation

For better performance and offline support, you can host KaTeX locally:

1. Download KaTeX from https://github.com/KaTeX/KaTeX/releases
2. Upload to your server
3. Update CDN URLs in admin panel to point to your local files

## Support

For issues and questions:
- GitHub Issues: https://github.com/linkerlin/flarum-katex/issues
- Flarum Community: https://discuss.flarum.org/

## License

This extension is released under the MIT License.