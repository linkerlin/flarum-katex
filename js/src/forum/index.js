import app from 'flarum/forum/app';

// Load KaTeX CSS and JS from CDN
function loadKaTeX() {
  return new Promise((resolve, reject) => {
    // Load CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
    cssLink.crossOrigin = 'anonymous';
    document.head.appendChild(cssLink);

    // Load Copy-TeX CSS
    const copyTexCss = document.createElement('link');
    copyTexCss.rel = 'stylesheet';
    copyTexCss.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/copy-tex.min.css';
    copyTexCss.crossOrigin = 'anonymous';
    document.head.appendChild(copyTexCss);

    // Load KaTeX JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      // Load auto-render extension first
      const autoRenderScript = document.createElement('script');
      autoRenderScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js';
      autoRenderScript.crossOrigin = 'anonymous';
      autoRenderScript.onload = () => {
        // Load Copy-TeX extension
        const copyTexScript = document.createElement('script');
        copyTexScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/copy-tex.min.js';
        copyTexScript.crossOrigin = 'anonymous';
        copyTexScript.onload = resolve;
        copyTexScript.onerror = resolve; // Don't fail if copy-tex fails
        document.head.appendChild(copyTexScript);
      };
      autoRenderScript.onerror = resolve; // Don't fail if auto-render fails
      document.head.appendChild(autoRenderScript);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Render KaTeX elements
function renderKaTeX() {
  if (typeof window.katex === 'undefined') {
    console.warn('KaTeX not loaded');
    return;
  }

  const settings = app.forum.attribute('katex') || {};
  const options = {
    displayMode: settings.displayMode || false,
    throwOnError: settings.throwOnError || false,
    errorColor: settings.errorColor || '#cc0000',
    macros: {},
  };

  // Parse macros if provided
  if (settings.macros) {
    try {
      options.macros = JSON.parse(settings.macros);
    } catch (e) {
      console.warn('Invalid KaTeX macros JSON:', e);
    }
  }

  // Render BBCode math elements
  document.querySelectorAll('.katex-inline:not(.katex-rendered)').forEach((element) => {
    try {
      const math = element.getAttribute('data-katex') || element.textContent;
      window.katex.render(math, element, { ...options, displayMode: false });
      element.classList.add('katex-rendered');
    } catch (error) {
      console.warn('KaTeX inline render error:', error);
      element.classList.add('katex-error');
      element.title = error.message;
    }
  });

  document.querySelectorAll('.katex-block:not(.katex-rendered)').forEach((element) => {
    try {
      const math = element.getAttribute('data-katex') || element.textContent;
      window.katex.render(math, element, { ...options, displayMode: true });
      element.classList.add('katex-rendered');
    } catch (error) {
      console.warn('KaTeX block render error:', error);
      element.classList.add('katex-error');
      element.title = error.message;
    }
  });

  // Use auto-render for delimiter-based math if available
  if (typeof window.renderMathInElement !== 'undefined') {
    const delimiters = settings.delimiters || 'default';
    let delimiterConfig = [];

    if (delimiters === 'default' || delimiters === 'parentheses') {
      delimiterConfig.push(
        { left: '\\(', right: '\\)', display: false },
      );
    }

    if (delimiters === 'default' || delimiters === 'dollars') {
      delimiterConfig.push(
        { left: '$$', right: '$$', display: true },
      );
    }

    document.querySelectorAll('.Post-body, .CommentPost-body').forEach((container) => {
      if (container.dataset.katexProcessed) return;
      
      try {
        window.renderMathInElement(container, {
          delimiters: delimiterConfig,
          ...options
        });
        container.dataset.katexProcessed = 'true';
      } catch (error) {
        console.warn('Auto-render error:', error);
      }
    });
  }
}

app.initializers.add('linkerlin/flarum-katex', () => {
  // Check if KaTeX is enabled
  if (!app.forum.attribute('katex.enabled')) {
    return;
  }

  // Load KaTeX and render math
  loadKaTeX().then(() => {
    // Initial render
    renderKaTeX();

    // Re-render when new content is loaded
    const observer = new MutationObserver((mutations) => {
      let shouldRender = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.classList.contains('Post-body') || 
                  node.classList.contains('CommentPost-body') ||
                  node.querySelector('.katex-inline, .katex-block')) {
                shouldRender = true;
              }
            }
          });
        }
      });
      
      if (shouldRender) {
        setTimeout(renderKaTeX, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }).catch((error) => {
    console.error('Failed to load KaTeX:', error);
  });
});