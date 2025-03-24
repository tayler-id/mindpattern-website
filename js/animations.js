// Interactive animations for Mental Health Pattern Recognition Assistant Website

document.addEventListener('DOMContentLoaded', function() {
  // Custom cursor effect (inspired by danielsee.com)
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

  // Scroll reveal animations
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
      }, index * 150); // 150ms delay between each element
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Check on initial load

  // Subtle parallax effect for hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
  }

  // Interactive card hover effects (inspired by slotcal.framer.website)
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

  // Magnetic buttons (inspired by quadangles.com)
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

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animated counter for statistics
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = Math.ceil(target / (duration / 16)); // 60fps
    let current = 0;
    
    function updateCounter() {
      current += step;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
      } else {
        counter.textContent = current.toLocaleString();
        requestAnimationFrame(updateCounter);
      }
    }
    
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    });
    
    observer.observe(counter);
  });

  // Animated gradient background
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

  // Typing animation for headlines
  const typingElements = document.querySelectorAll('.typing-animation');
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const interval = setInterval(() => {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
          } else {
            clearInterval(interval);
          }
        }, 50);
        observer.disconnect();
      }
    });
    
    observer.observe(element);
  });

  // Floating elements animation (inspired by sliderrevolution.com)
  const floatingElements = document.querySelectorAll('.floating');
  floatingElements.forEach((el, index) => {
    // Create random animation parameters for each element
    const duration = 15 + Math.random() * 10;
    const delay = Math.random() * 5;
    const amplitude = 10 + Math.random() * 20;
    
    el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    // Create keyframes dynamically
    const keyframes = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(${amplitude}px) translateX(${amplitude/2}px); }
        50% { transform: translateY(0) translateX(${amplitude}px); }
        75% { transform: translateY(-${amplitude}px) translateX(${amplitude/2}px); }
        100% { transform: translateY(0) translateX(0); }
      }
    `;
    
    // Add keyframes to document
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
  });

  // Interactive wave animation for footer
  const footer = document.querySelector('footer');
  if (footer) {
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
});
