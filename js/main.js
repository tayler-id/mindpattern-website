// Main JavaScript for Mental Health Pattern Recognition Assistant Website

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      
      // Toggle menu icon
      const spans = this.querySelectorAll('span');
      if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Testimonials slider
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.testimonial-prev');
  const nextButton = document.querySelector('.testimonial-next');
  
  if (testimonialCards.length && dots.length) {
    let currentSlide = 0;
    
    // Hide all slides except the first one
    testimonialCards.forEach((card, index) => {
      if (index !== 0) {
        card.style.display = 'none';
      }
    });
    
    // Function to show a specific slide
    function showSlide(n) {
      // Hide all slides
      testimonialCards.forEach(card => {
        card.style.display = 'none';
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the selected slide and activate corresponding dot
      testimonialCards[n].style.display = 'block';
      dots[n].classList.add('active');
      currentSlide = n;
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Event listeners for prev/next buttons
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        let newSlide = currentSlide - 1;
        if (newSlide < 0) {
          newSlide = testimonialCards.length - 1;
        }
        showSlide(newSlide);
      });
      
      nextButton.addEventListener('click', () => {
        let newSlide = currentSlide + 1;
        if (newSlide >= testimonialCards.length) {
          newSlide = 0;
        }
        showSlide(newSlide);
      });
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
      let newSlide = currentSlide + 1;
      if (newSlide >= testimonialCards.length) {
        newSlide = 0;
      }
      showSlide(newSlide);
    }, 5000);
  }
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        // In a real implementation, this would send the data to a server
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  }
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
});
