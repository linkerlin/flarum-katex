<?php

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
        // Get KaTeX options
        $katexOptions = $this->getKatexOptions();
        
        // Configure inline math BBCode
        $inlineOptions = json_encode(array_merge($katexOptions, ['displayMode' => false]));
        $config->BBCodes->addCustom(
            '[imath]{TEXT}[/imath]',
            '<span class="katex-inline" data-katex-options=\'' . $inlineOptions . '\'>
                <xsl:attribute name="data-s9e-livepreview-onupdate">if(typeof katex!==\'undefined\')katex.render(this.innerText, this, ' . $inlineOptions . ')</xsl:attribute>
                <xsl:apply-templates/>
                <script defer="" crossorigin="anonymous">
                    <xsl:attribute name="data-s9e-livepreview-onrender">if(typeof katex!==\'undefined\')this.parentNode.removeChild(this)</xsl:attribute>
                    <xsl:attribute name="onload">katex.render(this.parentNode.innerText, this.parentNode, ' . $inlineOptions . ')</xsl:attribute>
                    <xsl:attribute name="src">' . $this->settings->get('linkerlin-katex.cdn_katex_js') . '</xsl:attribute>
                </script>
            </span>'
        );

        // Configure block math BBCode
        $blockOptions = json_encode(array_merge($katexOptions, ['displayMode' => true]));
        $config->BBCodes->addCustom(
            '[math]{TEXT}[/math]',
            '<div class="katex-block" data-katex-options=\'' . $blockOptions . '\'>
                <xsl:attribute name="data-s9e-livepreview-onupdate">if(typeof katex!==\'undefined\')katex.render(this.innerText, this, ' . $blockOptions . ')</xsl:attribute>
                <xsl:apply-templates/>
                <script defer="" crossorigin="anonymous">
                    <xsl:attribute name="data-s9e-livepreview-onrender">if(typeof katex!==\'undefined\')this.parentNode.removeChild(this)</xsl:attribute>
                    <xsl:attribute name="onload">katex.render(this.parentNode.innerText, this.parentNode, ' . $blockOptions . ')</xsl:attribute>
                    <xsl:attribute name="src">' . $this->settings->get('linkerlin-katex.cdn_katex_js') . '</xsl:attribute>
                </script>
            </div>'
        );

        // Configure tag rules
        $imathTag = $config->tags['imath'];
        $imathTag->rules->ignoreTags();
        $imathTag->rules->disableAutoLineBreaks();

        $mathTag = $config->tags['math'];
        $mathTag->rules->ignoreTags();
        $mathTag->rules->disableAutoLineBreaks();
    }

    protected function getKatexOptions(): array
    {
        return [
            'throwOnError' => (bool) $this->settings->get('linkerlin-katex.throw_on_error'),
            'errorColor' => $this->settings->get('linkerlin-katex.error_color'),
            'output' => $this->settings->get('linkerlin-katex.output_mode'),
        ];
    }
}