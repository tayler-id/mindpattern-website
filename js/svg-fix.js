/* Enhanced SVG and animation fixes */
document.addEventListener('DOMContentLoaded', function() {
  // Add SVG icons where needed
  const iconElements = document.querySelectorAll('.icon, .feature-icon, .benefit-icon');
  iconElements.forEach(icon => {
    if (!icon.innerHTML.trim()) {
      // Determine which icon to use based on classes
      if (icon.classList.contains('icon-brain')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path d="M12.5 3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5m-6.5 2A.5.5 0 0 1 6 5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5M7 7.5A.5.5 0 0 1 7.5 7h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/></svg>';
      } else if (icon.classList.contains('icon-pattern')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/></svg>';
      } else if (icon.classList.contains('icon-chart')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/></svg>';
      } else {
        // Default icon
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/></svg>';
      }
    }
  });

  // Fix animation issues
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    // Remove any existing classes that might interfere
    el.classList.remove('hidden');
    
    // Add observer for scroll animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Set initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Start observing
    observer.observe(el);
  });

  // Fix hover effects
  const hoverElements = document.querySelectorAll('.hover-lift');
  hoverElements.forEach(el => {
    el.style.transition = 'transform 0.3s ease';
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-5px)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translateY(0)';
    });
  });

  // Fix magnetic buttons
  const magneticButtons = document.querySelectorAll('.magnetic-button');
  magneticButtons.forEach(button => {
    button.style.transition = 'transform 0.3s ease';
    
    button.addEventListener('mousemove', e => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });

  console.log('SVG and animation fixes applied');
});
