// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
  emailLink.addEventListener('click', function(e) {
      
      if (!this.closest('.nav-links')) {
          return true;
      }
      
      
      window.location.href = this.href;
      return false;
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add animation to section content on scroll
const animatedSections = document.querySelectorAll('.section-content-to-animate');

const sectionObserverOptions = {
    threshold: 0.2 // Trigger when 20% of the section is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, sectionObserverOptions);

animatedSections.forEach(section => {
    sectionObserver.observe(section);
});

// Add animation to skill cards
const skillCards = document.querySelectorAll('.skills-in-about li'); // More specific selector
const skillObserverOptions = {
    threshold: 0.1
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, skillObserverOptions);

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    skillObserver.observe(card);
});

// Add animation to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    skillObserver.observe(card); // Re-using skillObserver, consider separate if different options needed
});

// --- Dynamic Projects Loading ---
const projects = [
    {
        title: "AI-Driven Profile Identification System",
        description: "Developed an AI-powered web application for candidate selection, using BERT, TF-IDF, and cosine similarity for profile matching. Implemented a recommendation engine based on skills and experience.",
        // image: "https://via.placeholder.com/300x200?text=AI+Profile", // Image removed as per request
        githubLink: "#", // Placeholder - Add your GitHub link here
        demoLink: "#", 
        technologies: ["BERT", "TF-IDF", "Cosine Similarity", "AI", "Recommendation Engine", "Web Application"]
    },
    {
        title: "Internship Management System",
        description: "Designed and developed a decentralized system using Oracle APEX and Oracle Database, following the Merise methodology. Integrated real-time internship offer management and applications, along with an interactive dashboard for statistical monitoring.",
        // image: "https://via.placeholder.com/300x200?text=Internship+System", // Image removed as per request
        githubLink: "#", // Placeholder - Add your GitHub link here
        demoLink: "#",
        technologies: ["Oracle APEX", "Oracle Database", "Merise Methodology", "Decentralized System"]
    },
    {
        title: "Compiler and Interpreter Development",
        description: "Designed a compiler with lexical, syntax, and semantic analysis, including a token-based parser and P-code interpretation.",
        // image: "https://via.placeholder.com/300x200?text=Compiler+Interpreter", // Image removed as per request
        githubLink: "#", // Placeholder - Add your GitHub link here
        demoLink: "#",
        technologies: ["Compiler Design", "Lexical Analysis", "Syntax Analysis", "Semantic Analysis", "P-code Interpretation"]
    },
    {
        title: "Cosmetic Product Property Prediction",
        description: "Developed a machine learning model to predict cosmetic product properties based on their ingredients, using multi-label classification algorithms and an interactive user interface.",
        // image: "https://via.placeholder.com/300x200?text=Cosmetic+Prediction", // Image removed as per request
        githubLink: "#", // Placeholder - Add your GitHub link here
        demoLink: "#",
        technologies: ["Machine Learning", "Multi-label Classification", "User Interface", "Cosmetics"]
    },
    {
        title: "Facial Emotion Recognition",
        description: "Built an interactive web application to detect human emotions from facial images, using deep learning and computer vision techniques with convolutional neural networks (CNNs).",
        // image: "https://via.placeholder.com/300x200?text=Emotion+Recognition", // Image removed as per request
        githubLink: "#", // Placeholder - Add your GitHub link here
        demoLink: "#",
        technologies: ["Deep Learning", "Computer Vision", "CNNs", "Web Application", "Emotion Recognition"]
    }
];

function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return; // Exit if grid not found

    // Clear existing projects if any (useful if calling multiple times)
    projectsGrid.innerHTML = ''; 

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.classList.add('section-content-to-animate'); // For animation on scroll

        projectCard.innerHTML = `
            <div class="project-header-icons">
                ${project.githubLink ? `<a href="${project.githubLink}" class="project-github-icon" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>` : ''}
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <ul class="project-technologies">
                    ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Re-observe newly added project cards for animation
    const newProjectCards = document.querySelectorAll('.projects-grid .project-card');
    newProjectCards.forEach(card => {
        sectionObserver.observe(card);
    });
}

// Call loadProjects when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadProjects);

// Experience section interactivity
const companyItems = document.querySelectorAll('.company-item');
const jobDetails = document.querySelectorAll('.job-details');

companyItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all company items and job details
        companyItems.forEach(c => c.classList.remove('active'));
        jobDetails.forEach(j => j.classList.remove('active'));

        // Add active class to clicked company item
        this.classList.add('active');

        // Show corresponding job details
        const targetId = this.dataset.target;
        document.getElementById(targetId).classList.add('active');
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    } else {
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // If no theme saved, check user's system preference
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'light-mode');
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }
});

document.addEventListener('DOMContentLoaded', function() {
  // Chatbot Widget Logic
  const chatbotBubble = document.getElementById('chatbot-bubble');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotSuggestions = document.getElementById('chatbot-suggestions');

  // Suggested questions
  const suggestedQuestions = [
    "Who is Hajar?",
    "What are your skills?",
    "Tell me about your experience.",
    "What projects have you done?",
    "Where did you study?",
    "What certifications do you have?",
    "What is your email?"
  ];

  let suggestionsUsed = false;
  let remainingSuggestions = [...suggestedQuestions];

  function renderSuggestions(inline = false, afterMsg = null) {
    if (!inline) {
      chatbotSuggestions.innerHTML = '';
      if (suggestionsUsed) return;
      remainingSuggestions.forEach((q) => {
        const btn = document.createElement('button');
        btn.className = 'chatbot-suggestion-btn';
        btn.textContent = q;
        btn.onclick = function() {
          chatbotInput.value = q;
          chatbotSend.click();
          suggestionsUsed = true;
          chatbotSuggestions.innerHTML = '';
        };
        chatbotSuggestions.appendChild(btn);
      });
    } else if (afterMsg) {
      // Remove any previous inline suggestions
      const oldInline = document.querySelector('.chatbot-suggestions-inline');
      if (oldInline) oldInline.remove();
      // Remove the just-used suggestion
      remainingSuggestions = remainingSuggestions.filter(q => q !== afterMsg);
      if (remainingSuggestions.length === 0) return;
      // Render remaining suggestions under the answer
      const container = document.createElement('div');
      container.className = 'chatbot-suggestions-inline';
      container.style.marginTop = '8px';
      container.style.display = 'flex';
      container.style.flexWrap = 'wrap';
      container.style.gap = '8px';
      remainingSuggestions.forEach((q) => {
        const btn = document.createElement('button');
        btn.className = 'chatbot-suggestion-btn';
        btn.textContent = q;
        btn.onclick = function() {
          chatbotInput.value = q;
          chatbotSend.click();
        };
        container.appendChild(btn);
      });
      chatbotMessages.appendChild(container);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  }

  renderSuggestions();

  // Resume info for answers
  const resumeInfo = {
    name: "Hajar Elkasiri",
    email: "hajar.elkasiri3@gmail.com",
    phone: "+212700323158",
    profile: "I'm a software engineering student at ENSIAS, passionate about software development, artificial intelligence, and data-driven systems.",
    experience: "I completed a summer internship at CDG Prévoyance (July-August 2024), where I developed an interactive system for evaluating programming skills using Spring Boot, MySQL, HTML, JavaScript, and CSS.",
    projects: [
      "1. AI Profile Matching System: A web app that matches candidate profiles using BERT, TF-IDF, and cosine similarity.",
      "2. Internship Management System: A decentralized application developed with Oracle APEX and Oracle DB using Merise methodology.",
      "3. Compiler & Interpreter: Built a compiler with lexical, syntactic, and semantic analysis with P-code interpretation.",
      "4. Cosmetic Property Prediction: Machine learning model to predict properties of cosmetic products from ingredients (multi-label classification).",
      "5. Facial Emotion Recognition: Web app that detects human emotions from facial images using CNN and deep learning."
    ],
    education: [
      "ENSIAS (2023 – Present): Software Engineering Program",
      "CPGE Meknès (2021 – 2023): Mathematics, Computer Science, and Physics"
    ],
    skills: [
      "Languages: Python, Java, R, C, SQL",
      "Frameworks: Spring Boot, TensorFlow, Scikit-Learn, Pandas, NumPy",
      "Web: HTML, CSS, JavaScript",
      "Databases: MySQL, Oracle, PL/SQL",
      "Tools: Git, Oracle APEX, Jupyter, Eclipse, Cisco Packet Tracer"
    ],
    certifications: [
      "IBM AI Analyst Certificate",
      "Python Certificate - Kaggle"
    ],
    extracurricular: "I'm part of several student organizations: Sponsorship Lead at IEEE ENSIAS, Media Lead at ENSIAS Enterprise Forum, and IT cell lead at ENSIAS CP."
  };

  function addMessage(sender, text) {
    const msg = document.createElement('div');
    if (sender === 'Bot') {
      msg.className = 'chatbot-msg bot';
    } else {
      msg.className = 'chatbot-msg user';
    }
    msg.innerHTML = text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function botReply(userInput) {
    const input = userInput.toLowerCase();
    if (input.includes('who is hajar') || input.includes('who are you')) return `I am Hajar Elkasiri, a passionate Software Engineering student specializing in AI and software development. ${resumeInfo.profile}`;
    if (input.includes('name')) return `My name is ${resumeInfo.name}.`;
    if (input.includes('email')) return `You can contact me at ${resumeInfo.email}.`;
    if (input.includes('phone') || input.includes('contact')) return `My phone number is ${resumeInfo.phone}.`;
    if (input.includes('profile') || input.includes('about')) return resumeInfo.profile;
    if (input.includes('experience') || input.includes('intern')) return resumeInfo.experience;
    if (input.includes('project')) return resumeInfo.projects.join('\n');
    if (input.includes('education') || input.includes('study') || input.includes('school')) return resumeInfo.education.join('\n');
    if (input.includes('skill') || input.includes('technolog')) return resumeInfo.skills.join('\n');
    if (input.includes('certificat')) return resumeInfo.certifications.join('\n');
    if (input.includes('extracurricular') || input.includes('activity') || input.includes('ieee')) return resumeInfo.extracurricular;
    if (input.includes('hello') || input.includes('hi')) return "Hello! I'm Alex, Hajar's little bot. You can ask me about Hajar's skills, experience, education, or anything about her.";
    return "Sorry, I don't have an answer for that. If you have a specific question, try sending a message or contacting me through the Contact section below!";
  }

  chatbotBubble.onclick = () => {
    chatbotWindow.style.display = 'flex';
    chatbotBubble.style.display = 'none';
    // Show welcome message if chat is empty
    if (chatbotMessages.childElementCount === 0) {
      addMessage('Bot', "Hi! I'm Alex, Hajar's little bot. You can ask me about Hajar's skills, experience, education, or anything about her.");
    }
  };
  chatbotClose.onclick = () => {
    chatbotWindow.style.display = 'none';
    chatbotBubble.style.display = 'block';
  };

  function handleSend() {
    const userText = chatbotInput.value.trim();
    if (!userText) return;
    addMessage('You', userText);
    setTimeout(() => {
      addMessage('Bot', botReply(userText));
      // After first suggestion, show remaining suggestions under the answer
      if (suggestionsUsed || remainingSuggestions.length < suggestedQuestions.length) {
        renderSuggestions(true, userText);
        suggestionsUsed = false;
      }
    }, 400);
    chatbotInput.value = '';
  }

  chatbotSend.onclick = handleSend;
  chatbotInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleSend();
  });
}); 