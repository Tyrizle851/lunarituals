// TikTok Pixel integration (replace PIXEL_ID with real ID when available)
(function() {
  const TIKTOK_PIXEL_ID = 'YOUR_PIXEL_ID'; // Replace when TikTok Shop is live

  // Initialize TikTok Pixel
  !function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

    ttq.load(TIKTOK_PIXEL_ID);
    ttq.page();
  }(window, document, 'ttq');
  
  // Track custom events
  window.trackTikTokEvent = function(eventName, properties = {}) {
    if (window.ttq && typeof window.ttq.track === 'function') {
      window.ttq.track(eventName, properties);
    }
  };
  
  // Auto-track key events
  window.addEventListener('DOMContentLoaded', function() {
    // Track Add to Cart
    document.getElementById('addToCartBtn')?.addEventListener('click', function() {
      const price = parseFloat(document.getElementById('priceDisplay')?.textContent?.replace('$','') || '0');
      window.trackTikTokEvent('AddToCart', {
        content_type: 'product',
        content_id: 'custom_' + Date.now(),
        value: price,
        currency: 'USD'
      });
    });
    
    // Track Initiate Checkout (when cart button clicked)
    document.getElementById('cartBtn')?.addEventListener('click', function() {
      const count = parseInt(document.getElementById('cartBadge')?.textContent || '0');
      if (count > 0) {
        window.trackTikTokEvent('InitiateCheckout', {
          content_type: 'product',
          num_items: count
        });
      }
    });
    
    // Track ViewContent (when generator modal opens)
    const modal = document.getElementById('generatorModal');
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class' && modal.classList.contains('open')) {
          window.trackTikTokEvent('ViewContent', {
            content_type: 'product'
          });
        }
      });
    });
    if (modal) {
      observer.observe(modal, { attributes: true });
    }
  });
})();


