# MindPattern Image Generation Plan

This document outlines the plan for generating images using the EverArt Forge MCP server to replace SVG placeholders across the MindPattern marketing website.

## General Approach

All generated images should:
- Use a consistent visual style that aligns with the mental health theme
- Incorporate the brand's gradient color scheme (#6366F1 purple to #EC4899 pink)
- Have a clean, modern, and professional appearance
- Evoke feelings of calm, clarity, and understanding
- Be appropriate for a mental health application context

## Required Images

### 1. Hero Section Images

**Context**: The hero section is the main visual on the home page. It currently has a brain illustration, but should also include a stylized person image.

#### Brain Illustration
- **Prompt**: "Abstract brain illustration with neural network pattern, modern digital mental health concept, clean lines showing connections between nodes, purple (#6366F1) to pink (#EC4899) gradient, white background, high quality vector style"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/hero-illustration.svg

#### Mental Health Person
- **Prompt**: "Stylized silhouette of a person with a calm, meditative pose, mental health concept, minimalist design with subtle purple to pink gradient highlighting, clean vector style"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/hero-person.svg

### 2. Blog Post Images

**Context**: The blog needs high-quality images for each post to make the content more engaging.

#### Blog Image 1: Mental Health Patterns
- **Prompt**: "Conceptual illustration of mental health patterns, abstract visualization of thought processes, gentle purple to pink gradient, professional clean design for mental health blog"
- **Model**: 9000:FLUX1.1-ultra
- **Format**: webp
- **Output Path**: images/blog/mental-health-patterns.webp

#### Blog Image 2: AI in Healthcare
- **Prompt**: "Conceptual illustration of AI in mental healthcare, abstract visualization of technology and psychology, professional clean design with purple to pink gradient elements"
- **Model**: 9000:FLUX1.1-ultra
- **Format**: webp
- **Output Path**: images/blog/ai-healthcare.webp

#### Blog Image 3: Self-Care Techniques
- **Prompt**: "Calming illustration representing self-care and mental wellness techniques, minimalist style, subtle purple to pink gradient elements, professional healthcare context"
- **Model**: 9000:FLUX1.1-ultra
- **Format**: webp
- **Output Path**: images/blog/self-care.webp

### 3. Testimonial Avatars

**Context**: Testimonial avatars appear in the testimonials slider on the home page. They represent diverse users of the MindPattern app.

#### Avatar 1: Sarah J.
- **Prompt**: "Professional headshot portrait of a female in her 30s with a warm, approachable smile, neutral background with subtle purple to pink gradient, simple and clean style, high quality"
- **Model**: 7000:Recraft-Real
- **Format**: webp
- **Output Path**: images/testimonials/sarah.webp

#### Avatar 2: Michael T.
- **Prompt**: "Professional headshot portrait of a male in his 40s with a friendly expression, neutral background with subtle blue to purple gradient, simple and clean style, high quality"
- **Model**: 7000:Recraft-Real
- **Format**: webp
- **Output Path**: images/testimonials/michael.webp

#### Avatar 3: Dr. Lisa R.
- **Prompt**: "Professional headshot portrait of a female clinical psychologist in her 50s wearing glasses, with a confident and trustworthy expression, neutral background with subtle purple gradient, simple and clean style, high quality"
- **Model**: 7000:Recraft-Real
- **Format**: webp
- **Output Path**: images/testimonials/lisa.webp

### 2. Feature Icons

**Context**: Feature icons appear in the Features Preview section of the home page. They represent the key benefits of the MindPattern app.

#### Pattern Recognition Icon
- **Prompt**: "Minimalist vector icon representing brain pattern recognition, single line art style, abstract neural network or brain wave pattern, mental health theme, purple gradient"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/icons/pattern-recognition.svg

#### Minimal Input Icon
- **Prompt**: "Minimalist vector icon representing minimal data input, simple form or checkbox design, mental health app context, clean lines, purple to pink gradient"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/icons/minimal-input.svg

#### Personalized Insights Icon
- **Prompt**: "Minimalist vector icon representing personalized insights, stylized graph or chart showing pattern recognition, mental health context, clean single line design, purple to pink gradient"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/icons/insights.svg

#### Privacy-Focused Icon
- **Prompt**: "Minimalist vector icon representing data privacy and security, shield or lock design, mental health data protection theme, clean simple lines, purple to pink gradient"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/icons/privacy.svg

### 3. Main Brand Logo

**Context**: The brand logo appears in the header of all pages and is a key part of the MindPattern identity.

- **Prompt**: "Professional vector logo for MindPattern, a mental health AI app, abstract brain wave or pattern motif, clean modern design, incorporates purple (#6366F1) to pink (#EC4899) gradient, minimalist style"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/mindpattern-logo.svg

### 4. Hero Illustration

**Context**: The hero illustration is the main visual on the home page, representing the concept of pattern recognition in mental health.

- **Prompt**: "Abstract brain illustration with neural network pattern, modern digital mental health concept, clean lines showing connections between nodes, purple (#6366F1) to pink (#EC4899) gradient, white background, high quality vector style"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/hero-illustration.svg

### 5. Guarantee Badge

**Context**: The guarantee badge appears on the pricing page to instill trust and confidence.

- **Prompt**: "Professional satisfaction guarantee badge or seal, mental health app context, minimalist design, incorporates purple to pink gradient, clean vector style"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/guarantee.svg

### 6. Enterprise Graphic

**Context**: This graphic appears on the investment page to represent the enterprise/business aspects of MindPattern.

- **Prompt**: "Business growth chart or graph illustration, mental health technology context, modern professional style, subtle purple to pink gradient, clean vector design"
- **Model**: 8000:Recraft-Vector
- **Format**: svg
- **Output Path**: images/enterprise.svg

## Implementation Plan

Once a valid EverArt API key is obtained:

1. Generate all images using the EverArt Forge MCP server with the prompts above
2. Review each generated image for quality and alignment with brand identity
3. Make any necessary adjustments to prompts and regenerate as needed
4. Update the HTML files to reference the new image files
5. Test the website to ensure all images load correctly
6. Check for responsive behavior on different screen sizes
7. Optimize images for web performance if needed

## Example Implementation (For Testimonial Avatar)

```html
<div class="testimonial-author">
    <img src="images/testimonials/sarah.webp" alt="Sarah J." class="testimonial-avatar">
    <div class="testimonial-info">
        <h4>Sarah J.</h4>
        <p>App user for 6 months</p>
    </div>
</div>
```

## Fallback Strategy

The existing SVG placeholders in image-fix.js should remain in place to ensure the website functions correctly if any image fails to load. This provides a robust fallback system while we transition to the new AI-generated images.
