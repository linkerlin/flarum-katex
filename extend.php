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
        ->serializeToForum('katex.enabled', 'linkerlin-katex.enabled', 'boolval', true)
        ->serializeToForum('katex.displayMode', 'linkerlin-katex.displayMode', 'boolval', false)
        ->serializeToForum('katex.throwOnError', 'linkerlin-katex.throwOnError', 'boolval', false)
        ->serializeToForum('katex.errorColor', 'linkerlin-katex.errorColor', null, '#cc0000')
        ->serializeToForum('katex.macros', 'linkerlin-katex.macros', null, '{}')
        ->serializeToForum('katex.delimiters', 'linkerlin-katex.delimiters', null, 'default'),

    (new Extend\Formatter())
        ->configure(ConfigureTextFormatter::class),
];