import { extend, override } from 'flarum/common/extend';
import app from 'flarum/common/app';
import Page from 'flarum/common/components/Page';
import TextEditor from 'flarum/common/components/TextEditor';
import ComposerBody from 'flarum/forum/components/ComposerBody';

app.initializers.add('linkerlin-katex', () => {
  // Load KaTeX CSS
  const katexCss = app.forum.attribute('katex.cdn_katex_css');
  if (katexCss && !document.querySelector(`link[href="${katexCss}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = katexCss;
    document.head.appendChild(link);
  }

  // Load copy-tex if enabled
  if (app.forum.attribute('katex.enable_copy_tex')) {
    const copyTexUrl = app.forum.attribute('katex.cdn_copy_tex');
    if (copyTexUrl && !document.querySelector(`script[src="${copyTexUrl}"]`)) {
      const script = document.createElement('script');
      script.src = copyTexUrl;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }

  // Replace LaTeX delimiters with BBCode delimiters for processing
  const replaceDelimiters = (text) => {
    const inlineDelim = app.forum.attribute('katex.inline_delimiters');
    const blockDelim = app.forum.attribute('katex.block_delimiters');
    const bbInlineDelim = app.forum.attribute('katex.bbcode_inline_delimiters');
    const bbBlockDelim = app.forum.attribute('katex.bbcode_block_delimiters');

    if (!text) return text;

    // Replace inline delimiters \\( ... \\) with [imath]...[/imath]
    if (inlineDelim && bbInlineDelim) {
      const inlinePattern = inlineDelim.replace('%e%', '([\\s\\S]*?)');
      // Escape special regex characters but handle \\( and \\) properly
      const escapedPattern = inlinePattern
        .replace(/\\\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\$/g, '\\$');
      const inlineRegex = new RegExp(escapedPattern, 'g');
      const inlineReplacement = bbInlineDelim.replace('%e%', '$1');
      text = text.replace(inlineRegex, inlineReplacement);
    }

    // Replace block delimiters $$ ... $$ with [math]...[/math]
    if (blockDelim && bbBlockDelim) {
      const blockPattern = blockDelim.replace('%e%', '([\\s\\S]*?)');
      // Escape special regex characters
      const escapedPattern = blockPattern.replace(/\$/g, '\\$');
      const blockRegex = new RegExp(escapedPattern, 'g');
      const blockReplacement = bbBlockDelim.replace('%e%', '$1');
      text = text.replace(blockRegex, blockReplacement);
    }

    return text;
  };

  // Replace BBCode delimiters with LaTeX delimiters for display
  const restoreDelimiters = (text) => {
    const inlineDelim = app.forum.attribute('katex.inline_delimiters');
    const blockDelim = app.forum.attribute('katex.block_delimiters');
    const bbInlineDelim = app.forum.attribute('katex.bbcode_inline_delimiters');
    const bbBlockDelim = app.forum.attribute('katex.bbcode_block_delimiters');

    if (!text) return text;

    // Replace [imath]...[/imath] with \\( ... \\)
    if (bbInlineDelim && inlineDelim) {
      const bbInlinePattern = bbInlineDelim.replace('%e%', '([\\s\\S]*?)');
      // Escape BBCode brackets
      const escapedPattern = bbInlinePattern
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]');
      const bbInlineRegex = new RegExp(escapedPattern, 'g');
      const inlineReplacement = inlineDelim.replace('%e%', '$1');
      text = text.replace(bbInlineRegex, inlineReplacement);
    }

    // Replace [math]...[/math] with $$ ... $$
    if (bbBlockDelim && blockDelim) {
      const bbBlockPattern = bbBlockDelim.replace('%e%', '([\\s\\S]*?)');
      // Escape BBCode brackets
      const escapedPattern = bbBlockPattern
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]');
      const bbBlockRegex = new RegExp(escapedPattern, 'g');
      const blockReplacement = blockDelim.replace('%e%', '$1');
      text = text.replace(bbBlockRegex, blockReplacement);
    }

    return text;
  };

  // Handle text editor content
  extend(TextEditor.prototype, 'oncreate', function (vnode) {
    const textarea = vnode.dom.querySelector('textarea');
    if (textarea && textarea.value) {
      textarea.value = restoreDelimiters(textarea.value);
    }
  });

  // Handle composer submission
  extend(ComposerBody.prototype, 'onsubmit', function () {
    const content = this.composer.fields.content();
    if (content) {
      this.composer.fields.content(replaceDelimiters(content));
    }
  });

  // Handle preview mode
  if (typeof s9e !== 'undefined' && s9e.TextFormatter) {
    override(s9e.TextFormatter, 'preview', function (original, text, element) {
      const processedText = replaceDelimiters(text);
      original(processedText, element);
    });
  }

  // Render math on page load and updates
  const renderMath = () => {
    if (typeof katex === 'undefined') return;

    // Render inline math
    document.querySelectorAll('.katex-inline').forEach((element) => {
      if (!element.hasAttribute('data-katex-rendered')) {
        try {
          const options = JSON.parse(element.getAttribute('data-katex-options') || '{}');
          katex.render(element.textContent, element, options);
          element.setAttribute('data-katex-rendered', 'true');
        } catch (e) {
          console.error('KaTeX inline rendering error:', e);
        }
      }
    });

    // Render block math
    document.querySelectorAll('.katex-block').forEach((element) => {
      if (!element.hasAttribute('data-katex-rendered')) {
        try {
          const options = JSON.parse(element.getAttribute('data-katex-options') || '{}');
          katex.render(element.textContent, element, options);
          element.setAttribute('data-katex-rendered', 'true');
        } catch (e) {
          console.error('KaTeX block rendering error:', e);
        }
      }
    });
  };

  // Render math when page loads or updates
  extend(Page.prototype, ['oncreate', 'onupdate'], renderMath);

  // Load KaTeX library
  const katexJs = app.forum.attribute('katex.cdn_katex_js');
  if (katexJs && typeof katex === 'undefined') {
    const script = document.createElement('script');
    script.src = katexJs;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = renderMath;
    document.head.appendChild(script);
  } else if (typeof katex !== 'undefined') {
    renderMath();
  }
});