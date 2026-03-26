/**
 * Header Module
 */

// DOM Elements
const header = document.getElementById('header');
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const nav = document.getElementById('nav');

// Modals
const modalSignin = document.getElementById('modalSignin');
const modalSignup = document.getElementById('modalSignup');
const formSignin = document.getElementById('formSignin');
const formSignup = document.getElementById('formSignup');

// Auth buttons
const authBtns = document.querySelectorAll('.header__auth-btn');
const switchToSignup = document.querySelectorAll('[data-modal-switch="signup"]');
const switchToSignin = document.querySelectorAll('[data-modal-switch="signin"]');
const closeButtons = document.querySelectorAll('[data-modal-close]');

// Mobile menu links
const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu__link') : [];

// ===================================
// Mobile Menu
// ===================================

const toggleMenu = () => {
    const isOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
    
    if (isOpen) {
        burgerBtn.classList.remove('header__burger--active');
        mobileMenu.classList.remove('header__mobile-menu--active');
        burgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    } else {
        burgerBtn.classList.add('header__burger--active');
        mobileMenu.classList.add('header__mobile-menu--active');
        burgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
};

const closeMenu = () => {
    burgerBtn.classList.remove('header__burger--active');
    mobileMenu.classList.remove('header__mobile-menu--active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
};

// ===================================
// Auth Buttons
// ===================================

const updateAuthButtons = (type) => {
    authBtns.forEach(btn => {
        if (btn.dataset.authType === type) {
            btn.classList.add('header__auth-btn--active');
        } else {
            btn.classList.remove('header__auth-btn--active');
        }
    });
};

// ===================================
// Modal
// ===================================

const openModal = (type) => {
    // Close all first
    modalSignin.classList.remove('modal--visible');
    modalSignup.classList.remove('modal--visible');
    
    // Update button states
    updateAuthButtons(type);
    
    // Open target modal with delay for smooth transition
    const modal = type === 'signin' ? modalSignin : modalSignup;
    
    // Small delay for smooth animation
    setTimeout(() => {
        modal.classList.add('modal--visible');
    }, 10);
    
    document.body.style.overflow = 'hidden';
    
    const firstInput = modal.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 300);
    }
};

const closeModal = () => {
    modalSignin.classList.remove('modal--visible');
    modalSignup.classList.remove('modal--visible');
    document.body.style.overflow = '';
};

// ===================================
// Notification
// ===================================

const showNotification = (message, type = 'info') => {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// ===================================
// Smooth Scroll
// ===================================

const handleSmoothScroll = (event) => {
    const href = event.currentTarget.getAttribute('href');
    if (!href || href === '#' || !href.startsWith('#')) return;
    
    const target = document.querySelector(href);
    if (target) {
        event.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        closeMenu();
    }
};

// ===================================
// Event Listeners
// ===================================

const init = () => {
    // Burger
    burgerBtn.addEventListener('click', toggleMenu);
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
            const isOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
            if (isOpen) closeMenu();
        }
    });
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            closeModal();
        }
    });
    
    // Auth buttons - all signin buttons
    document.querySelectorAll('[data-auth-type="signin"]').forEach(btn => {
        btn.addEventListener('click', () => openModal('signin'));
    });
    
    // Auth buttons - all signup buttons
    document.querySelectorAll('[data-auth-type="signup"]').forEach(btn => {
        btn.addEventListener('click', () => openModal('signup'));
    });
    
    // Modal close buttons
    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
    
    // Modal overlay click
    if (modalSignin) {
        modalSignin.querySelector('.modal__overlay').addEventListener('click', closeModal);
    }
    if (modalSignup) {
        modalSignup.querySelector('.modal__overlay').addEventListener('click', closeModal);
    }
    
    // Modal switch buttons
    switchToSignup.forEach(btn => btn.addEventListener('click', () => openModal('signup')));
    switchToSignin.forEach(btn => btn.addEventListener('click', () => openModal('signin')));
    
    // Forms
    formSignin.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Sign In successful!', 'success');
        closeModal();
        formSignin.reset();
    });
    
    formSignup.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Account created!', 'success');
        closeModal();
        formSignup.reset();
    });
    
    // Navigation links
    mobileMenuLinks.forEach(link => link.addEventListener('click', handleSmoothScroll));
    
    if (nav) {
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });
    }
    
    // Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) closeMenu();
    });
    
    // Initial state
    updateAuthButtons('signin');
    
    console.log('Header initialized');
};

export { init };