import './style.css'

function initWelcomingWordsLoader() {
  const loadingContainer = document.querySelector('[data-loading-container]');
  if (!loadingContainer) return; // Stop animation when no [data-loading-words] is found

  const loadingWords = loadingContainer.querySelector('[data-loading-words]');
  const wordsTarget = loadingWords.querySelector('[data-loading-words-target]');
  const words = loadingWords.getAttribute('data-loading-words').split(',').map(w => w.trim());

  const tl = gsap.timeline();

  tl.set(loadingWords, {
    yPercent: 50
  });

  tl.to(loadingWords, {
    opacity: 1,
    yPercent: 0,
    duration: 1,
    ease: "Expo.easeInOut"
  });

  words.forEach(word => {
    tl.call(() => {
      wordsTarget.textContent = word;
    }, null, '+=0.15');
  });

  tl.to(loadingWords, {
    opacity: 0,
    yPercent: -75,
    duration: 0.8,
    ease: "Expo.easeIn"
  });

  tl.to(loadingContainer, {
    autoAlpha: 0,
    duration: 0.6,
    ease: "Power1.easeInOut"
  }, "+ -0.2");
}

function initAppleDockNavigationBar() {
  // Select all .nav-item elements
  const navItems = document.querySelectorAll('.nav-item');

  // Helper function to add/remove a class to a sibling at a given offset
  const toggleSiblingClass = (items, index, offset, className, add) => {
    const sibling = items[index + offset];
    if (sibling) {
      sibling.classList.toggle(className, add);
    }
  };

  // Event listeners to toggle classes on hover
  navItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('hover'); // Add .hover to current item

      // Toggle classes for siblings
      toggleSiblingClass(navItems, index, -1, 'sibling-close', true); // Previous sibling
      toggleSiblingClass(navItems, index, 1, 'sibling-close', true);  // Next sibling
      toggleSiblingClass(navItems, index, -2, 'sibling-far', true);   // Previous-previous sibling
      toggleSiblingClass(navItems, index, 2, 'sibling-far', true);    // Next-next sibling
    });

    item.addEventListener('mouseleave', () => {
      item.classList.remove('hover'); // Remove .hover from current item

      // Toggle classes for siblings
      toggleSiblingClass(navItems, index, -1, 'sibling-close', false); // Previous sibling
      toggleSiblingClass(navItems, index, 1, 'sibling-close', false);  // Next sibling
      toggleSiblingClass(navItems, index, -2, 'sibling-far', false);   // Previous-previous sibling
      toggleSiblingClass(navItems, index, 2, 'sibling-far', false);    // Next-next sibling
    });
  });
}

// Initialize Welcoming Words Loader
document.addEventListener('DOMContentLoaded', () => {
  initWelcomingWordsLoader();
  initAppleDockNavigationBar();

});