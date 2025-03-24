document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Loading Animation
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // Add entrance animation to hero content after loader disappears
                document.querySelector('.hero-content').classList.add('animate__fadeIn');
            }, 500);
        }, 1500);
    }

    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#2563eb'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#2563eb',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Typing Effect
    const typed = new Typed('#typed-text', {
        strings: ['Full-Stack Developer', 'Mobile App Innovator', 'Python Developer', 'UI/UX Enthusiast'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 1000,
        loop: true,
        cursorChar: '|',
        smartBackspace: true
    });

    // Progress Bar on Scroll
    window.addEventListener('scroll', () => {
        const totalScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const scrolled = (scrollPosition / totalScroll) * 100;
        document.getElementById('progressBar').style.width = `${scrolled}%`;
    });

    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Nav Scroll Effect and Active Link Updater
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Navigation background effect on scroll
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
        
        // Also update particles color if they exist
        if (window.pJSDom && window.pJSDom[0]) {
            const particlesColor = theme === 'dark' ? '#60a5fa' : '#2563eb';
            window.pJSDom[0].pJS.particles.color.value = particlesColor;
            window.pJSDom[0].pJS.particles.line_linked.color = particlesColor;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    };

    // Set initial theme based on user preference
    if (localStorage.getItem('theme')) {
        setTheme(localStorage.getItem('theme'));
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Filtering with animations
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Reset animations
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    
                    // Add fade in animation with delay based on index
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Skill Level Animation
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const animateSkillLevels = () => {
        skillLevels.forEach(level => {
            const skillValue = level.getAttribute('data-level');
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.width = skillValue;
            }, 300);
        });
    };
    
    // Run skill animation when skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillLevels();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const step = target / 100;
        
        let count = 0;
        const updateCounter = () => {
            count += step;
            
            if (count < target) {
                counter.innerText = count.toFixed(1).replace(/\.0$/, '');
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    };
    
    // Run counter animation when statistics section comes into view
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => animateCounter(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(statsSection);
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const sliderContainer = document.querySelector('.testimonials-container');
    const sliderIndicators = document.querySelector('.slider-indicators');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0 && sliderContainer) {
        let currentIndex = 0;
        
        // Create slider indicators
        testimonials.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('slider-indicator');
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
            
            sliderIndicators.appendChild(indicator);
        });
        
        // Initialize slider controls
        const indicators = document.querySelectorAll('.slider-indicator');
        
        const goToSlide = (index) => {
            currentIndex = index;
            
            // Update active indicator
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
            
            // On mobile, show only the active slide
            if (window.innerWidth < 768) {
                testimonials.forEach((slide, i) => {
                    slide.style.display = i === index ? 'block' : 'none';
                });
            } else {
                // On desktop, update the slider view if needed
                testimonials.forEach(slide => {
                    slide.style.display = 'block';
                });
            }
        };
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                goToSlide(currentIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                goToSlide(currentIndex);
            });
        }
        
        // Auto slide for testimonials
        let autoSlideInterval;
        
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                goToSlide(currentIndex);
            }, 5000);
        };
        
        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };
        
        // Start auto slide
        startAutoSlide();
        
        // Pause auto slide on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Handle responsive layout
        window.addEventListener('resize', () => {
            goToSlide(currentIndex);
        });
        
        // Initial setup
        goToSlide(0);
    }

    // Contact Form Animation and Validation
    const contactForm = document.getElementById('contact-form');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Form input animations
    formInputs.forEach(input => {
        // Add animation when input is focused
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').classList.add('active');
        });
        
        // Keep animation if input has value, otherwise remove
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.querySelector('label').classList.remove('active');
            }
        });
        
        // Check if input already has value on page load
        if (input.value.trim() !== '') {
            input.parentElement.querySelector('label').classList.add('active');
        }
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Validate form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Add loading animation to button
            submitBtn.innerHTML = '<span class="btn-text">Sending</span><div class="btn-loader"></div>';
            submitBtn.disabled = true;

            try {
                emailjs.init("KnxXeCHFFLqtMxXum");

                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                };

                await emailjs.send(
                    'service_w6cynhr',
                    'template_tjgxi85',
                    templateParams
                );

                // Show success message with animation
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.style.opacity = '0';
                    group.style.transform = 'translateY(-20px)';
                });
                
                submitBtn.style.backgroundColor = '#10b981'; // Success color
                submitBtn.innerHTML = '<span class="btn-text">Message Sent!</span><span class="btn-icon"><i class="fas fa-check"></i></span>';
                
                setTimeout(() => {
                    // Reset form with animation
                    contactForm.reset();
                    formGroups.forEach(group => {
                        group.style.opacity = '1';
                        group.style.transform = 'translateY(0)';
                    });
                    submitBtn.style.backgroundColor = '';
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            } catch (error) {
                console.error('Error:', error);
                submitBtn.style.backgroundColor = '#ef4444'; // Error color
                submitBtn.innerHTML = '<span class="btn-text">Error! Try Again</span><span class="btn-icon"><i class="fas fa-exclamation-circle"></i></span>';
                
                setTimeout(() => {
                    submitBtn.style.backgroundColor = '';
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // Add hover animations for project and app cards
    projectCards = document.querySelectorAll('.project-card');
    const appCards = document.querySelectorAll('.app-card');
    
    // Project card animations
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-icons').style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-icons').style.transform = 'translateY(0)';
        });
    });
    
    // App card animations
    appCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.app-icon').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.app-icon').style.transform = 'scale(1)';
        });
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        }
        
        // Parallax for other elements if needed
        document.querySelectorAll('.parallax-bg').forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.2;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
});
