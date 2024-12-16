document.addEventListener('DOMContentLoaded', function() {
    // Logo animation elements
    const logo = document.querySelector('.logo');
    const logoIcon = document.querySelector('.logo-icon');
    const logoText = document.querySelector('.logo-text');
    const navbar = document.querySelector('.navbar');
    
    // Shopping cart state
    let cartItems = [];
    let cartTotal = 0;
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    const closeCart = document.querySelector('.close-cart');

    // Cart Event Listeners
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('open');
        updateCartDisplay();
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('open');
    });

    function addToCart(name, price, image = '') {
        cartItems.push({ name, price, image });
        cartTotal += price;
        updateCartUI();
        updateCartDisplay();
        showNotification(`${name} added to cart!`);
    }

    function updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    }

    function updateCartDisplay() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<i class="fas fa-bottle-droplet"></i>'}
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        if (totalAmount) {
            totalAmount.textContent = `$${cartTotal.toFixed(2)}`;
        }
    }

    // Remove item from cart
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.closest('.remove-item')) {
                const index = parseInt(e.target.closest('.remove-item').dataset.index);
                const removedItem = cartItems[index];
                cartTotal -= removedItem.price;
                cartItems.splice(index, 1);
                updateCartUI();
                updateCartDisplay();
                showNotification(`${removedItem.name} removed from cart!`);
            }
        });
    }

    // Checkout functionality
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartItems.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            showNotification('Thank you for your purchase!');
            cartItems = [];
            cartTotal = 0;
            updateCartUI();
            updateCartDisplay();
            setTimeout(() => {
                cartModal.classList.remove('open');
            }, 1500);
        });
    }

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (cartModal && cartModal.classList.contains('open') && 
            !cartModal.contains(e.target) && 
            !cartIcon.contains(e.target)) {
            cartModal.classList.remove('open');
        }
    });

    // Add to cart button listeners
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            if (card) {
                const name = card.querySelector('h3').textContent;
                const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
                const image = card.querySelector('img')?.src || '';
                addToCart(name, price, image);
            }
        });
    });

    // Spray animation function
    function createSprayParticle(startX, startY) {
        const particle = document.createElement('div');
        particle.className = 'spray-particle';
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        
        const angle = Math.random() * 30 - 15;
        const distance = 50 + Math.random() * 50;
        const duration = 0.5 + Math.random() * 0.5;
        
        particle.style.animation = `sprayParticle ${duration}s ease-out forwards`;
        particle.style.transform = `rotate(${angle}deg)`;
        
        return particle;
    }
    
    function sprayPerfume(e) {
        if (!logo) return;
        
        logo.classList.add('spraying');
        
        const iconRect = logoIcon.getBoundingClientRect();
        const startX = iconRect.right - navbar.offsetLeft;
        const startY = iconRect.top + iconRect.height/2 - navbar.offsetTop;
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = createSprayParticle(startX, startY);
                navbar.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 1000);
            }, i * 50);
        }
        
        logoText.classList.add('shimmer');
        
        setTimeout(() => {
            logo.classList.remove('spraying');
            logoText.classList.remove('shimmer');
        }, 1000);
    }
    
    if (logo) {
        logo.addEventListener('click', sprayPerfume);
    }

    // Mobile Menu Improvements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navLinks.classList.contains('open')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    // Close mobile menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Smooth Scrolling for Navigation Links
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

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            showNotification('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // Scroll-based Navbar Styling
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Initialize Animations for Sections
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.collection-section, .about-section, .contact-section')
        .forEach(section => observer.observe(section));

    // Search and Filter Functionality
    const searchInput = document.querySelector('#search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const perfumeCards = document.querySelectorAll('.perfume-card');

    function filterPerfumes() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

        perfumeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.dataset.category;
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;

            if (matchesSearch && matchesCategory) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        // Check if no results found
        const visibleCards = document.querySelectorAll('.perfume-card:not(.hidden)');
        const noResultsMsg = document.querySelector('.no-results');
        
        if (visibleCards.length === 0) {
            if (!noResultsMsg) {
                const message = document.createElement('p');
                message.className = 'no-results';
                message.textContent = 'No perfumes found matching your criteria';
                document.querySelector('.perfume-grid').appendChild(message);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Search input event listener
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterPerfumes, 300);
    });

    // Filter buttons event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            filterPerfumes();
        });
    });

    // Add smooth reveal animation to perfume cards
    const revealCards = () => {
        perfumeCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    };

    // Run reveal animation on page load
    revealCards();

    // Improved Testimonials Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    let currentSlide = 0;
    let isSliding = false;
    let isMobile = window.innerWidth <= 768;

    function updateSlider(animate = true) {
        if (!testimonialSlider || testimonials.length === 0) return;
        
        if (isMobile) {
            const currentCard = testimonials[currentSlide];
            currentCard.scrollIntoView({
                behavior: animate ? 'smooth' : 'auto',
                block: 'nearest',
                inline: 'center'
            });
        } else {
            const slideWidth = testimonials[0].offsetWidth;
            const offset = currentSlide * (slideWidth + 32); // 32px is the gap

            if (animate) {
                isSliding = true;
                testimonialSlider.style.transition = 'transform 0.3s ease-in-out';
                setTimeout(() => {
                    isSliding = false;
                }, 300);
            } else {
                testimonialSlider.style.transition = 'none';
            }

            testimonialSlider.style.transform = `translateX(-${offset}px)`;
        }

        // Update active states
        testimonials.forEach((card, index) => {
            if (index === currentSlide) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    if (prevBtn && nextBtn && testimonials.length > 0) {
        prevBtn.addEventListener('click', () => {
            if (isSliding || isMobile) return;
            currentSlide = Math.max(0, currentSlide - 1);
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            if (isSliding || isMobile) return;
            currentSlide = Math.min(testimonials.length - 1, currentSlide + 1);
            updateSlider();
        });
    }

    // Improved touch handling with scroll-snap
    if (testimonialSlider) {
        testimonialSlider.addEventListener('scroll', () => {
            if (!isMobile) return;
            
            const cards = [...testimonials];
            const center = testimonialSlider.offsetWidth / 2;
            
            // Find the card closest to the center
            const closest = cards.reduce((prev, curr) => {
                const prevBounds = prev.getBoundingClientRect();
                const currBounds = curr.getBoundingClientRect();
                const prevDistance = Math.abs(prevBounds.left + prevBounds.width / 2 - center);
                const currDistance = Math.abs(currBounds.left + currBounds.width / 2 - center);
                return currDistance < prevDistance ? curr : prev;
            });
            
            const newIndex = cards.indexOf(closest);
            if (newIndex !== currentSlide) {
                currentSlide = newIndex;
                testimonials.forEach((card, index) => {
                    if (index === currentSlide) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                });
            }
        }, { passive: true });
    }

    // Update slider on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            isMobile = window.innerWidth <= 768;
            updateSlider(false);
        }, 100);
    });

    // Initial setup
    updateSlider(false);

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const checkbox = this.querySelector('input[type="checkbox"]');
            
            if (!checkbox.checked) {
                showNotification('Please agree to receive marketing emails.');
                return;
            }

            // Simulate newsletter signup
            showNotification('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // User Authentication
    let currentUser = null;

    class AuthSystem {
        constructor() {
            this.currentTab = 'login';
            this.authModal = document.getElementById('authModal');
            this.loginForm = document.getElementById('loginForm');
            this.registerForm = document.getElementById('registerForm');
            this.notifications = new NotificationSystem();
            
            // Add login/register button handlers
            const loginBtn = document.getElementById('loginBtn');
            const registerBtn = document.getElementById('registerBtn');
            const closeBtn = document.querySelector('.close');
            
            if (loginBtn) {
                loginBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal('login');
                });
            }
            
            if (registerBtn) {
                registerBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal('register');
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal());
            }
            
            // Close modal on outside click
            this.authModal.addEventListener('click', (e) => {
                if (e.target === this.authModal) {
                    this.closeModal();
                }
            });
            
            this.initializeEventListeners();
        }

        openModal(tab = 'login') {
            this.authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.switchTab(tab);
        }

        closeModal() {
            this.authModal.classList.remove('active');
            document.body.style.overflow = '';
            this.resetForms();
        }

        switchTab(tab) {
            this.currentTab = tab;
            
            // Update tab buttons
            document.querySelectorAll('.auth-tab').forEach(t => {
                t.classList.toggle('active', t.dataset.tab === tab);
            });

            // Update forms
            this.loginForm.classList.toggle('active', tab === 'login');
            this.registerForm.classList.toggle('active', tab === 'register');
        }

        initializeEventListeners() {
            // Tab switching
            document.querySelectorAll('.auth-tab').forEach(tab => {
                tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
            });

            // Form submissions
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
            this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));

            // Password visibility toggle
            document.querySelectorAll('.toggle-password').forEach(toggle => {
                toggle.addEventListener('click', (e) => this.togglePasswordVisibility(e));
            });

            // Social auth
            document.querySelectorAll('.social-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.handleSocialAuth(e));
            });

            // Remember me functionality
            const rememberMe = document.getElementById('rememberMe');
            if (rememberMe) {
                rememberMe.checked = this.getRememberMeStatus();
            }
        }

        handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const rememberMe = this.getRememberMeStatus();

            // Enhanced email validation
            if (!this.validateEmail(email)) {
                this.showError('loginEmail', 'Please enter a valid email address');
                return;
            }

            // Password length check
            if (password.length < 8) {
                this.showError('loginPassword', 'Password must be at least 8 characters long');
                return;
            }

            // Simulated login with more robust error handling
            try {
                const loginData = { email, password, rememberMe };
                const response = this.simulateApiCall(loginData);

                if (response.success) {
                    this.notifications.show('Login successful!', 'success');
                    this.closeModal();
                    
                    // Optional: Store user session or token
                    if (rememberMe) {
                        localStorage.setItem('userEmail', email);
                    }
                } else {
                    this.notifications.show(response.message || 'Login failed. Please try again.', 'error');
                }
            } catch (error) {
                this.notifications.show('An unexpected error occurred. Please try again later.', 'error');
                console.error('Login error:', error);
            }
        }

        handleRegister(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAccepted = document.getElementById('termsAccept').checked;

            // Validation checks
            if (name.length < 2) {
                this.showError('registerName', 'Please enter a valid name');
                return;
            }

            if (!this.validateEmail(email)) {
                this.showError('registerEmail', 'Please enter a valid email address');
                return;
            }

            if (password.length < 8) {
                this.showError('registerPassword', 'Password must be at least 8 characters long');
                return;
            }

            // Password strength regex (at least one uppercase, one lowercase, one number)
            const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!passwordStrengthRegex.test(password)) {
                this.showError('registerPassword', 'Password must include uppercase, lowercase, and number');
                return;
            }

            if (password !== confirmPassword) {
                this.showError('confirmPassword', 'Passwords do not match');
                return;
            }

            if (!termsAccepted) {
                this.notifications.show('Please accept the Terms & Conditions', 'error');
                return;
            }

            // Simulated registration with error handling
            try {
                const registrationData = { name, email, password };
                const response = this.simulateApiCall(registrationData);

                if (response.success) {
                    this.notifications.show('Registration successful! Please log in.', 'success');
                    this.switchTab('login');
                } else {
                    this.notifications.show(response.message || 'Registration failed. Please try again.', 'error');
                }
            } catch (error) {
                this.notifications.show('An unexpected error occurred. Please try again later.', 'error');
                console.error('Registration error:', error);
            }
        }

        togglePasswordVisibility(e) {
            const button = e.currentTarget;
            const input = button.parentElement.querySelector('input');
            const icon = button.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        handleSocialAuth(e) {
            const provider = e.currentTarget.classList.contains('google') ? 'Google' : 'Facebook';
            
            try {
                // TODO: Implement actual social auth logic here
                this.simulateApiCall({ provider });
                
                this.closeModal();
                this.notifications.show(`Successfully logged in with ${provider}!`, 'success');
                
            } catch (error) {
                this.notifications.show(error.message, 'error');
            }
        }

        validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        getRememberMeStatus() {
            return localStorage.getItem('rememberMe') === 'true';
        }

        setRememberMeStatus(status) {
            localStorage.setItem('rememberMe', status);
        }

        resetForms() {
            this.loginForm.reset();
            this.registerForm.reset();
            document.querySelectorAll('.form-group.error').forEach(group => {
                group.classList.remove('error');
                const errorMessage = group.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        }

        // Simulate API call with more robust logic
        simulateApiCall(data) {
            // Simulate network delay
            const delay = Math.random() * 1000 + 500;
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Basic mock validation
                    if (data.email && data.password) {
                        resolve({
                            success: true,
                            message: 'Operation successful',
                            token: 'mock_token_' + Math.random().toString(36).substr(2, 9)
                        });
                    } else {
                        resolve({
                            success: false,
                            message: 'Invalid credentials'
                        });
                    }
                }, delay);
            });
        }

        showError(inputId, message) {
            const input = document.getElementById(inputId);
            const formGroup = input.closest('.form-group');
            
            formGroup.classList.add('error');
            
            let errorMessage = formGroup.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('span');
                errorMessage.className = 'error-message';
                formGroup.appendChild(errorMessage);
            }
            
            errorMessage.textContent = message;

            // Remove error after 3 seconds
            setTimeout(() => {
                formGroup.classList.remove('error');
                errorMessage.remove();
            }, 3000);
        }
    }

    class NotificationSystem {
        constructor() {
            this.init();
        }

        init() {
            // Create toast container if it doesn't exist
            if (!document.querySelector('.toast-container')) {
                const container = document.createElement('div');
                container.className = 'toast-container';
                document.body.appendChild(container);
            }
        }

        show(message, type = 'info') {
            const container = document.querySelector('.toast-container');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;

            // Icon based on type
            let icon = '';
            switch(type) {
                case 'success':
                    icon = 'fa-check-circle';
                    break;
                case 'error':
                    icon = 'fa-exclamation-circle';
                    break;
                default:
                    icon = 'fa-info-circle';
            }

            toast.innerHTML = `
                <i class="fas ${icon}"></i>
                <span class="toast-message">${message}</span>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
            `;

            container.appendChild(toast);

            // Add show class after a small delay for animation
            setTimeout(() => toast.classList.add('show'), 10);

            // Close button functionality
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.close(toast));

            // Auto close after 5 seconds
            setTimeout(() => this.close(toast), 5000);
        }

        close(toast) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300); // Wait for animation
        }
    }

    const authSystem = new AuthSystem();

    // Fragrance Quiz
    const quizData = [
        {
            question: "What type of scents do you typically prefer?",
            options: ["Floral", "Woody", "Fresh", "Oriental"]
        },
        {
            question: "When do you usually wear perfume?",
            options: ["Day", "Night", "Special occasions", "All the time"]
        },
        {
            question: "How strong do you like your fragrances?",
            options: ["Light", "Moderate", "Strong", "Very strong"]
        }
    ];

    let currentQuestion = 0;
    let quizAnswers = [];

    function startQuiz() {
        const quizStart = document.querySelector('.quiz-start');
        const quizQuestions = document.querySelector('.quiz-questions');
        quizStart.style.display = 'none';
        quizQuestions.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const quizQuestions = document.querySelector('.quiz-questions');
        const question = quizData[currentQuestion];
        
        const html = `
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map(option => `
                    <button onclick="selectAnswer('${option}')">${option}</button>
                `).join('')}
            </div>
        `;
        
        quizQuestions.innerHTML = html;
    }

    function selectAnswer(answer) {
        quizAnswers.push(answer);
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showQuizResults();
        }
    }

    function showQuizResults() {
        const quizQuestions = document.querySelector('.quiz-questions');
        // Add logic to recommend perfumes based on answers
        const recommendations = getRecommendations(quizAnswers);
        
        const html = `
            <h3>Your Perfect Scents</h3>
            <div class="recommendations">
                ${recommendations.map(rec => `
                    <div class="recommendation">
                        <img src="${rec.image}" alt="${rec.name}">
                        <h4>${rec.name}</h4>
                        <p>${rec.description}</p>
                        <button onclick="addToCart('${rec.name}', ${rec.price})">Add to Cart</button>
                    </div>
                `).join('')}
            </div>
        `;
        
        quizQuestions.innerHTML = html;
    }

    // Scent Dictionary
    const scentNotes = {
        top: [
            { name: 'Bergamot', description: 'Citrusy and bright' },
            { name: 'Lemon', description: 'Fresh and zesty' }
        ],
        heart: [
            { name: 'Rose', description: 'Floral and romantic' },
            { name: 'Jasmine', description: 'Sweet and intense' }
        ],
        base: [
            { name: 'Vanilla', description: 'Warm and sweet' },
            { name: 'Musk', description: 'Warm and sensual' }
        ]
    };

    function initializeScentDictionary() {
        Object.entries(scentNotes).forEach(([category, notes]) => {
            const grid = document.querySelector(`[data-category="${category}"] .note-grid`);
            notes.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.className = 'note-card';
                noteElement.innerHTML = `
                    <h4>${note.name}</h4>
                    <p>${note.description}</p>
                `;
                grid.appendChild(noteElement);
            });
        });
    }

    // Event Listeners
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
    
    initializeScentDictionary();
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authSystem.closeModal();
        }
    });
    
    // Handle login form submission
    document.getElementById('loginForm').querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add login logic here
        currentUser = { name: 'Test User' }; // Mock login
        authSystem.closeModal();
    });
    
    // Handle register form submission
    document.getElementById('registerForm').querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add registration logic here
        currentUser = { name: 'New User' }; // Mock registration
        authSystem.closeModal();
    });
    
    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        currentUser = null;
    });

    // AR Visualization Feature
    class ARVisualizer {
        constructor() {
            this.isARSupported = 'xr' in navigator;
            this.session = null;
        }

        async initialize() {
            if (!this.isARSupported) {
                throw new Error('AR is not supported in this browser');
            }

            const supported = await navigator.xr.isSessionSupported('immersive-ar');
            if (!supported) {
                throw new Error('Immersive AR not supported');
            }
        }

        async startARSession(bottleModel) {
            try {
                this.session = await navigator.xr.requestSession('immersive-ar', {
                    requiredFeatures: ['hit-test']
                });
                
                // Set up AR scene (using Three.js or A-Frame)
                await this.setupARScene(bottleModel);
            } catch (error) {
                console.error('Failed to start AR session:', error);
            }
        }

        async setupARScene(bottleModel) {
            // AR scene setup code would go here
            console.log('Setting up AR scene with model:', bottleModel);
        }
    }

    // Sample Sets Feature
    class SampleSets {
        constructor() {
            this.availableSets = [
                {
                    id: 'floral-set',
                    name: 'Floral Collection',
                    perfumes: [
                        { name: 'Rose Garden', size: '2ml', price: 15 },
                        { name: 'Jasmine Dreams', size: '2ml', price: 15 },
                        { name: 'Lily Valley', size: '2ml', price: 15 }
                    ],
                    price: 39.99
                },
                {
                    id: 'woody-set',
                    name: 'Woody Collection',
                    perfumes: [
                        { name: 'Cedar Essence', size: '2ml', price: 15 },
                        { name: 'Sandalwood Mist', size: '2ml', price: 15 },
                        { name: 'Oud Magic', size: '2ml', price: 15 }
                    ],
                    price: 39.99
                }
            ];
        }

        createSampleSetUI(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const html = `
                <div class="sample-sets">
                    ${this.availableSets.map(set => `
                        <div class="sample-set-card">
                            <h3>${set.name}</h3>
                            <ul>
                                ${set.perfumes.map(perfume => `
                                    <li>${perfume.name} (${perfume.size})</li>
                                `).join('')}
                            </ul>
                            <p class="price">$${set.price}</p>
                            <button onclick="sampleSets.addSetToCart('${set.id}')">
                                Add Set to Cart
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
            container.innerHTML = html;
        }

        addSetToCart(setId) {
            const set = this.availableSets.find(s => s.id === setId);
            if (set) {
                addToCart(set.name, set.price);
                showNotification(`${set.name} sample set added to cart!`);
            }
        }
    }

    // Review System
    class ReviewSystem {
        constructor() {
            this.reviews = new Map();
        }

        addReview(productId, review) {
            if (!this.reviews.has(productId)) {
                this.reviews.set(productId, []);
            }
            const reviewObj = {
                ...review,
                id: Date.now(),
                date: new Date().toISOString(),
                likes: 0
            };
            this.reviews.get(productId).push(reviewObj);
            this.updateReviewsUI(productId);
            return reviewObj;
        }

        likeReview(productId, reviewId) {
            const productReviews = this.reviews.get(productId);
            const review = productReviews.find(r => r.id === reviewId);
            if (review) {
                review.likes++;
                this.updateReviewsUI(productId);
            }
        }

        calculateAverageRating(productId) {
            const productReviews = this.reviews.get(productId) || [];
            if (productReviews.length === 0) return 0;
            
            const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
            return (sum / productReviews.length).toFixed(1);
        }

        updateReviewsUI(productId) {
            const container = document.querySelector(`[data-product-reviews="${productId}"]`);
            if (!container) return;

            const reviews = this.reviews.get(productId) || [];
            const averageRating = this.calculateAverageRating(productId);

            const html = `
                <div class="reviews-summary">
                    <div class="average-rating">${averageRating}</div>
                    <div class="total-reviews">${reviews.length} reviews</div>
                </div>
                <div class="reviews-list">
                    ${reviews.map(review => `
                        <div class="review-card">
                            <div class="review-header">
                                <span class="reviewer-name">${review.userName}</span>
                                <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                            <p class="review-text">${review.text}</p>
                            <div class="review-footer">
                                <button onclick="reviewSystem.likeReview('${productId}', ${review.id})">
                                    👍 ${review.likes}
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            container.innerHTML = html;
        }
    }

    // Dictionary System
    class FragranceDictionary {
        constructor() {
            this.currentTab = 'families';
            this.data = {
                families: [
                    {
                        name: 'Floral',
                        description: 'Romantic and feminine scents derived from flowers',
                        examples: ['Rose', 'Jasmine', 'Lily', 'Peony', 'Violet']
                    },
                    {
                        name: 'Oriental',
                        description: 'Warm and sensual fragrances with exotic spices',
                        examples: ['Vanilla', 'Amber', 'Musk', 'Incense', 'Cinnamon']
                    },
                    {
                        name: 'Woody',
                        description: 'Rich and sophisticated scents from trees and wood',
                        examples: ['Sandalwood', 'Cedar', 'Vetiver', 'Patchouli', 'Oud']
                    },
                    {
                        name: 'Fresh',
                        description: 'Clean and invigorating scents inspired by nature',
                        examples: ['Citrus', 'Marine', 'Green', 'Aquatic', 'Herbal']
                    }
                ],
                notes: {
                    top: [
                        { name: 'Bergamot', description: 'Citrusy and bright', intensity: 'Light' },
                        { name: 'Lemon', description: 'Fresh and zesty', intensity: 'Medium' },
                        { name: 'Orange', description: 'Sweet and citrusy', intensity: 'Medium' }
                    ],
                    heart: [
                        { name: 'Rose', description: 'Floral and romantic', intensity: 'Strong' },
                        { name: 'Jasmine', description: 'Sweet and intense', intensity: 'Very Strong' },
                        { name: 'Lavender', description: 'Herbal and calming', intensity: 'Medium' }
                    ],
                    base: [
                        { name: 'Vanilla', description: 'Sweet and warm', intensity: 'Strong' },
                        { name: 'Musk', description: 'Warm and sensual', intensity: 'Very Strong' },
                        { name: 'Sandalwood', description: 'Woody and creamy', intensity: 'Strong' }
                    ]
                },
                terms: [
                    { term: 'Sillage', definition: 'The trail of scent left behind by a perfume' },
                    { term: 'Accord', definition: 'A blend of notes that create a new, distinct smell' },
                    { term: 'Dry Down', definition: 'The final phase of a perfume\'s development on the skin' }
                ]
            };

            this.initializeEventListeners();
            this.showTab('families');
        }

        initializeEventListeners() {
            const tabs = document.querySelectorAll('.dict-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    this.showTab(tab.dataset.category);
                });
            });
        }

        showTab(category) {
            // Update active tab
            document.querySelectorAll('.dict-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.category === category);
            });

            // Update content
            document.querySelectorAll('.dict-section').forEach(section => {
                section.classList.toggle('active', section.classList.contains(category));
            });

            // Load content if needed
            this.loadContent(category);
        }

        loadContent(category) {
            switch(category) {
                case 'families':
                    this.loadFamilies();
                    break;
                case 'notes':
                    this.loadNotes();
                    break;
                case 'terms':
                    this.loadTerms();
                    break;
            }
        }

        loadFamilies() {
            const container = document.querySelector('.scent-families');
            if (!container) return;

            container.innerHTML = this.data.families.map(family => `
                <div class="scent-family">
                    <h3>${family.name}</h3>
                    <p>${family.description}</p>
                    <ul class="scent-examples">
                        ${family.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
        }

        loadNotes() {
            const container = document.querySelector('.note-layers');
            if (!container) return;

            container.innerHTML = Object.entries(this.data.notes).map(([layer, notes]) => `
                <div class="note-layer">
                    <h3>${layer.charAt(0).toUpperCase() + layer.slice(1)} Notes</h3>
                    <div class="note-grid">
                        ${notes.map(note => `
                            <div class="note-card">
                                <h4>${note.name}</h4>
                                <p>${note.description}</p>
                                <span class="intensity">${note.intensity}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        loadTerms() {
            const container = document.querySelector('.dictionary-content');
            if (!container) return;

            const termsHtml = `
                <div class="dict-section terms">
                    <div class="terms-list">
                        ${this.data.terms.map(term => `
                            <div class="term-card">
                                <h3>${term.term}</h3>
                                <p>${term.definition}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            container.innerHTML = termsHtml;
        }
    }

    // Community System
    class CommunitySystem {
        constructor() {
            this.currentTab = 'discussions';
            this.discussions = [];
            this.reviews = [];
            this.articles = [];

            this.initializeEventListeners();
            this.loadInitialData();
        }

        initializeEventListeners() {
            const tabs = document.querySelectorAll('.community-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    this.switchTab(tab.dataset.tab);
                });
            });

            const newDiscussionBtn = document.querySelector('.new-discussion-btn');
            if (newDiscussionBtn) {
                newDiscussionBtn.addEventListener('click', () => this.showNewDiscussionForm());
            }

            const topicFilter = document.querySelector('.topic-filter');
            if (topicFilter) {
                topicFilter.addEventListener('change', (e) => this.filterDiscussions(e.target.value));
            }
        }

        async loadInitialData() {
            // Mock data loading
            this.discussions = [
                {
                    id: 1,
                    title: 'Best Summer Fragrances 2024',
                    author: 'FragranceLover',
                    date: new Date('2024-01-15'),
                    replies: 23,
                    views: 156,
                    topic: 'recommendations'
                },
                {
                    id: 2,
                    title: 'How to Make Perfume Last Longer?',
                    author: 'ScentExpert',
                    date: new Date('2024-01-14'),
                    replies: 45,
                    views: 289,
                    topic: 'questions'
                }
            ];

            this.updateDiscussionsList();
        }

        switchTab(tab) {
            document.querySelectorAll('.community-tab').forEach(t => {
                t.classList.toggle('active', t.dataset.tab === tab);
            });

            document.querySelectorAll('.community-tab-content').forEach(content => {
                content.classList.toggle('active', content.classList.contains(tab));
            });

            this.currentTab = tab;
            this.loadTabContent(tab);
        }

        loadTabContent(tab) {
            switch(tab) {
                case 'discussions':
                    this.updateDiscussionsList();
                    break;
                case 'reviews':
                    this.loadReviews();
                    break;
                case 'articles':
                    this.loadArticles();
                    break;
            }
        }

        updateDiscussionsList(filter = 'all') {
            const container = document.querySelector('.discussions-list');
            if (!container) return;

            const filteredDiscussions = filter === 'all' 
                ? this.discussions 
                : this.discussions.filter(d => d.topic === filter);

            container.innerHTML = `
                ${filteredDiscussions.map(discussion => `
                    <div class="discussion-card">
                        <div class="discussion-main">
                            <h3>${discussion.title}</h3>
                            <div class="discussion-meta">
                                <span class="author">By ${discussion.author}</span>
                                <span class="date">${discussion.date.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="discussion-stats">
                            <span class="replies">${discussion.replies} replies</span>
                            <span class="views">${discussion.views} views</span>
                        </div>
                    </div>
                `).join('')}
            `;
        }

        showNewDiscussionForm() {
            // Implementation for new discussion form
            console.log('Show new discussion form');
        }

        filterDiscussions(topic) {
            this.updateDiscussionsList(topic);
        }
    }

    // Initialize new systems
    const dictionarySystem = new FragranceDictionary();
    const communitySystem = new CommunitySystem();

    // Initialize Sample Sets
    const sampleSets = new SampleSets();
    sampleSets.createSampleSetUI('sample-sets-container');

    // Initialize AR features if supported
    try {
        const arVisualizer = new ARVisualizer();
        arVisualizer.initialize().then(() => {
            console.log('AR features initialized');
        }).catch(error => {
            console.log('AR initialization failed:', error);
        });
    } catch (error) {
        console.log('AR not supported:', error);
    }

    // Add review form submission handler
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productId = reviewForm.dataset.productId;
            const review = {
                userName: currentUser?.name || 'Anonymous',
                rating: parseInt(reviewForm.querySelector('[name="rating"]').value),
                text: reviewForm.querySelector('[name="review-text"]').value
            };
            const reviewSystem = new ReviewSystem();
            reviewSystem.addReview(productId, review);
            reviewForm.reset();
        });
    }

    // Initialize Auth System
    const newsletter = new NewsletterSystem();
    const scentQuiz = new ScentQuizSystem();
    const reviews = new ReviewsSystem();

    // Panel/Modal System
    class PanelSystem {
        constructor() {
            this.currentPanel = null;
            this.panels = new Map();
            this.init();
        }

        init() {
            // Initialize all panels
            document.querySelectorAll('[data-panel]').forEach(panel => {
                const panelId = panel.getAttribute('data-panel');
                this.panels.set(panelId, {
                    element: panel,
                    isOpen: false,
                    trigger: document.querySelector(`[data-panel-trigger="${panelId}"]`)
                });

                // Add click event to panel triggers
                const trigger = document.querySelector(`[data-panel-trigger="${panelId}"]`);
                if (trigger) {
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.togglePanel(panelId);
                    });
                }

                // Add close button functionality
                const closeBtn = panel.querySelector('.panel-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => this.closePanel(panelId));
                }
            });

            // Close panel when clicking outside
            document.addEventListener('click', (e) => {
                if (this.currentPanel && !e.target.closest('[data-panel]') && 
                    !e.target.closest('[data-panel-trigger]')) {
                    this.closePanel(this.currentPanel);
                }
            });

            // Close panel on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.currentPanel) {
                    this.closePanel(this.currentPanel);
                }
            });
        }

        togglePanel(panelId) {
            const panel = this.panels.get(panelId);
            if (!panel) return;

            if (panel.isOpen) {
                this.closePanel(panelId);
            } else {
                this.openPanel(panelId);
            }
        }

        openPanel(panelId) {
            // Close current panel if one is open
            if (this.currentPanel) {
                this.closePanel(this.currentPanel);
            }

            const panel = this.panels.get(panelId);
            if (!panel) return;

            panel.element.classList.add('panel-open');
            panel.isOpen = true;
            this.currentPanel = panelId;

            // Add overlay
            this.addOverlay();

            // Trigger open animation
            requestAnimationFrame(() => {
                panel.element.classList.add('panel-animate-in');
            });
        }

        closePanel(panelId) {
            const panel = this.panels.get(panelId);
            if (!panel) return;

            panel.element.classList.remove('panel-animate-in');
            panel.element.classList.add('panel-animate-out');

            // Remove overlay
            this.removeOverlay();

            // Wait for animation to complete
            setTimeout(() => {
                panel.element.classList.remove('panel-open', 'panel-animate-out');
                panel.isOpen = false;
                if (this.currentPanel === panelId) {
                    this.currentPanel = null;
                }
            }, 300);
        }

        addOverlay() {
            if (!document.querySelector('.panel-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'panel-overlay';
                document.body.appendChild(overlay);

                // Fade in overlay
                requestAnimationFrame(() => {
                    overlay.classList.add('panel-overlay-visible');
                });
            }
        }

        removeOverlay() {
            const overlay = document.querySelector('.panel-overlay');
            if (overlay) {
                overlay.classList.remove('panel-overlay-visible');
                setTimeout(() => overlay.remove(), 300);
            }
        }
    }

    // Initialize panel system
    const panelSystem = new PanelSystem();
});