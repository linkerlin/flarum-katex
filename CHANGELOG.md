# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-08-01

### Added
- Initial release of Flarum KaTeX Extension for Flarum 2.0
- LaTeX math rendering with KaTeX v0.16.8
- Support for inline `\(...\)` and block `$$...$$` delimiters
- BBCode compatibility with `[imath]` and `[math]` tags
- Comprehensive admin configuration panel
- Copy-TeX support for copying LaTeX source
- Responsive design with mobile optimization
- Dark mode support
- Error handling with graceful fallbacks
- English and Chinese (Simplified) translations
- CDN integration for optimal performance
- Custom macros support
- Configurable error colors and delimiters

### Technical Features
- Flarum 2.0 API compatibility
- Modern JavaScript with webpack build system
- PSR-4 autoloading
- LESS stylesheets with responsive design
- Comprehensive test coverage
- Production-ready build pipeline

### Requirements
- Flarum 2.0+
- Modern web browser with JavaScript enabled
- No server-side dependencies (uses CDN)