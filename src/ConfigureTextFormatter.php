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

use Flarum\Settings\SettingsRepositoryInterface;
use s9e\TextFormatter\Configurator;

class ConfigureTextFormatter
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(Configurator $config)
    {
        if (!$this->settings->get('linkerlin-katex.enabled', true)) {
            return;
        }

        // Configure BBCode tags for math
        $config->BBCodes->addCustom(
            '[imath]{TEXT}[/imath]',
            '<span class="katex-inline" data-katex="{TEXT}">{TEXT}</span>'
        );

        $config->BBCodes->addCustom(
            '[math]{TEXT}[/math]',
            '<div class="katex-block" data-katex="{TEXT}">{TEXT}</div>'
        );

        // Add custom tag for inline math delimiters
        $config->tags->add('KATEX_INLINE')->template = '<span class="katex-inline" data-katex="{@content}">{@content}</span>';
        $config->tags->add('KATEX_BLOCK')->template = '<div class="katex-block" data-katex="{@content}">{@content}</div>';

        // Configure delimiters based on settings
        $delimiters = $this->settings->get('linkerlin-katex.delimiters', 'default');
        
        if ($delimiters === 'default' || $delimiters === 'parentheses') {
            // Inline math: \(...\)
            $config->plugins->load('PipeTables', ['overwriteEscapes' => false]);
            $config->rootContext->flags |= $config::RULE_IGNORE_WHITESPACE;
            
            // Add regex for inline math
            $config->tags->add('KATEX_INLINE');
            $config->plugins->load('Regexp', [
                'regexp' => '/\\\\\\((.+?)\\\\\\)/',
                'tagName' => 'KATEX_INLINE'
            ]);
        }

        if ($delimiters === 'default' || $delimiters === 'dollars') {
            // Block math: $$...$$
            $config->tags->add('KATEX_BLOCK');
            $config->plugins->load('Regexp', [
                'regexp' => '/\\$\\$(.+?)\\$\\$/',
                'tagName' => 'KATEX_BLOCK'
            ]);
        }
    }
}