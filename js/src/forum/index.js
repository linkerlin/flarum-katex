import app from 'flarum/forum/app';

// Load KaTeX CSS and JS from CDN
function loadKaTeX() {
  return new Promise((resolve, reject) => {
    // Load CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
    cssLink.integrity = 'sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn';
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
    script.integrity = 'sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      // Load Copy-TeX extension
      const copyTexScript = document.createElement('script');
      copyTexScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/copy-tex.min.js';
      copyTexScript.crossOrigin = 'anonymous';
      copyTexScript.onload = resolve;
      copyTexScript.onerror = reject;
      document.head.appendChild(copyTexScript);
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

  // Render inline math
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

  // Render block math
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

  // Handle delimiter-based math (for posts that use \(...\) and $$...$$)
  const delimiters = settings.delimiters || 'default';
  
  if (delimiters === 'default' || delimiters === 'parentheses') {
    // Handle \(...\) inline math
    document.querySelectorAll('.Post-body, .CommentPost-body').forEach((container) => {
      if (container.dataset.katexProcessed) return;
      
      let html = container.innerHTML;
      html = html.replace(/\\\\\\(([^\\)]+)\\\\\\)/g, (match, math) => {
        try {
          return window.katex.renderToString(math, { ...options, displayMode: false });
        } catch (error) {
          return `<span class="katex-error" title="${error.message}">${match}</span>`;
        }
      });
      
      if (html !== container.innerHTML) {
        container.innerHTML = html;
      }
      container.dataset.katexProcessed = 'true';
    });
  }

  if (delimiters === 'default' || delimiters === 'dollars') {
    // Handle $$...$$ block math
    document.querySelectorAll('.Post-body, .CommentPost-body').forEach((container) => {
      if (container.dataset.katexBlockProcessed) return;
      
      let html = container.innerHTML;
      html = html.replace(/\\$\\$([^$]+)\\$\\$/g, (match, math) => {
        try {
          return window.katex.renderToString(math, { ...options, displayMode: true });
        } catch (error) {
          return `<div class="katex-error" title="${error.message}">${match}</div>`;
        }
      });
      
      if (html !== container.innerHTML) {
        container.innerHTML = html;
      }
      container.dataset.katexBlockProcessed = 'true';
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