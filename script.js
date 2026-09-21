document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const animatedSections = document.querySelectorAll('.section-content-to-animate');

const sectionObserverOptions = {
    threshold: 0.2
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

const skillCards = document.querySelectorAll('.skills-in-about li');
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

const projectCards = document.querySelectorAll('.project-card');
const projectObserverOptions = {
    threshold: 0.1
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, projectObserverOptions);

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    projectObserver.observe(card);
});

const companyItems = document.querySelectorAll('.company-item');
const jobDetails = document.querySelectorAll('.job-details');

companyItems.forEach(item => {
    item.addEventListener('click', function() {
        companyItems.forEach(c => c.classList.remove('active'));
        jobDetails.forEach(j => j.classList.remove('active'));

        this.classList.add('active');

        const targetId = this.dataset.target;
        document.getElementById(targetId).classList.add('active');
    });
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    } else {
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
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

// Contact form submission (Formspree)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                } else {
                    alert('Failed to send message. Please try again.');
                }
            } catch (err) {
                alert('Failed to send message. Please check your connection and try again.');
            }
        });
    }
});
