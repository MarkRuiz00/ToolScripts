document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       Navigation & Mobile Menu
       ========================================= */
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.click();
            }
        });
    });

    /* =========================================
       Scroll Reveal Animation
       ========================================= */
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load

    /* =========================================
       Copy Loadstring Functionality
       ========================================= */
    const copyBtns = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const scriptStr = btn.getAttribute('data-script') || "loadstring(game:HttpGet('https://raw.githubusercontent.com/...'))()";
            
            navigator.clipboard.writeText(scriptStr).then(() => {
                showToast();
                
                // Button visual feedback
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.style.background = '#10b981';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    /* =========================================
       Particle Effect Background
       ========================================= */
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        
        // Random opacity based on pure CSS or inline
        const opacity = Math.random() * 0.4 + 0.1;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        // Styling the particle
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = '#ee2c85'; // Accent color
        particle.style.borderRadius = '50%';
        particle.style.top = `${posY}%`;
        particle.style.left = `${posX}%`;
        particle.style.opacity = opacity;
        particle.style.boxShadow = `0 0 ${size * 2}px #ee2c85`;
        particle.style.pointerEvents = 'none';

        // Apply upward animation
        // Using inline Web Animations API instead of CSS for simplicity in random params
        particle.animate([
            { transform: `translate(0, 0)`, opacity: 0 },
            { opacity: opacity, offset: 0.1 },
            { opacity: opacity, offset: 0.9 },
            { transform: `translate(${(Math.random() - 0.5) * 100}px, -${100 + Math.random() * 100}vh)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            easing: 'linear'
        });

        particlesContainer.appendChild(particle);
    }
    
    /* =========================================
       Mockup Menu Interaction (Visual only)
       ========================================= */
    const menuItems = document.querySelectorAll('.mockup-menu li');
    if(menuItems) {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuItems.forEach(li => li.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    /* =========================================
       Feature Tabs
       ========================================= */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const featureCards = document.querySelectorAll('.feature-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all tabs
            tabBtns.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.textContent.toLowerCase();
            
            // Simple animation for cards
            featureCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const desc = card.querySelector('p').textContent.toLowerCase();
                    
                    if (filter === 'all' || title.includes(filter) || desc.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300); // Wait for fade out
            });
        });
    });
});
