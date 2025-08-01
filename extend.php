<?php

/*
 * This file is part of linkerlin/flarum-katex.
 *
 * Copyright (c) 2024 LinkerLin.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LinkerLin\FlarumKatex;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings())
        ->default('linkerlin-katex.inline_delimiters', '\\(%e%\\)')
        ->default('linkerlin-katex.block_delimiters', '$$%e%$$')
        ->default('linkerlin-katex.bbcode_inline_delimiters', '[imath]%e%[/imath]')
        ->default('linkerlin-katex.bbcode_block_delimiters', '[math]%e%[/math]')
        ->default('linkerlin-katex.throw_on_error', '0')
        ->default('linkerlin-katex.error_color', '#cc0000')
        ->default('linkerlin-katex.output_mode', 'htmlAndMathml')
        ->default('linkerlin-katex.enable_copy_tex', '1')
        ->default('linkerlin-katex.cdn_katex_js', 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js')
        ->default('linkerlin-katex.cdn_katex_css', 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css')
        ->default('linkerlin-katex.cdn_copy_tex', 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/copy-tex.min.js')
        ->default('linkerlin-katex.cdn_auto_render', 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js')
        ->registerLessConfigVar(
            'config-copy-tex',
            'linkerlin-katex.enable_copy_tex',
            function ($setting) {
                return \boolval($setting) ? 'true' : 'false';
            }
        ),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(LoadSettings::class),

    (new Extend\Formatter())
        ->configure(ConfigureTextFormatter::class),
];