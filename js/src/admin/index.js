import app from 'flarum/admin/app';

app.initializers.add('linkerlin-katex', () => {
  app.extensionData
    .for('linkerlin-katex')
    .registerSetting({
      setting: 'linkerlin-katex.inline_delimiters',
      label: app.translator.trans('linkerlin-katex.admin.settings.inline_delimiters'),
      help: app.translator.trans('linkerlin-katex.admin.settings.inline_delimiters_help'),
      type: 'text',
      placeholder: '\\(%e%\\)',
    })
    .registerSetting({
      setting: 'linkerlin-katex.block_delimiters',
      label: app.translator.trans('linkerlin-katex.admin.settings.block_delimiters'),
      help: app.translator.trans('linkerlin-katex.admin.settings.block_delimiters_help'),
      type: 'text',
      placeholder: '$$%e%$$',
    })
    .registerSetting({
      setting: 'linkerlin-katex.bbcode_inline_delimiters',
      label: app.translator.trans('linkerlin-katex.admin.settings.bbcode_inline_delimiters'),
      help: app.translator.trans('linkerlin-katex.admin.settings.bbcode_inline_delimiters_help'),
      type: 'text',
      placeholder: '[imath]%e%[/imath]',
    })
    .registerSetting({
      setting: 'linkerlin-katex.bbcode_block_delimiters',
      label: app.translator.trans('linkerlin-katex.admin.settings.bbcode_block_delimiters'),
      help: app.translator.trans('linkerlin-katex.admin.settings.bbcode_block_delimiters_help'),
      type: 'text',
      placeholder: '[math]%e%[/math]',
    })
    .registerSetting({
      setting: 'linkerlin-katex.throw_on_error',
      label: app.translator.trans('linkerlin-katex.admin.settings.throw_on_error'),
      help: app.translator.trans('linkerlin-katex.admin.settings.throw_on_error_help'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'linkerlin-katex.error_color',
      label: app.translator.trans('linkerlin-katex.admin.settings.error_color'),
      help: app.translator.trans('linkerlin-katex.admin.settings.error_color_help'),
      type: 'text',
      placeholder: '#cc0000',
    })
    .registerSetting({
      setting: 'linkerlin-katex.output_mode',
      label: app.translator.trans('linkerlin-katex.admin.settings.output_mode'),
      help: app.translator.trans('linkerlin-katex.admin.settings.output_mode_help'),
      type: 'select',
      options: {
        htmlAndMathml: 'HTML and MathML',
        html: 'HTML only',
        mathml: 'MathML only',
      },
      default: 'htmlAndMathml',
    })
    .registerSetting({
      setting: 'linkerlin-katex.enable_copy_tex',
      label: app.translator.trans('linkerlin-katex.admin.settings.enable_copy_tex'),
      help: app.translator.trans('linkerlin-katex.admin.settings.enable_copy_tex_help'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'linkerlin-katex.cdn_katex_js',
      label: app.translator.trans('linkerlin-katex.admin.settings.cdn_katex_js'),
      help: app.translator.trans('linkerlin-katex.admin.settings.cdn_katex_js_help'),
      type: 'text',
      placeholder: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js',
    })
    .registerSetting({
      setting: 'linkerlin-katex.cdn_katex_css',
      label: app.translator.trans('linkerlin-katex.admin.settings.cdn_katex_css'),
      help: app.translator.trans('linkerlin-katex.admin.settings.cdn_katex_css_help'),
      type: 'text',
      placeholder: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
    })
    .registerSetting({
      setting: 'linkerlin-katex.cdn_copy_tex',
      label: app.translator.trans('linkerlin-katex.admin.settings.cdn_copy_tex'),
      help: app.translator.trans('linkerlin-katex.admin.settings.cdn_copy_tex_help'),
      type: 'text',
      placeholder: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/copy-tex.min.js',
    });
});