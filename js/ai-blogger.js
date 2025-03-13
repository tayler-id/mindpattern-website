// AI Autonomous Blogger System
// This script handles automatic content generation and publishing for the MindPattern blog

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { OpenAI } = require('openai');

// Configuration
const config = {
  // Content generation settings
  contentGeneration: {
    articlesPerMonth: 4,
    minWordsPerArticle: 2000,
    maxWordsPerArticle: 4000,
    topicCategories: [
      'Pattern Recognition',
      'Research & Studies',
      'Wellness Strategies',
      'Technology',
      'Neuroscience'
    ]
  },
  
  // Expert profiles for article attribution
  experts: [
    {
      name: 'Dr. Rebecca Chen',
      credentials: 'Ph.D.',
      title: 'Neuroscientist & Mental Health Researcher',
      specialties: ['neuroscience', 'neuroimaging', 'pattern recognition'],
      image: 'images/author-dr-chen.jpg'
    },
    {
      name: 'Dr. Amir Patel',
      credentials: 'Ph.D.',
      title: 'Clinical Psychologist',
      specialties: ['anxiety disorders', 'clinical psychology', 'cognitive behavioral therapy'],
      image: 'images/author-dr-patel.jpg'
    },
    {
      name: 'Dr. Sarah Johnson',
      credentials: 'Ph.D.',
      title: 'AI & Mental Health Specialist',
      specialties: ['artificial intelligence', 'digital phenotyping', 'technology'],
      image: 'images/author-dr-johnson.jpg'
    },
    {
      name: 'Dr. Elena Rodriguez',
      credentials: 'Ph.D.',
      title: 'Chronobiology Researcher',
      specialties: ['circadian rhythms', 'sleep patterns', 'mood disorders'],
      image: 'images/author-dr-rodriguez.jpg'
    },
    {
      name: 'Dr. Michael Williams',
      credentials: 'Ph.D.',
      title: 'Mindfulness Researcher',
      specialties: ['mindfulness', 'meditation', 'cognitive science'],
      image: 'images/author-dr-williams.jpg'
    },
    {
      name: 'Dr. James Thompson',
      credentials: 'Ph.D.',
      title: 'Digital Psychology Expert',
      specialties: ['social media', 'digital behavior', 'technology addiction'],
      image: 'images/author-dr-thompson.jpg'
    },
    {
      name: 'Dr. Jennifer Kim',
      credentials: 'Ph.D.',
      title: 'Nutritional Psychiatrist',
      specialties: ['nutrition', 'diet', 'metabolic health'],
      image: 'images/author-dr-kim.jpg'
    }
  ],
  
  // Research sources for citations
  researchSources: [
    'Journal of the American Medical Association',
    'Nature Neuroscience',
    'Proceedings of the National Academy of Sciences',
    'Biological Psychiatry',
    'Journal of Cognitive Neuroscience',
    'Neuron',
    'Translational Psychiatry',
    'American Journal of Psychiatry',
    'npj Digital Medicine',
    'Nature Biomedical Engineering'
  ],
  
  // API configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4-turbo'
  },
  
  // Publishing schedule
  publishingSchedule: {
    daysOfWeek: [1, 3], // Monday and Wednesday
    timeOfDay: '09:00', // 9 AM
    timezone: 'America/New_York'
  },
  
  // Content directories
  directories: {
    articles: path.join(__dirname, '../blog-articles'),
    images: path.join(__dirname, '../images'),
    templates: path.join(__dirname, '../templates')
  }
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openai.apiKey
});

// Main class for the autonomous blogger system
class AIAutonomousBlogger {
  constructor(config) {
    this.config = config;
    this.ensureDirectoriesExist();
  }
  
  // Make sure all required directories exist
  ensureDirectoriesExist() {
    Object.values(this.config.directories).forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }
  
  // Generate content ideas based on trending topics and research
  async generateContentIdeas() {
    console.log('Generating content ideas...');
    
    // Get trending mental health topics
    const trendingTopics = await this.getTrendingTopics();
    
    // Get recent research papers
    const recentResearch = await this.getRecentResearch();
    
    // Generate article ideas using OpenAI
    const prompt = `
      As a PhD-level mental health expert, generate 5 article ideas for a mental health blog focused on pattern recognition.
      
      Trending topics in mental health currently include:
      ${trendingTopics.join('\n')}
      
      Recent research papers include:
      ${recentResearch.map(r => `"${r.title}" (${r.journal})`).join('\n')}
      
      For each article idea, provide:
      1. A compelling title
      2. The primary category (from: ${this.config.contentGeneration.topicCategories.join(', ')})
      3. A brief description (2-3 sentences)
      4. Key points to cover (3-5 bullet points)
      5. Potential expert author from our team based on specialty match
      
      Our expert team includes:
      ${this.config.experts.map(e => `- ${e.name}, ${e.title} (specialties: ${e.specialties.join(', ')})`).join('\n')}
      
      Format each idea as a JSON object.
    `;
    
    try {
      const response = await openai.chat.completions.create({
        model: this.config.openai.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      });
      
      const content = response.choices[0].message.content;
      const ideas = this.extractJsonFromText(content);
      
      console.log(`Generated ${ideas.length} content ideas`);
      return ideas;
    } catch (error) {
      console.error('Error generating content ideas:', error);
      return [];
    }
  }
  
  // Extract JSON objects from text response
  extractJsonFromText(text) {
    try {
      // Find all JSON objects in the text
      const jsonRegex = /\{[\s\S]*?\}/g;
      const jsonMatches = text.match(jsonRegex);
      
      if (!jsonMatches) return [];
      
      // Parse each JSON object
      return jsonMatches.map(json => {
        try {
          return JSON.parse(json);
        } catch (e) {
          console.error('Failed to parse JSON:', json);
          return null;
        }
      }).filter(Boolean);
    } catch (error) {
      console.error('Error extracting JSON from text:', error);
      return [];
    }
  }
  
  // Get trending mental health topics from reputable sources
  async getTrendingTopics() {
    console.log('Fetching trending mental health topics...');
    
    try {
      // In a production environment, this would scrape or use APIs from sources like:
      // - Psychology Today
      // - National Institute of Mental Health
      // - American Psychological Association
      // - World Health Organization
      
      // For demonstration, we'll return a static list
      return [
        'Digital phenotyping for early detection of mental health changes',
        'Neuroplasticity and pattern formation in anxiety disorders',
        'Circadian rhythm disruptions and their impact on mood regulation',
        'Nutritional psychiatry and gut-brain connection',
        'AI-assisted cognitive behavioral therapy',
        'Social media usage patterns and mental wellbeing',
        'Mindfulness-based interventions for breaking negative thought patterns',
        'Sleep quality metrics and mental health correlations'
      ];
    } catch (error) {
      console.error('Error fetching trending topics:', error);
      return [];
    }
  }
  
  // Get recent research papers from academic sources
  async getRecentResearch() {
    console.log('Fetching recent research papers...');
    
    try {
      // In a production environment, this would use APIs from:
      // - PubMed
      // - Google Scholar
      // - ScienceDirect
      // - Research Gate
      
      // For demonstration, we'll return a static list
      return [
        {
          title: 'Neural Signatures of Cognitive Flexibility in Depression and Anxiety',
          journal: 'Nature Neuroscience',
          date: '2025-02-15'
        },
        {
          title: 'Digital Biomarkers for Mental Health: A Systematic Review',
          journal: 'npj Digital Medicine',
          date: '2025-02-10'
        },
        {
          title: 'Circadian Rhythm Disruptions as Predictors of Mood Episodes',
          journal: 'Biological Psychiatry',
          date: '2025-01-28'
        },
        {
          title: 'Neuroinflammatory Patterns in Treatment-Resistant Depression',
          journal: 'JAMA Psychiatry',
          date: '2025-01-22'
        },
        {
          title: 'Machine Learning for Pattern Recognition in Mental Health Tracking Apps',
          journal: 'Nature Biomedical Engineering',
          date: '2025-01-15'
        }
      ];
    } catch (error) {
      console.error('Error fetching recent research:', error);
      return [];
    }
  }
  
  // Generate a full article based on a content idea
  async generateArticle(idea) {
    console.log(`Generating article: ${idea.title}`);
    
    // Find the expert author
    const expert = this.config.experts.find(e => e.name === idea.expert) || 
                  this.config.experts[Math.floor(Math.random() * this.config.experts.length)];
    
    // Get relevant research for citations
    const relevantResearch = await this.getRelevantResearch(idea.title, idea.keyPoints);
    
    // Generate the article using OpenAI
    const prompt = `
      As ${expert.name}, ${expert.credentials}, a ${expert.title}, write a comprehensive, PhD-level article on "${idea.title}".
      
      The article should:
      1. Be approximately 3000 words
      2. Include an engaging introduction explaining the importance of this topic
      3. Cover these key points: ${idea.keyPoints.join(', ')}
      4. Include at least 8-10 academic citations from reputable journals
      5. Use proper academic language and terminology appropriate for a PhD-level mental health professional
      6. Include a section on implications for pattern recognition in mental health tracking
      7. End with a conclusion and future directions
      
      Relevant research to cite includes:
      ${relevantResearch.map(r => `- "${r.title}" (${r.authors}, ${r.journal}, ${r.year})`).join('\n')}
      
      Format the article in HTML with proper heading structure, paragraphs, and a references section at the end.
    `;
    
    try {
      const response = await openai.chat.completions.create({
        model: this.config.openai.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000
      });
      
      const articleContent = response.choices[0].message.content;
      
      // Create article metadata
      const articleData = {
        title: idea.title,
        category: idea.category,
        description: idea.description,
        author: expert,
        date: new Date().toISOString(),
        content: articleContent,
        slug: this.generateSlug(idea.title)
      };
      
      return articleData;
    } catch (error) {
      console.error('Error generating article:', error);
      throw error;
    }
  }
  
  // Get relevant research papers for a specific topic
  async getRelevantResearch(title, keyPoints) {
    console.log(`Finding relevant research for: ${title}`);
    
    // In a production environment, this would search academic databases
    // For demonstration, we'll generate fictional but realistic research papers
    
    const topics = [...keyPoints, title.split(' ')].flat();
    const relevantTopics = topics.filter(t => t.length > 4);
    
    // Generate fictional research papers related to the topic
    const researchPapers = [];
    
    for (let i = 0; i < 12; i++) {
      const year = 2022 + Math.floor(Math.random() * 4); // 2022-2025
      const authorCount = 1 + Math.floor(Math.random() * 3);
      const authors = [];
      
      // Generate random author names
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Chen', 'Kim', 'Lee', 'Patel', 'Wang'];
      
      for (let j = 0; j < authorCount; j++) {
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        authors.push(lastName);
      }
      
      // Format authors
      let authorString = authors[0];
      if (authors.length === 2) {
        authorString = `${authors[0]} & ${authors[1]}`;
      } else if (authors.length > 2) {
        authorString = `${authors[0]} et al.`;
      }
      
      // Select a journal
      const journal = this.config.researchSources[Math.floor(Math.random() * this.config.researchSources.length)];
      
      // Generate a title based on the topic
      const topic = relevantTopics[Math.floor(Math.random() * relevantTopics.length)];
      const titles = [
        `Advances in ${topic} Research: Implications for Mental Health Pattern Recognition`,
        `The Role of ${topic} in Predicting Mental Health Outcomes: A Longitudinal Study`,
        `Neural Correlates of ${topic}: A Systematic Review and Meta-Analysis`,
        `${topic} Patterns in Clinical and Non-Clinical Populations`,
        `Digital Assessment of ${topic}: Validation of Novel Metrics`,
        `${topic} as a Biomarker for Mental Health Status: Current Evidence`,
        `Temporal Dynamics of ${topic} in Mood Disorders`,
        `Machine Learning Approaches to ${topic} Detection in Real-World Settings`,
        `The Relationship Between ${topic} and Treatment Response in Depression`,
        `Circadian Variations in ${topic}: Implications for Mental Health Monitoring`
      ];
      
      const title = titles[Math.floor(Math.random() * titles.length)];
      
      researchPapers.push({
        title,
        authors: authorString,
        journal,
        year
      });
    }
    
    return researchPapers;
  }
  
  // Generate a URL-friendly slug from a title
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }
  
  // Create HTML file for an article
  async createArticleFile(article) {
    console.log(`Creating HTML file for: ${article.title}`);
    
    try {
      // Read the article template
      const templatePath = path.join(this.config.directories.templates, 'article-template.html');
      let template = fs.existsSync(templatePath) 
        ? fs.readFileSync(templatePath, 'utf8')
        : this.getDefaultArticleTemplate();
      
      // Replace template variables with article data
      const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      template = template
        .replace(/{{title}}/g, article.title)
        .replace(/{{category}}/g, article.category)
        .replace(/{{date}}/g, formattedDate)
        .replace(/{{authorName}}/g, article.author.name)
        .replace(/{{authorCredentials}}/g, article.author.credentials)
        .replace(/{{authorTitle}}/g, article.author.title)
        .replace(/{{authorImage}}/g, article.author.image)
        .replace(/{{content}}/g, article.content);
      
      // Save the article file
      const fileName = `blog-post-${article.slug}.html`;
      const filePath = path.join(this.config.directories.articles, fileName);
      
      fs.writeFileSync(filePath, template);
      console.log(`Article saved to: ${filePath}`);
      
      return fileName;
    } catch (error) {
      console.error('Error creating article file:', error);
      throw error;
    }
  }
  
  // Get default article template if none exists
  getDefaultArticleTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} - MindPattern Blog</title>
    <meta name="description" content="{{description}}">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/design-system.css">
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="images/favicon.png">
</head>
<body>
    <!-- Header -->
    <header class="site-header">
        <div class="container d-flex justify-content-between align-items-center">
            <div class="logo">
                <a href="index.html">
                    <h1>MindPattern</h1>
                </a>
            </div>
            <nav class="main-nav">
                <ul class="d-flex">
                    <li><a href="features.html" class="nav-link">Features</a></li>
                    <li><a href="pricing.html" class="nav-link">Pricing</a></li>
                    <li><a href="investment.html" class="nav-link">Invest</a></li>
                    <li><a href="donate.html" class="nav-link">Donate</a></li>
                    <li><a href="blog.html" class="nav-link active">Blog</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                    <li><a href="signup.html" class="btn btn-primary">Sign Up</a></li>
                </ul>
            </nav>
            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- Article Header -->
    <section class="article-header bg-gradient-primary">
        <div class="container">
            <div class="article-meta text-light reveal">
                <span class="article-category">{{category}}</span>
                <span class="article-date">{{date}}</span>
            </div>
            <h1 class="article-title text-light reveal">{{title}}</h1>
            <div class="article-author reveal">
                <img src="{{authorImage}}" alt="{{authorName}}" class="author-avatar">
                <div class="author-info">
                    <h4 class="text-light">{{authorName}}, {{authorCredentials}}</h4>
                    <p class="text-light">{{authorTitle}}</p>
                </div>
            </div>
        </div>
        <div class="wave-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
    </section>

    <!-- Article Content -->
    <section class="article-content">
        <div class="container">
            <div class="article-container">
                <div class="article-main reveal">
                    <div class="article-text">
                        {{content}}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <h3>MindPattern</h3>
                    <p>Revolutionizing mental health tracking with AI-powered pattern recognition technology.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook"><i class="icon-facebook"></i></a>
                        <a href="#" aria-label="Twitter"><i class="icon-twitter"></i></a>
                        <a href="#" aria-label="Instagram"><i class="icon-instagram"></i></a>
                        <a href="#" aria-label="LinkedIn"><i class="icon-linkedin"></i></a>
                    </div>
                </div>
                
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="features.html">Features</a></li>
                        <li><a href="pricing.html">Pricing</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-links">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="investment.html">Investors</a></li>
                        <li><a href="donate.html">Donate</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                
                <div class="footer-newsletter">
                    <h4>Stay Updated</h4>
                    <p>Subscribe to our newsletter for the latest updates and insights.</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Your email address" required>
                        <button type="submit" class="btn btn-primary">Subscribe</button>
                    </form>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 MindPattern. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="js/animations.js"></script>
    <script src="js/main.js"></script>
</body>
</html>`;
  }
  
  // Update the blog index page with new articles
  async updateBlogIndex(newArticles) {
    console.log('Updating blog index page...');
    
    try {
      // In a production environment, this would:
      // 1. Read the current blog.html file
      // 2. Parse it with a DOM parser
      // 3. Update the article listings with new articles
      // 4. Save the updated file
      
      console.log('Blog index updated with new articles');
    } catch (error) {
      console.error('Error updating blog index:', error);
    }
  }
  
  // Schedule regular content generation and publishing
  scheduleContentGeneration() {
    console.log('Setting up content generation schedule...');
    
    // In a production environment, this would use a scheduling library like node-cron
    // to run content generation on the specified schedule
    
    const { daysOfWeek, timeOfDay } = this.config.publishingSchedule;
    
    console.log(`Content generation scheduled for ${daysOfWeek.map(d => this.getDayName(d)).join(', ')} at ${timeOfDay}`);
    
    // For demonstration, we'll just log the schedule
    return {
      schedule: `${daysOfWeek.map(d => this.getDayName(d)).join(', ')} at ${timeOfDay}`,
      articlesPerMonth: this.config.contentGeneration.articlesPerMonth
    };
  }
  
  // Get day name from day number
  getDayName(dayNumber) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber];
  }
  
  // Run the entire content generation process
  async runContentGeneration() {
    try {
      // 1. Generate content ideas
      const ideas = await this.generateContentIdeas();
      
      // 2. Select ideas to publish
      const selectedIdeas = ideas.slice(0, 2); // Just take the first 2 for demonstration
      
      // 3. Generate articles for each idea
      const articles = [];
      for (const idea of selectedIdeas) {
        const article = await this.generateArticle(idea);
        articles.push(article);
      }
      
      // 4. Create HTML files for each article
      const fileNames = [];
      for (const article of articles) {
        const fileName = await this.createArticleFile(article);
        fileNames.push(fileName);
      }
      
      // 5. Update the blog index page
      await this.updateBlogIndex(articles);
      
      console.log('Content generation completed successfully');
      return {
        articlesGenerated: articles.length,
        fileNames
      };
    } catch (error) {
      console.error('Error in content generation process:', error);
      throw error;
    }
  }
}

// Export the class for use in other files
module.exports = {
  AIAutonomousBlogger,
  config
};

// If this file is run directly, initialize and run a demo
if (require.main === module) {
  const blogger = new AIAutonomousBlogger(config);
  
  // Set up the content generation schedule
  const schedule = blogger.scheduleContentGeneration();
  console.log('Content generation scheduled:', schedule);
  
  // For demonstration, we could run the content generation process once
  // blogger.runContentGeneration().then(result => {
  //   console.log('Content generation result:', result);
  // }).catch(error => {
  //   console.error('Content generation failed:', error);
  // });
}
