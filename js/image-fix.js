/* Enhanced image fix script to handle missing images and domain-specific URLs */
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
  
  // SVG placeholders for different image types
  const placeholders = {
    testimonial: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.9" /></linearGradient></defs><rect width="150" height="150" fill="#F3F4F6" /><circle cx="75" cy="60" r="30" fill="url(#grad)" /><path d="M75,95 C100,95 115,115 115,140 L35,140 C35,115 50,95 75,95 Z" fill="url(#grad)" /></svg>')}`,
    
    feature: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.9" /></linearGradient></defs><rect width="300" height="200" fill="#F3F4F6" /><circle cx="150" cy="100" r="50" fill="none" stroke="url(#grad)" stroke-width="4" /><path d="M125,100 C135,80 165,80 175,100" fill="none" stroke="url(#grad)" stroke-width="3" /><circle cx="125" cy="80" r="5" fill="url(#grad)" /><circle cx="175" cy="80" r="5" fill="url(#grad)" /></svg>')}`,
    
    blog: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.9" /></linearGradient></defs><rect width="300" height="200" fill="#F3F4F6" /><rect x="50" y="50" width="200" height="20" rx="5" fill="url(#grad)" opacity="0.7" /><rect x="50" y="80" width="150" height="10" rx="5" fill="url(#grad)" opacity="0.5" /><rect x="50" y="100" width="180" height="10" rx="5" fill="url(#grad)" opacity="0.5" /><rect x="50" y="120" width="160" height="10" rx="5" fill="url(#grad)" opacity="0.5" /><rect x="50" y="140" width="140" height="10" rx="5" fill="url(#grad)" opacity="0.5" /></svg>')}`,
    
    icon: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.9" /></linearGradient></defs><circle cx="50" cy="50" r="40" fill="none" stroke="url(#grad)" stroke-width="4" /><path d="M30,50 C40,30 60,30 70,50 C60,70 40,70 30,50 Z" fill="none" stroke="url(#grad)" stroke-width="3" /><circle cx="40" cy="40" r="5" fill="url(#grad)" /><circle cx="60" cy="40" r="5" fill="url(#grad)" /></svg>')}`,
    
    guarantee: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.9" /></linearGradient></defs><circle cx="100" cy="100" r="90" fill="none" stroke="url(#grad)" stroke-width="5" /><circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad)" stroke-width="2" /><path d="M70,100 L90,120 L130,80" fill="none" stroke="url(#grad)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" /></svg>')}`,
    
    enterprise: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.9" /></linearGradient></defs><rect width="300" height="200" fill="#F3F4F6" /><rect x="50" y="80" width="50" height="70" fill="url(#grad)" opacity="0.7" /><rect x="110" y="60" width="50" height="90" fill="url(#grad)" opacity="0.8" /><rect x="170" y="40" width="50" height="110" fill="url(#grad)" opacity="0.9" /><rect x="230" y="100" width="50" height="50" fill="url(#grad)" opacity="0.6" /><line x1="50" y1="150" x2="280" y2="150" stroke="#6366F1" stroke-width="2" /></svg>')}`,
    
    default: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366F1;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#EC4899;stop-opacity:0.9" /></linearGradient></defs><rect width="200" height="200" fill="#F3F4F6" /><path d="M40,40 L160,160 M160,40 L40,160" stroke="url(#grad)" stroke-width="4" /><rect x="60" y="80" width="80" height="40" rx="5" fill="none" stroke="url(#grad)" stroke-width="2" /><text x="100" y="105" font-family="Arial" font-size="12" fill="url(#grad)" text-anchor="middle">Image</text></svg>')}`
  };
  
  // Function to determine if a URL is from our domain
  function isOurDomainUrl(url) {
    return url.includes('mindpattern.ai/') || url.includes('localhost/');
  }
  
  // Function to get appropriate placeholder based on context
  function getPlaceholder(img) {
    // Check for testimonial images - expanded to catch more cases
    if (img.closest('.testimonial') || 
        img.closest('.testimonial-author') || 
        img.closest('.testimonial-avatar') ||
        img.classList.contains('testimonial-avatar') ||
        img.closest('.author-avatar') || 
        img.src.includes('testimonial')) {
      console.log('Applying testimonial placeholder for:', img.src);
      return placeholders.testimonial;
    }
    
    if (img.closest('.feature') || img.src.includes('feature')) {
      return placeholders.feature;
    }
    
    if (img.closest('.blog') || img.closest('.article') || 
        img.src.includes('blog') || img.src.includes('post')) {
      return placeholders.blog;
    }
    
    if (img.src.includes('icon') || img.closest('.icon')) {
      return placeholders.icon;
    }
    
    if (img.src.includes('guarantee')) {
      return placeholders.guarantee;
    }
    
    if (img.src.includes('enterprise')) {
      return placeholders.enterprise;
    }
    
    return placeholders.default;
  }
  
  // Replace missing or domain-specific image src attributes with SVG placeholders
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Special handling for testimonial images
    if (img.src && img.src.includes('testimonial')) {
      console.log('Found testimonial image:', img.src);
      img.src = placeholders.testimonial;
      img.classList.add('placeholder-image');
      img.width = 60;
      img.height = 60;
      img.style.borderRadius = '50%';
      return;
    }
    
    // Check if image is missing, has a domain URL that's ours, or has a 404 error
    if (!img.src || 
        img.src.endsWith('/') || 
        isOurDomainUrl(img.src) || 
        img.src.includes('undefined') || 
        img.src.includes('null')) {
      
      // Set the appropriate placeholder
      img.src = getPlaceholder(img);
      
      // Add a class for styling
      img.classList.add('placeholder-image');
      
      // Set appropriate dimensions if not already set
      if (!img.width && !img.style.width) {
        if (img.closest('.testimonial-avatar') || img.closest('.author-avatar')) {
          img.width = 60;
          img.height = 60;
          img.style.borderRadius = '50%';
        } else if (img.closest('.feature-icon') || img.closest('.icon')) {
          img.width = 48;
          img.height = 48;
        }
      }
    }
  });
  
  // Add event listeners to handle image load errors
  images.forEach(img => {
    img.addEventListener('error', function() {
      console.log('Image failed to load:', this.src);
      // Apply placeholder based on context
      this.src = getPlaceholder(this);
      this.classList.add('placeholder-image');
      
      // Set appropriate dimensions for testimonial avatars
      if (this.closest('.testimonial-avatar') || this.closest('.author-avatar') || 
          this.src.includes('testimonial')) {
        this.width = 60;
        this.height = 60;
        this.style.borderRadius = '50%';
      }
    });
  });
  
  // Add icons where needed
  const iconContainers = document.querySelectorAll('.icon, .feature-icon, .benefit-icon');
  iconContainers.forEach(container => {
    if (!container.innerHTML.trim()) {
      container.innerHTML = '<i class="bi bi-activity"></i>';
    }
  });
  
  // Add CSS for placeholder images
  const style = document.createElement('style');
  style.textContent = `
    .placeholder-image {
      transition: transform 0.3s ease;
    }
    .placeholder-image:hover {
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);
  
  console.log('Enhanced image and style fixes applied');
});
