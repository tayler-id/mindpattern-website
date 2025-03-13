/* Fix for SVG and icon rendering */
document.addEventListener('DOMContentLoaded', function() {
  // Add SVG icons where needed
  const iconElements = document.querySelectorAll('.icon, .feature-icon, .benefit-icon');
  iconElements.forEach(icon => {
    if (!icon.innerHTML.trim()) {
      // Determine which icon to use based on classes
      if (icon.classList.contains('icon-brain')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path d="M12.5 3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5m-6.5 2A.5.5 0 0 1 6 5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5M7 7.5A.5.5 0 0 1 7.5 7h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m2 1.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-5-3A1.5 1.5 0 0 1 5.5 4h5A1.5 1.5 0 0 1 12 5.5v5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 10.5zM5.5 5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z"/></svg>';
      } else if (icon.classList.contains('icon-pattern')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/></svg>';
      } else if (icon.classList.contains('icon-chart')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/></svg>';
      } else if (icon.classList.contains('icon-shield')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/><path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/></svg>';
      } else if (icon.classList.contains('icon-user')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/></svg>';
      } else if (icon.classList.contains('icon-check')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>';
      } else if (icon.classList.contains('icon-arrow-right')) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>';
      } else {
        // Default icon
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/></svg>';
      }
    }
  });

  // Fix missing images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.src || img.src.endsWith('/') || img.src.includes('undefined') || img.src.includes('null')) {
      // Determine appropriate placeholder based on context
      let placeholder = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
      
      // Check for testimonial images
      if (img.closest('.testimonial') || img.closest('.author-avatar')) {
        placeholder = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80';
      }
      
      // Check for feature images
      if (img.closest('.feature')) {
        placeholder = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
      }
      
      // Check for blog images
      if (img.closest('.blog') || img.closest('.article')) {
        placeholder = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
      }
      
      // Set the placeholder
      img.src = placeholder;
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

  // Fix alignment issues
  const containers = document.querySelectorAll('.container');
  containers.forEach(container => {
    container.style.width = '100%';
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    container.style.padding = '0 20px';
    container.style.boxSizing = 'border-box';
  });

  // Fix responsive layout
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.margin = '-15px';
  });

  // Fix columns
  const cols = document.querySelectorAll('.col, .col-12, .col-md-6, .col-lg-4, .col-lg-3');
  cols.forEach(col => {
    col.style.padding = '15px';
    col.style.boxSizing = 'border-box';
    
    if (col.classList.contains('col')) {
      col.style.flex = '1 0 0%';
    } else if (col.classList.contains('col-12')) {
      col.style.flex = '0 0 100%';
      col.style.maxWidth = '100%';
    } else if (col.classList.contains('col-md-6')) {
      if (window.innerWidth >= 768) {
        col.style.flex = '0 0 50%';
        col.style.maxWidth = '50%';
      } else {
        col.style.flex = '0 0 100%';
        col.style.maxWidth = '100%';
      }
    } else if (col.classList.contains('col-lg-4')) {
      if (window.innerWidth >= 992) {
        col.style.flex = '0 0 33.333333%';
        col.style.maxWidth = '33.333333%';
      } else {
        col.style.flex = '0 0 100%';
        col.style.maxWidth = '100%';
      }
    } else if (col.classList.contains('col-lg-3')) {
      if (window.innerWidth >= 992) {
        col.style.flex = '0 0 25%';
        col.style.maxWidth = '25%';
      } else {
        col.style.flex = '0 0 100%';
        col.style.maxWidth = '100%';
      }
    }
  });

  console.log('SVG, alignment, and animation fixes applied');
});
