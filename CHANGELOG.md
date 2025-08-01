# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-01

### Added
- Initial release for Flarum 2.0
- KaTeX math rendering support
- Inline math with `\( ... \)` delimiters
- Block math with `$$ ... $$` delimiters
- BBCode support with `[imath]...[/imath]` and `[math]...[/math]`
- Copy-TeX support for copying LaTeX source
- Configurable delimiters and options
- Admin panel settings
- Responsive design for mobile devices
- Multi-language support (English and Chinese)
- Error handling and display
- CDN configuration options

### Features
- **Math Rendering**: High-quality mathematical typesetting using KaTeX
- **Multiple Input Formats**: Support for LaTeX delimiters and BBCode tags
- **Copy Functionality**: Users can copy LaTeX source from rendered math
- **Customizable**: Configurable delimiters, error handling, and appearance
- **Mobile Friendly**: Responsive design that works on all devices
- **Performance**: Fast rendering with CDN-hosted KaTeX library

### Technical Details
- Compatible with Flarum 2.0 API
- Uses s9e TextFormatter for BBCode processing
- Integrates with Flarum's composer and preview system
- Supports both HTML and MathML output modes
- Includes proper error handling and fallbacks