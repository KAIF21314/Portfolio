// Typed Roles Configuration
const roles = [ "Tech Enthusiast" , "Social Media Manager", "Frontend Developer", "Web Designer",];
let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typedElement;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typed roles
    typedElement = document.getElementById('typed-roles');
    if (typedElement) {
        typeRole();
    }
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize scrollspy
    initScrollspy();
    
    // Initialize reveal animations
    initRevealAnimations();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize project modals
    initProjectModals();
    
    // Initialize tooltips
    initTooltips();
    
    // Set current year
    setCurrentYear();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
});

// Typed Roles Animation
function typeRole() {
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        } else {
            setTimeout(typeRole, 50);
        }
    } else {
        typedElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, 2000);
        } else {
            setTimeout(typeRole, 100);
        }
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Scrollspy - Update Active Navigation Link
function initScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Call once on load
}

// Reveal Animations with Intersection Observer
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-stagger');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal-stagger')) {
                    // Add staggered delay for stagger elements
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 100);
                } else {
                    entry.target.classList.add('revealed');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successToast = new bootstrap.Toast(document.getElementById('successToast'));
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Validate form
        let isValid = true;
        
        // Remove previous validation classes
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
        });
        
        // Validate name
        if (!nameInput.value.trim()) {
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameInput.classList.add('is-valid');
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.add('is-valid');
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            messageInput.classList.add('is-invalid');
            isValid = false;
        } else {
            messageInput.classList.add('is-valid');
        }
        
        // If form is valid, show success message and clear form
        if (isValid) {
            successToast.show();
            contactForm.reset();
            [nameInput, emailInput, messageInput].forEach(input => {
                input.classList.remove('is-valid');
            });
        }
    });
}

// Project Modal Content
function initProjectModals() {
    const projectData = {
        ecommerce: {
            title: "E-Commerce Platform",
            content: `
                <h6 class="fw-bold mb-3">Project Overview</h6>
                <p>A comprehensive e-commerce solution built with modern web technologies, featuring a complete shopping experience from product browsing to checkout.</p>
                
                <h6 class="fw-bold mb-2">Key Features</h6>
                <ul>
                    <li>Responsive product catalog with search and filtering</li>
                    <li>Shopping cart with real-time updates</li>
                    <li>User authentication and profile management</li>
                    <li>Secure checkout process with payment integration</li>
                    <li>Admin dashboard for inventory management</li>
                    <li>Order tracking and history</li>
                </ul>
                
                <h6 class="fw-bold mb-2">Technologies Used</h6>
                <div class="mb-3">
                    <span class="badge bg-primary me-1">HTML5</span>
                    <span class="badge bg-primary me-1">CSS3</span>
                    <span class="badge bg-accent me-1">JavaScript</span>
                    <span class="badge bg-primary me-1">Bootstrap</span>
                    <span class="badge bg-accent">Local Storage</span>
                </div>
            `
        },
        weather: {
            title: "Weather Dashboard",
            content: `
                <h6 class="fw-bold mb-3">Project Overview</h6>
                <p>A modern weather application that provides real-time weather information and forecasts with an intuitive, responsive interface.</p>
                
                <h6 class="fw-bold mb-2">Key Features</h6>
                <ul>
                    <li>Current weather conditions with location detection</li>
                    <li>5-day weather forecast with hourly breakdowns</li>
                    <li>Interactive weather maps and radar</li>
                    <li>Search functionality for worldwide locations</li>
                    <li>Weather alerts and notifications</li>
                    <li>Favorite locations for quick access</li>
                </ul>
                
                <h6 class="fw-bold mb-2">Technologies Used</h6>
                <div class="mb-3">
                    <span class="badge bg-accent me-1">JavaScript ES6+</span>
                    <span class="badge bg-primary me-1">Weather API</span>
                    <span class="badge bg-accent me-1">Chart.js</span>
                    <span class="badge bg-primary me-1">Bootstrap</span>
                    <span class="badge bg-accent">Geolocation API</span>
                </div>
            `
        },
        tasks: {
            title: "Task Management App",
            content: `
                <h6 class="fw-bold mb-3">Project Overview</h6>
                <p>A productivity-focused task management application with drag-and-drop functionality, designed to help users organize and track their daily activities efficiently.</p>
                
                <h6 class="fw-bold mb-2">Key Features</h6>
                <ul>
                    <li>Drag-and-drop task organization</li>
                    <li>Multiple project categories and labels</li>
                    <li>Progress tracking with visual indicators</li>
                    <li>Due date reminders and notifications</li>
                    <li>Task priority levels and filtering</li>
                    <li>Data persistence with local storage</li>
                </ul>
                
                <h6 class="fw-bold mb-2">Technologies Used</h6>
                <div class="mb-3">
                    <span class="badge bg-accent me-1">Vanilla JavaScript</span>
                    <span class="badge bg-primary me-1">CSS Grid & Flexbox</span>
                    <span class="badge bg-accent me-1">Drag & Drop API</span>
                    <span class="badge bg-primary me-1">Local Storage</span>
                    <span class="badge bg-accent">CSS Animations</span>
                </div>
            `
        }
    };
    
    // Handle modal trigger buttons
    document.querySelectorAll('[data-bs-toggle="modal"][data-project]').forEach(button => {
        button.addEventListener('click', function() {
            const projectKey = this.dataset.project;
            const projectInfo = projectData[projectKey];
            
            if (projectInfo) {
                document.getElementById('modalTitle').textContent = projectInfo.title;
                document.getElementById('modalBody').innerHTML = projectInfo.content;
            }
        });
    });
}

// Initialize Bootstrap Tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Set Current Year in Footer
function setCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Call once on load
}

// Animate Progress Bars when they come into view
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Initialize progress bar animations
document.addEventListener('DOMContentLoaded', initProgressBars);

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Close mobile menu on resize to larger screens
    if (window.innerWidth > 991) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 100);
            });
        }
    });
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'assets/profile.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on DOM ready
document.addEventListener('DOMContentLoaded', preloadImages);
