/* Update all HTML files to include the image-paths.css file */
document.addEventListener('DOMContentLoaded', function() {
  // Add link to image-paths.css in head
  const head = document.querySelector('head');
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = 'css/image-paths.css';
  head.appendChild(linkElement);
  
  // Add Bootstrap Icons CSS
  const bootstrapIcons = document.createElement('link');
  bootstrapIcons.rel = 'stylesheet';
  bootstrapIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css';
  head.appendChild(bootstrapIcons);
  
  // Replace missing image src attributes with CDN placeholders
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.src || img.src.endsWith('/')) {
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
  
  // Add icons where needed
  const iconContainers = document.querySelectorAll('.icon, .feature-icon, .benefit-icon');
  iconContainers.forEach(container => {
    if (!container.innerHTML.trim()) {
      container.innerHTML = '<i class="bi bi-activity"></i>';
    }
  });
  
  console.log('Image and style fixes applied');
});
