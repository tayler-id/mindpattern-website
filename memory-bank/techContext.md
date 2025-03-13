# MindPattern - Technical Context

## Technologies Used

### Frontend Technologies

#### HTML5
- Semantic markup for improved accessibility and SEO
- Structured according to modern web standards
- Used for all page content and structure

#### CSS3
- Custom design system with utility classes
- Flexbox and Grid for layout
- CSS animations and transitions for interactive elements
- Media queries for responsive design
- Custom properties (CSS variables) for consistent theming

#### JavaScript (ES6+)
- Vanilla JavaScript without heavy frameworks
- DOM manipulation for interactive elements
- Intersection Observer API for scroll animations
- Event handling for user interactions
- Animation control and timing

### External Libraries and Resources

#### Fonts
- Google Fonts (Inter and Poppins) for typography
- Preconnect and preload strategies for performance optimization

#### Icons
- Bootstrap Icons via CDN for UI elements
- Custom SVG icons for feature illustrations

#### Animation Libraries
- Custom JavaScript for scroll-based animations
- CSS transitions and keyframes for hover effects and UI feedback

## Development Setup

### Local Development Environment
- Standard web development environment with HTML/CSS/JS
- No build tools or preprocessors required
- Browser developer tools for testing and debugging
- Live Server or similar for local development

### File Organization

```
mental_health_app_site/
├── index.html                # Home page
├── features.html             # Features page
├── pricing.html              # Pricing page
├── investment.html           # Investment page
├── donate.html               # Donation page
├── signup.html               # Sign-up page
├── blog.html                 # Blog listing page
├── blog-post-1.html          # Individual blog post
├── contact.html              # Contact page
├── css/
│   ├── design-system.css     # Base design system and utilities
│   ├── styles.css            # Component-specific styles
│   ├── fixes.css             # Overrides and fixes
│   └── image-paths.css       # Image path handling
├── js/
│   ├── animations.js         # Animation functionality
│   ├── main.js               # Core functionality
│   ├── ai-blogger.js         # Blog-specific functionality
│   ├── image-fix.js          # Image handling fixes
│   ├── svg-fix.js            # SVG handling fixes
│   └── test-script.js        # Testing scripts
├── images/
│   ├── icons/                # UI and feature icons
│   └── testimonials/         # User testimonial images
└── assets/                   # Additional assets
```

### Deployment Strategy
- Static site hosting (no server-side processing required)
- CDN for asset delivery
- HTTPS for secure connections
- Gzip/Brotli compression for performance

## Technical Constraints

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Limited support for Internet Explorer
- Progressive enhancement approach for older browsers

### Performance Requirements
- Initial load under 2 seconds on broadband
- Mobile-optimized with responsive images
- Core content visible without JavaScript
- Interactive elements gracefully degrade

### Accessibility Standards
- WCAG 2.1 AA compliance target
- Semantic HTML for screen readers
- Keyboard navigation support
- Sufficient color contrast
- Alt text for images

### Security Considerations
- Content Security Policy implementation
- Form validation and sanitization
- HTTPS-only resources
- Minimal use of third-party scripts

## Dependencies

### External Services Integration

#### Payment Processing
- Stripe integration for subscription payments
- PayPal for alternative payment options
- Secure checkout flow with PCI compliance

#### Form Handling
- FormSubmit or similar for serverless form processing
- Client-side validation with server-side verification
- CAPTCHA for spam prevention

#### Analytics
- Google Analytics for visitor tracking
- Event tracking for conversion monitoring
- Privacy-focused configuration with anonymized IPs

#### GoFundMe Integration
- Embedded campaign widget on donation page
- API integration for real-time progress updates

### Third-Party Dependencies

#### CDN Resources
- Bootstrap Icons: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css`
- Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap`

#### JavaScript Libraries
- No major framework dependencies (React, Vue, etc.)
- Minimal use of utility libraries for specific functionality
- Custom implementations for animations and interactions

## Development Tooling

### Code Quality
- HTML validation via W3C Validator
- CSS linting with Stylelint
- JavaScript linting with ESLint
- Manual cross-browser testing

### Performance Testing
- Lighthouse audits for performance metrics
- WebPageTest for detailed analysis
- Mobile-friendly testing

### Version Control
- Git for source code management
- Feature branch workflow
- Commit message conventions

## Technical Debt and Future Considerations

### Current Technical Debt
- Duplicate script and style includes
- Manual minification and bundling
- Limited automated testing
- Some browser-specific fixes

### Future Technical Improvements
- Implement a build system (Webpack, Parcel, etc.)
- Add CSS preprocessing (SASS/SCSS)
- Implement automated testing
- Create a component library for consistency
- Improve image optimization workflow
