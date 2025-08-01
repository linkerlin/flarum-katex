import app from 'flarum/admin/app';

app.initializers.add('linkerlin/flarum-katex', () => {
  app.extensionData
    .for('linkerlin-flarum-katex')
    .registerSetting({
      setting: 'linkerlin-katex.enabled',
      type: 'boolean',
      label: app.translator.trans('linkerlin-katex.admin.settings.enabled_label'),
      help: app.translator.trans('linkerlin-katex.admin.settings.enabled_help'),
    })
    .registerSetting({
      setting: 'linkerlin-katex.displayMode',
      type: 'boolean',
      label: app.translator.trans('linkerlin-katex.admin.settings.display_mode_label'),
      help: app.translator.trans('linkerlin-katex.admin.settings.display_mode_help'),
    })
    .registerSetting({
      setting: 'linkerlin-katex.throwOnError',
      type: 'boolean',
      label: app.translator.trans('linkerlin-katex.admin.settings.throw_on_error_label'),
      help: app.translator.trans('linkerlin-katex.admin.settings.throw_on_error_help'),
    })
    .registerSetting({
      setting: 'linkerlin-katex.errorColor',
      type: 'text',
      label: app.translator.trans('linkerlin-katex.admin.settings.error_color_label'),
      help: app.translator.trans('linkerlin-katex.admin.settings.error_color_help'),
      placeholder: '#cc0000',
    })
    .registerSetting({
      setting: 'linkerlin-katex.delimiters',
      type: 'select',
      label: app.translator.trans('linkerlin-katex.admin.settings.delimiters_label'),
      help: app.translator.trans('linkerlin-katex.admin.settings.delimiters_help'),
      options: {
        default: app.translator.trans('linkerlin-katex.admin.settings.delimiters_default'),
        parentheses: app.translator.trans('linkerlin-katex.admin.settings.delimiters_parentheses'),
        dollars: app.translator.trans('linkerlin-katex.admin.settings.delimiters_dollars'),
      },
      default: 'default',
    })
    .registerSetting({
      setting: 'linkerlin-katex.macros',
      type: 'textarea',
      label: app.translator.trans('linkerlin-katex.admin.settings.macros_label'),
      help: app.translator.trans('linkerlin-katex.admin.settings.macros_help'),
      placeholder: '{"\\\\RR": "\\\\mathbb{R}", "\\\\NN": "\\\\mathbb{N}"}',
    })
    .registerSetting({
      setting: 'linkerlin-katex.cdn_auto_render',
      label: app.translator.trans('linkerlin-katex.admin.settings.cdn_auto_render'),
      help: app.translator.trans('linkerlin-katex.admin.settings.cdn_auto_render_help'),
      type: 'text',
      placeholder: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js',
    })
    .registerSetting({
      setting: 'linkerlin-katex.cdn_copy_tex',
      label: app.translator.trans('linkerlin-katex.admin.settings.cdn_copy_tex'),
      help: app.translator.trans('linkerlin-katex.admin.settings.cdn_copy_tex_help'),
      type: 'text',
      placeholder: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/copy-tex.min.js',
    });
});