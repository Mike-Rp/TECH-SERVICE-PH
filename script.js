document.addEventListener('DOMContentLoaded', function() {
    
    const scrollTopBtn = document.getElementById('scrollTop');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const galleryItems = document.querySelectorAll('.gallery-item.hidden');
    const contactForm = document.getElementById('contactForm');
    const fadeInElements = document.querySelectorAll('.fade-in');
    const notification = document.getElementById('notification');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    let galleryExpanded = false;
    viewMoreBtn.addEventListener('click', function() {
        if (!galleryExpanded) {
            galleryItems.forEach(item => {
                item.classList.remove('hidden');
                item.classList.add('show');
            });
            this.textContent = 'View Less';
            galleryExpanded = true;
        } else {
            galleryItems.forEach(item => {
                item.classList.remove('show');
                item.classList.add('hidden');
            });
            this.textContent = 'View More';
            galleryExpanded = false;
            
            document.querySelector('#gallery').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    const galleryImageItems = document.querySelectorAll('.gallery-item');
    galleryImageItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const modal = document.createElement('div');
            modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:pointer;';
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = 'max-width:90%;max-height:90%;border-radius:10px;';
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });

    function showNotification() {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            const mailtoLink = `mailto:Techservicing05@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
            
            window.location.href = mailtoLink;
            
            showNotification();
            
            contactForm.reset();
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    const carousel = document.getElementById('reviewsCarousel');
    const allReviews = Array.from(carousel.querySelectorAll('.review-card'));
    
    allReviews.forEach(review => {
        const clone = review.cloneNode(true);
        carousel.appendChild(clone);
    });
});