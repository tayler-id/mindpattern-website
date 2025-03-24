// Consolidated JavaScript for Mental Health Pattern Recognition Assistant Website

document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile menu toggle =====
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  // Mobile breakpoint should match CSS media query
  const mobileBreakpoint = 768;
  
  // Function to check viewport and adjust element states accordingly
  function checkViewportSize() {
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= mobileBreakpoint) {
      // Mobile view
      if (mobileMenuToggle) mobileMenuToggle.style.display = 'block';
      if (mainNav) mainNav.style.display = ''; // Let CSS control display based on active state
    } else {
      // Desktop view
      if (mobileMenuToggle) mobileMenuToggle.style.display = 'none';
      if (mainNav) mainNav.style.display = 'block';
      
      // Reset active states when returning to desktop
      if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        
        // Reset hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  }
  
  if (mobileMenuToggle && mainNav) {
    // Run the check on page load
    checkViewportSize();
    
    // Set up resize event handler
    window.addEventListener('resize', function() {
      // Using requestAnimationFrame to throttle and improve performance
      requestAnimationFrame(checkViewportSize);
    });
    
    // Mobile menu toggle click handler
    mobileMenuToggle.addEventListener('click', function() {
      // First toggle the classes immediately, then animate
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
  
  // ===== Header scroll effect =====
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
  
  // ===== Testimonials slider =====
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.testimonial-prev');
  const nextButton = document.querySelector('.testimonial-next');
  
  if (testimonialCards.length && dots.length) {
    let currentSlide = 0;
    let autoSlideInterval;
    
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
        // Reset auto-slide timer when user interacts
        clearInterval(autoSlideInterval);
        startAutoSlide();
      });
    });
    
    // Fix: Ensure dots are properly aligned on window resize
    window.addEventListener('resize', function() {
      const dotsContainer = document.querySelector('.testimonial-dots');
      if (dotsContainer) {
        // Force reflow of dots container
        dotsContainer.style.display = 'flex';
        dotsContainer.style.justifyContent = 'center';
      }
    });
    
    // Event listeners for prev/next buttons
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        let newSlide = currentSlide - 1;
        if (newSlide < 0) {
          newSlide = testimonialCards.length - 1;
        }
        showSlide(newSlide);
        // Reset auto-slide timer when user interacts
        clearInterval(autoSlideInterval);
        startAutoSlide();
      });
      
      nextButton.addEventListener('click', () => {
        let newSlide = currentSlide + 1;
        if (newSlide >= testimonialCards.length) {
          newSlide = 0;
        }
        showSlide(newSlide);
        // Reset auto-slide timer when user interacts
        clearInterval(autoSlideInterval);
        startAutoSlide();
      });
    }
    
    // Auto-advance slides every 5 seconds
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        let newSlide = currentSlide + 1;
        if (newSlide >= testimonialCards.length) {
          newSlide = 0;
        }
        showSlide(newSlide);
      }, 5000);
    }
    
    startAutoSlide();
  }
  
  // ===== Newsletter form submission =====
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const submitButton = this.querySelector('button[type="submit"]');
      
      if (emailInput && emailInput.value) {
        // Disable button to prevent multiple submissions
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Subscribing...';
        }
        
        // Simulate form submission with a delay
        setTimeout(() => {
          // In a real implementation, this would send the data to a server
          alert('Thank you for subscribing to our newsletter!');
          emailInput.value = '';
          
          // Re-enable button
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Subscribe';
          }
        }, 1000);
      }
    });
  }
  
  // ===== Contact form submission =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitButton = this.querySelector('button[type="submit"]');
      
      // Disable button to prevent multiple submissions
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      
      // Simulate form submission with a delay
      setTimeout(() => {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Your message has been sent successfully!';
        
        // Add success message after form
        this.parentNode.insertBefore(successMessage, this.nextSibling);
        
        // Reset form
        this.reset();
        
        // Re-enable button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }, 1500);
    });
  }
  
  // ===== Smooth scroll for all anchor links =====
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

  // ===== Custom cursor effect =====
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  const follower = document.createElement('div');
  follower.classList.add('cursor-follower');
  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animate);
  }
  animate();

  // Hover effects for links and buttons
  const interactiveElements = document.querySelectorAll('a, button, .interactive');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
      follower.style.transform = `translate(${followerX}px, ${followerY}px) scale(0.8)`;
      follower.style.borderColor = 'rgba(99, 102, 241, 0.6)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
      follower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
      follower.style.borderColor = 'rgba(99, 102, 241, 0.3)';
    });
  });

  // ===== Scroll reveal animations =====
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    // Store elements in view to reveal them in sequence
    const elementsToReveal = [];
    
    revealElements.forEach((element, index) => {
      // Only process elements that haven't been revealed yet
      if (!element.classList.contains('active')) {
        const elementTop = element.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect();
        
        // Check if element is in view
        if (elementTop < windowHeight - revealPoint) {
          elementsToReveal.push({
            element: element,
            index: index,
            top: elementTop,
            height: elementRect.height
          });
        }
      }
    });
    
    // Sort elements by vertical position (top to bottom)
    elementsToReveal.sort((a, b) => a.top - b.top);
    
    // Reveal elements with increased delay for further down elements
    elementsToReveal.forEach((item, index) => {
      setTimeout(() => {
        item.element.classList.add('active');
      }, index * 150); // Increased to 150ms delay between each element
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Check on initial load

  // ===== Subtle parallax effect for hero section =====
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      // Fix: Limit parallax effect to prevent excessive movement
      const parallaxValue = Math.min(scrollPosition * 0.3, 100);
      heroSection.style.backgroundPositionY = `${parallaxValue}px`;
    });
  }

  // ===== Interactive card hover effects =====
  const cards = document.querySelectorAll('.interactive-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = `${(centerX - x) / 10}px ${(centerY - y) / 10}px 30px rgba(0, 0, 0, 0.1)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.boxShadow = 'var(--shadow-md)';
      card.style.transition = 'all 0.5s ease';
    });
  });

  // ===== Magnetic buttons =====
  const magneticButtons = document.querySelectorAll('.magnetic-button');
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) * 0.2;
      const deltaY = (y - centerY) * 0.2;
      
      button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
      button.style.transition = 'all 0.3s ease';
    });
  });

  // ===== Animated counter for statistics =====
  const counters = document.querySelectorAll('.counter');
  
  // Fix: Use Intersection Observer to trigger counter only once
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 16)); // 60fps
        let current = 0;
        
        function updateCounter() {
          current += step;
          if (current >= target) {
            entry.target.textContent = target.toLocaleString();
            entry.target.classList.add('counted'); // Mark as counted
          } else {
            entry.target.textContent = current.toLocaleString();
            requestAnimationFrame(updateCounter);
          }
        }
        
        updateCounter();
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // ===== Animated gradient background =====
  const gradientElement = document.querySelector('.animated-gradient');
  if (gradientElement) {
    let hue = 0;
    
    function animateGradient() {
      hue = (hue + 0.1) % 360;
      const color1 = `hsl(${hue}, 70%, 60%)`;
      const color2 = `hsl(${(hue + 60) % 360}, 70%, 60%)`;
      
      gradientElement.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
      
      requestAnimationFrame(animateGradient);
    }
    
    animateGradient();
  }

  // ===== Typing animation for headlines =====
  const typingElements = document.querySelectorAll('.typing-animation');
  
  // Fix: Use Intersection Observer for typing animation
  const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
        const text = entry.target.getAttribute('data-text') || entry.target.textContent;
        entry.target.textContent = '';
        entry.target.classList.add('typed'); // Mark as typed
        
        let i = 0;
        const interval = setInterval(() => {
          if (i < text.length) {
            entry.target.textContent += text.charAt(i);
            i++;
          } else {
            clearInterval(interval);
          }
        }, 50);
      }
    });
  }, { threshold: 0.5 });
  
  typingElements.forEach(element => {
    // Store original text
    element.setAttribute('data-text', element.textContent);
    typingObserver.observe(element);
  });

  // ===== Floating elements animation =====
  const floatingElements = document.querySelectorAll('.floating');
  floatingElements.forEach((el, index) => {
    // Create random animation parameters for each element
    const duration = 15 + Math.random() * 10;
    const delay = Math.random() * 5;
    
    // Fix: Use transform for animation to prevent layout shifts
    el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  });

  // ===== Interactive wave animation for footer =====
  const footer = document.querySelector('footer');
  if (footer) {
    // Check if wave animation already exists
    if (!footer.querySelector('.wave-animation')) {
      const wave = document.createElement('div');
      wave.classList.add('wave-animation');
      footer.prepend(wave);
      
      for (let i = 0; i < 5; i++) {
        const waveLayer = document.createElement('div');
        waveLayer.classList.add('wave-layer');
        waveLayer.style.animationDelay = `${i * 0.2}s`;
        waveLayer.style.opacity = `${1 - i * 0.2}`;
        wave.appendChild(waveLayer);
      }
    }
  }

  // ===== Update social media links with real URLs =====
  const socialLinks = document.querySelectorAll('.social-links a');
  const socialUrls = [
    'https://facebook.com/mindpattern',
    'https://twitter.com/mindpattern',
    'https://instagram.com/mindpattern',
    'https://linkedin.com/company/mindpattern'
  ];
  
  socialLinks.forEach((link, index) => {
    if (index < socialUrls.length) {
      link.href = socialUrls[index];
    }
  });
});
