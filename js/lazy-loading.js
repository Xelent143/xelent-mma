/**
 * Lazy Loading Module for Xelent MMA
 * Uses Intersection Observer API for efficient image loading
 * 
 * Design System Colors:
 * - Black: #000000
 * - Red: #DC2626
 * - Gold: #F59E0B
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    rootMargin: '50px 0px', // Load images 50px before they enter viewport
    threshold: 0.01,
    placeholderColor: '#000000', // Black placeholder
    errorColor: '#DC2626', // Red for error state
    fadeInDuration: 300
  };

  /**
   * Lazy Image Loader Class
   */
  class LazyImageLoader {
    constructor() {
      this.images = new Map();
      this.observer = null;
      this.init();
    }

    /**
     * Initialize the lazy loader
     */
    init() {
      if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        this.loadAllImages();
        return;
      }

      this.createObserver();
      this.observeImages();
      this.bindEvents();
    }

    /**
     * Create Intersection Observer
     */
    createObserver() {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          rootMargin: CONFIG.rootMargin,
          threshold: CONFIG.threshold
        }
      );
    }

    /**
     * Handle intersection changes
     */
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }

    /**
     * Observe all lazy images
     */
    observeImages() {
      const lazyImages = document.querySelectorAll('img[data-src], picture[data-src]');
      
      lazyImages.forEach(img => {
        this.images.set(img, {
          loaded: false,
          error: false
        });
        this.observer.observe(img);
        this.setPlaceholder(img);
      });
    }

    /**
     * Set placeholder background while loading
     */
    setPlaceholder(img) {
      img.style.backgroundColor = CONFIG.placeholderColor;
      img.style.transition = `opacity ${CONFIG.fadeInDuration}ms ease-in-out`;
      
      // Add skeleton loading effect
      if (!img.classList.contains('lazy-skeleton')) {
        img.classList.add('lazy-skeleton');
      }
    }

    /**
     * Load a single image
     */
    loadImage(img) {
      const src = img.getAttribute('data-src');
      const srcset = img.getAttribute('data-srcset');
      const sizes = img.getAttribute('data-sizes');

      if (!src) return;

      const imageData = this.images.get(img);
      if (!imageData || imageData.loaded) return;

      // Handle <picture> element with multiple sources
      if (img.tagName.toLowerCase() === 'picture') {
        this.loadPictureElement(img, src);
      } else {
        this.loadImgElement(img, src, srcset, sizes);
      }
    }

    /**
     * Load standard img element
     */
    loadImgElement(img, src, srcset, sizes) {
      const tempImg = new Image();

      tempImg.onload = () => {
        img.src = src;
        if (srcset) img.srcset = srcset;
        if (sizes) img.sizes = sizes;
        
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
        img.removeAttribute('data-sizes');
        
        this.onImageLoaded(img);
      };

      tempImg.onerror = () => {
        this.onImageError(img);
      };

      tempImg.src = src;
    }

    /**
     * Load picture element with source sets
     */
    loadPictureElement(picture, src) {
      const sources = picture.querySelectorAll('source[data-srcset]');
      const img = picture.querySelector('img[data-src]');

      sources.forEach(source => {
        const sourceSrcset = source.getAttribute('data-srcset');
        if (sourceSrcset) {
          source.srcset = sourceSrcset;
          source.removeAttribute('data-srcset');
        }
      });

      if (img) {
        this.loadImgElement(
          img,
          img.getAttribute('data-src'),
          img.getAttribute('data-srcset'),
          img.getAttribute('data-sizes')
        );
      }

      picture.removeAttribute('data-src');
    }

    /**
     * Handle successful image load
     */
    onImageLoaded(img) {
      const imageData = this.images.get(img);
      if (imageData) {
        imageData.loaded = true;
      }

      // Remove skeleton class
      img.classList.remove('lazy-skeleton');
      
      // Fade in effect
      img.style.opacity = '0';
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });

      // Dispatch custom event
      img.dispatchEvent(new CustomEvent('lazyLoaded', {
        detail: { element: img }
      }));

      // Add gold accent border on load complete (brand element)
      img.classList.add('lazy-loaded');
    }

    /**
     * Handle image load error
     */
    onImageError(img) {
      const imageData = this.images.get(img);
      if (imageData) {
        imageData.error = true;
      }

      // Set error styling with red accent
      img.style.backgroundColor = CONFIG.errorColor;
      img.classList.add('lazy-error');
      
      // Set fallback image if available
      const fallback = img.getAttribute('data-fallback');
      if (fallback) {
        img.src = fallback;
      }

      // Dispatch error event
      img.dispatchEvent(new CustomEvent('lazyError', {
        detail: { element: img }
      }));
    }

    /**
     * Fallback: Load all images immediately
     */
    loadAllImages() {
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => this.loadImage(img));
    }

    /**
     * Bind global events
     */
    bindEvents() {
      // Re-observe images after DOM mutations (for SPAs or dynamic content)
      let mutationTimeout;
      const observer = new MutationObserver(() => {
        clearTimeout(mutationTimeout);
        mutationTimeout = setTimeout(() => {
          this.observeImages();
        }, 100);
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Handle resize events for responsive images
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.updateSizes();
        }, 250);
      }, { passive: true });
    }

    /**
     * Update sizes attribute on resize
     */
    updateSizes() {
      const images = document.querySelectorAll('img[data-sizes="auto"]');
      images.forEach(img => {
        const width = img.getBoundingClientRect().width;
        img.sizes = Math.ceil(width / 100) * 100 + 'px';
      });
    }

    /**
     * Public method to manually trigger image load
     */
    loadImageNow(selector) {
      const img = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector;
      
      if (img) {
        this.loadImage(img);
        if (this.observer) {
          this.observer.unobserve(img);
        }
      }
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.lazyImageLoader = new LazyImageLoader();
    });
  } else {
    window.lazyImageLoader = new LazyImageLoader();
  }

  // Expose to global scope
  window.LazyImageLoader = LazyImageLoader;

})();
