/**
 * News Homepage JavaScript
 * Handles mobile menu functionality and interactive features
 */

/**
 * Mobile menu functionality using dialog
 */
class MobileMenu {
  constructor() {
    this.menuToggle = document.querySelector('.menu-toggle');
    this.menuDialog = document.querySelector('.menu-dialog');
    this.menuDialogClose = document.querySelector('.menu-dialog-close');
    
    this.init();
  }
  
  /**
   * Initialize mobile menu event listeners
   */
  init() {
    if (!this.menuToggle || !this.menuDialog) return;
    
    this.menuToggle.addEventListener('click', () => this.openMenu());
    this.menuDialogClose.addEventListener('click', () => this.closeMenu());
    
    // Close menu when clicking backdrop
    this.menuDialog.addEventListener('click', (event) => {
      if (event.target === this.menuDialog) {
        this.closeMenu();
      }
    });
    
    // Close menu on escape key (handled automatically by dialog)
    this.menuDialog.addEventListener('close', () => {
      this.menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      this.menuToggle.focus();
    });
  }
  
  /**
   * Open the mobile menu
   */
  openMenu() {
    this.menuDialog.showModal();
    this.menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    this.menuDialogClose.focus();
  }
  
  /**
   * Close the mobile menu
   */
  closeMenu() {
    this.menuDialog.close();
  }
  
  /**
   * Check if mobile menu is open
   * @returns {boolean} True if menu is open
   */
  isMenuOpen() {
    return this.menuDialog.hasAttribute('open');
  }
}

/**
 * Smooth scrolling for anchor links
 */
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  /**
   * Initialize smooth scrolling
   */
  init() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      
      event.preventDefault();
      this.scrollToTarget(link.getAttribute('href'));
    });
  }
  
  /**
   * Scroll to target element
   * @param {string} targetId - The target element ID
   */
  scrollToTarget(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Handle reduced motion preferences
 */
class MotionPreferences {
  constructor() {
    this.init();
  }
  
  /**
   * Initialize motion preferences
   */
  init() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      this.disableAnimations();
    }
    
    // Listen for changes in motion preference
    prefersReducedMotion.addEventListener('change', (event) => {
      if (event.matches) {
        this.disableAnimations();
      } else {
        this.enableAnimations();
      }
    });
  }
  
  /**
   * Disable animations for users who prefer reduced motion
   */
  disableAnimations() {
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
  }
  
  /**
   * Enable animations for users who don't prefer reduced motion
   */
  enableAnimations() {
    document.documentElement.style.setProperty('--transition-duration', '0.2s');
  }
}

/**
 * Handle image loading and error states
 */
class ImageLoader {
  constructor() {
    this.init();
  }
  
  /**
   * Initialize image loading handlers
   */
  init() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      this.setupLazyLoading(images);
    } else {
      this.loadAllImages(images);
    }
  }
  
  /**
   * Setup lazy loading for images
   * @param {NodeList} images - Images to lazy load
   */
  setupLazyLoading(images) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          imageObserver.unobserve(entry.target);
        }
      });
    });
    
    images.forEach((image) => imageObserver.observe(image));
  }
  
  /**
   * Load all images immediately (fallback)
   * @param {NodeList} images - Images to load
   */
  loadAllImages(images) {
    images.forEach((image) => this.loadImage(image));
  }
  
  /**
   * Load a single image
   * @param {HTMLImageElement} image - Image element to load
   */
  loadImage(image) {
    const src = image.getAttribute('data-src');
    if (!src) return;
    
    image.src = src;
    image.removeAttribute('data-src');
    image.classList.add('loaded');
  }
}

/**
 * Handle form interactions and validation
 */
class FormHandler {
  constructor() {
    this.init();
  }
  
  /**
   * Initialize form handlers
   */
  init() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      form.addEventListener('submit', (event) => this.handleSubmit(event));
    });
  }
  
  /**
   * Handle form submission
   * @param {Event} event - Submit event
   */
  handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Add your form processing logic here
    console.log('Form submitted:', Object.fromEntries(formData));
  }
}

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile menu
  new MobileMenu();
  
  // Initialize smooth scrolling
  new SmoothScroll();
  
  // Initialize motion preferences
  new MotionPreferences();
  
  // Initialize image loader
  new ImageLoader();
  
  // Initialize form handler
  new FormHandler();
});

/**
 * Handle window resize events
 */
window.addEventListener('resize', () => {
  // Close mobile menu on window resize if screen becomes large
  const menuDialog = document.querySelector('.menu-dialog');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (window.innerWidth >= 1024 && menuDialog && menuToggle) {
    menuDialog.close();
  }
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden, pause any animations or timers
    console.log('Page hidden');
  } else {
    // Page is visible again
    console.log('Page visible');
  }
});

/**
 * Handle online/offline status
 */
window.addEventListener('online', () => {
  console.log('Application is online');
});

window.addEventListener('offline', () => {
  console.log('Application is offline');
});

// Export classes for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MobileMenu,
    SmoothScroll,
    MotionPreferences,
    ImageLoader,
    FormHandler
  };
} 