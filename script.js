// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Handling - Join Form
const joinForm = document.getElementById('joinForm');
if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(joinForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.role || !data.motivation) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        console.log('Join Form Submission:', data);
        
        // Show success message
        alert('Thank you for your interest! We will contact you soon.');
        
        // Reset form
        joinForm.reset();
    });
}

// Form Handling - Sponsor Form
const sponsorForm = document.getElementById('sponsorForm');
if (sponsorForm) {
    sponsorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(sponsorForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data['sponsor-name'] || !data['sponsor-email'] || !data['sponsor-message']) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data['sponsor-email'])) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        console.log('Sponsor Form Submission:', data);
        
        // Show success message
        alert('Thank you for your sponsorship inquiry! We will get back to you soon.');
        
        // Reset form
        sponsorForm.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .team-member, .role-card, .sponsor-card, .value-card, .benefit-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Carousel functionality with continuous smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    if (!carouselTrack || !carouselWrapper) return;
    
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const originalSlides = 5; // Original number of slides (before duplicates)
    
    if (slides.length === 0) return;
    
    // Get slides per view based on screen size
    function getSlidesPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }
    
    let slidesPerView = getSlidesPerView();
    let position = 0;
    let animationId = null;
    let isPaused = false;
    const speed = 0.5; // pixels per frame (adjust for speed)
    
    // Calculate slide width
    function getSlideWidth() {
        const containerWidth = carouselWrapper.offsetWidth;
        const gap = 10;
        return (containerWidth - (gap * (slidesPerView - 1))) / slidesPerView;
    }
    
    // Continuous animation function
    function animate() {
        if (isPaused) {
            animationId = requestAnimationFrame(animate);
            return;
        }
        
        const slideWidth = getSlideWidth();
        const gap = 10;
        const totalWidth = (slideWidth + gap) * originalSlides;
        
        // Move position continuously
        position -= speed;
        
        // Reset position when we've moved one full set of slides
        if (Math.abs(position) >= totalWidth) {
            position = 0;
        }
        
        carouselTrack.style.transform = `translateX(${position}px)`;
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            slidesPerView = getSlidesPerView();
        }, 250);
    });
    
    // Pause on hover
    carouselWrapper.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    carouselWrapper.addEventListener('mouseleave', () => {
        isPaused = false;
    });
    
    // Start continuous animation
    carouselTrack.style.transition = 'none';
    animate();
});
