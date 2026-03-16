/**
 * Xelent MMA - Progressive Image Loading
 * WebP/AVIF Fallback Implementation
 * 
 * Usage: Include this pattern for responsive images with format fallbacks
 * 
 * Design System Colors:
 * - Black: #000000
 * - Red: #DC2626  
 * - Gold: #F59E0B
 */

// CSS for progressive loading states
const progressiveImageCSS = `
/* Progressive Image Loading Styles */
.progressive-image-container {
  position: relative;
  overflow: hidden;
  background-color: #000000;
}

.progressive-image-container img {
  display: block;
  width: 100%;
  height: auto;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease;
}

.progressive-image-container img.lazy-skeleton {
  background: linear-gradient(
    90deg,
    #000000 0%,
    #1a1a1a 50%,
    #000000 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.progressive-image-container img.lazy-loaded {
  border-bottom: 2px solid #F59E0B;
}

.progressive-image-container img.lazy-error {
  border-bottom: 2px solid #DC2626;
}

/* Low Quality Image Placeholder (LQIP) */
.lqip {
  filter: blur(10px);
  transform: scale(1.05);
}

.lqip.loaded {
  filter: blur(0);
  transform: scale(1);
}

/* Responsive picture element */
picture {
  display: block;
  max-width: 100%;
}

picture img {
  max-width: 100%;
  height: auto;
}
`;

// Feature detection for AVIF and WebP
const ImageFormatSupport = {
  avif: false,
  webp: false,
  
  async detect() {
    // Check AVIF support
    const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    this.avif = await this.checkImageSupport(avifData);
    
    // Check WebP support
    const webpData = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    this.webp = await this.checkImageSupport(webpData);
    
    return this;
  },
  
  checkImageSupport(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = dataUrl;
    });
  },
  
  getBestFormat() {
    if (this.avif) return 'avif';
    if (this.webp) return 'webp';
    return 'jpeg';
  }
};

/**
 * Create a responsive picture element with format fallbacks
 * @param {Object} options - Image options
 * @param {string} options.src - Base image path (without extension)
 * @param {string} options.alt - Alt text
 * @param {string} options.className - CSS class
 * @param {Array} options.sizes - Array of {width, suffix} for srcset
 * @param {string} options.sizesAttr - Sizes attribute value
 * @param {string} options.lqip - Low quality placeholder (base64)
 * @returns {string} HTML string
 */
function createResponsivePicture(options) {
  const {
    src,
    alt = '',
    className = '',
    sizes = [
      { width: 1920, suffix: 'xl' },
      { width: 1200, suffix: 'lg' },
      { width: 768, suffix: 'md' },
      { width: 480, suffix: 'sm' }
    ],
    sizesAttr = '100vw',
    lqip = null,
    lazy = true
  } = options;

  const loading = lazy ? 'lazy' : 'eager';
  const decoding = lazy ? 'async' : 'sync';
  
  // Build srcset strings
  const avifSrcset = sizes.map(s => `${src}-${s.suffix}.avif ${s.width}w`).join(', ');
  const webpSrcset = sizes.map(s => `${src}-${s.suffix}.webp ${s.width}w`).join(', ');
  const jpegSrcset = sizes.map(s => `${src}-${s.suffix}.jpg ${s.width}w`).join(', ');

  return `
    <picture class="progressive-image-container ${className}" data-src="true">
      <!-- AVIF format - best compression -->
      <source
        type="image/avif"
        data-srcset="${avifSrcset}"
        data-sizes="${sizesAttr}"
      >
      
      <!-- WebP format - good compression, wide support -->
      <source
        type="image/webp"
        data-srcset="${webpSrcset}"
        data-sizes="${sizesAttr}"
      >
      
      <!-- JPEG fallback - universal support -->
      <img
        src="${lqip || src}-sm.jpg"
        data-src="${src}-lg.jpg"
        data-srcset="${jpegSrcset}"
        data-sizes="${sizesAttr}"
        alt="${alt}"
        loading="${loading}"
        decoding="${decoding}"
        width="${sizes[0].width}"
        ${lqip ? 'class="lqip"' : ''}
      >
    </picture>
  `;
}

/**
 * Generate image markup for a product
 * Xelent MMA specific helper
 */
function createProductImage(productId, options = {}) {
  const defaults = {
    src: `images/products/${productId}`,
    alt: `Xelent MMA Product - ${productId}`,
    className: 'product-image',
    sizes: [
      { width: 800, suffix: 'lg' },
      { width: 400, suffix: 'md' },
      { width: 200, suffix: 'sm' }
    ],
    sizesAttr: '(max-width: 768px) 50vw, 25vw'
  };
  
  return createResponsivePicture({ ...defaults, ...options });
}

/**
 * Generate hero image markup
 */
function createHeroImage(options = {}) {
  const defaults = {
    src: 'images/hero',
    alt: 'Xelent MMA - Premium Combat Gear',
    className: 'hero-image',
    sizes: [
      { width: 1920, suffix: 'xl' },
      { width: 1200, suffix: 'lg' },
      { width: 768, suffix: 'md' },
      { width: 480, suffix: 'sm' }
    ],
    sizesAttr: '100vw',
    lazy: false
  };
  
  return createResponsivePicture({ ...defaults, ...options });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createResponsivePicture,
    createProductImage,
    createHeroImage,
    ImageFormatSupport,
    progressiveImageCSS
  };
}
