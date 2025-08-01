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

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class LoadSettings
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer, $model, array $attributes): array
    {
        $attributes['katex.inline_delimiters'] = $this->settings->get('linkerlin-katex.inline_delimiters');
        $attributes['katex.block_delimiters'] = $this->settings->get('linkerlin-katex.block_delimiters');
        $attributes['katex.bbcode_inline_delimiters'] = $this->settings->get('linkerlin-katex.bbcode_inline_delimiters');
        $attributes['katex.bbcode_block_delimiters'] = $this->settings->get('linkerlin-katex.bbcode_block_delimiters');
        $attributes['katex.throw_on_error'] = (bool) $this->settings->get('linkerlin-katex.throw_on_error');
        $attributes['katex.error_color'] = $this->settings->get('linkerlin-katex.error_color');
        $attributes['katex.output_mode'] = $this->settings->get('linkerlin-katex.output_mode');
        $attributes['katex.enable_copy_tex'] = (bool) $this->settings->get('linkerlin-katex.enable_copy_tex');
        $attributes['katex.cdn_katex_js'] = $this->settings->get('linkerlin-katex.cdn_katex_js');
        $attributes['katex.cdn_katex_css'] = $this->settings->get('linkerlin-katex.cdn_katex_css');
        $attributes['katex.cdn_copy_tex'] = $this->settings->get('linkerlin-katex.cdn_copy_tex');
        $attributes['katex.cdn_auto_render'] = $this->settings->get('linkerlin-katex.cdn_auto_render');

        return $attributes;
    }
}