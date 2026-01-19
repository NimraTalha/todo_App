// Utility functions to handle hydration issues caused by browser extensions

// Attributes commonly added by browser extensions that cause hydration mismatches
const EXTENSION_ATTRIBUTES = [
  'bis_skin_checked',
  'bis_register',
  '__processed_*',
  'data-extension',
  'data-bm_*',
  '_extension',
  'data-bm-checked'
];

/**
 * Cleans up attributes that are commonly added by browser extensions
 * which cause hydration mismatches in React applications
 */
export function cleanupExtensionAttributes() {
  if (typeof window === 'undefined') return;

  // Clean up attributes on all elements when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeExtensionAttributes);
  } else {
    removeExtensionAttributes();
  }
}

/**
 * Removes attributes that are commonly added by browser extensions
 */
function removeExtensionAttributes() {
  const allElements = document.querySelectorAll('*');
  
  allElements.forEach(element => {
    const attributes = Array.from(element.attributes);
    
    attributes.forEach(attr => {
      // Check if the attribute name matches any known extension attributes
      const isExtensionAttribute = EXTENSION_ATTRIBUTES.some(extAttr => {
        if (extAttr.includes('*')) {
          // Handle wildcard patterns
          const regex = new RegExp(extAttr.replace(/\*/g, '.*'));
          return regex.test(attr.name);
        }
        return attr.name === extAttr;
      });
      
      if (isExtensionAttribute) {
        element.removeAttribute(attr.name);
      }
    });
  });
}

// Initialize cleanup when module is imported
cleanupExtensionAttributes();