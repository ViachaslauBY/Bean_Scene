const hero = document.querySelector('.hero');
const orderBtn = document.getElementById('orderBtn');
const modalOrder = document.getElementById('modalOrder');
const formOrder = document.getElementById('formOrder');
const scrollIndicator = document.querySelector('.hero__scroll');
const closeButtons = document.querySelectorAll('[data-modal-close]');

// Open Order Modal
const openOrderModal = () => {
    if (!modalOrder) return;
    
    modalOrder.classList.add('modal--visible');
    document.body.style.overflow = 'hidden';
    
    const firstInput = modalOrder.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 300);
    }
};

// Close Order Modal
const closeOrderModal = () => {
    if (!modalOrder) return;
    
    modalOrder.classList.remove('modal--visible');
    document.body.style.overflow = '';
};

// Show Notification
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

// Handle Order Form Submit
const handleOrderSubmit = (event) => {
    event.preventDefault();
    
    const name = document.getElementById('orderName').value;
    const phone = document.getElementById('orderPhone').value;
    const coffee = document.getElementById('orderCoffee').value;
    const address = document.getElementById('orderAddress').value;
    
    console.log('Order:', { name, phone, coffee, address });
    
    showNotification('Order placed successfully! We will contact you soon.', 'success');
    closeOrderModal();
    formOrder.reset();
};

// Parallax effect
const handleParallax = () => {
    if (!hero) return;
    
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrollPosition < heroHeight) {
        const bg = hero.querySelector('.hero__bg');
        if (bg) {
            bg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
};

// Hide scroll indicator
const handleScrollIndicator = () => {
    if (!scrollIndicator) return;
    
    const scrollPosition = window.scrollY;
    const opacity = Math.max(0, 1 - (scrollPosition / 300));
    
    scrollIndicator.style.opacity = opacity;
};

// Handle Escape key
const handleKeydown = (event) => {
    if (event.key === 'Escape' && modalOrder?.classList.contains('modal--visible')) {
        closeOrderModal();
    }
};

// Initialize
const init = () => {
    // Order button
    if (orderBtn) {
        orderBtn.addEventListener('click', openOrderModal);
    }
    
    // Close buttons
    closeButtons.forEach(btn => btn.addEventListener('click', closeOrderModal));
    
    // Overlay click
    if (modalOrder) {
        modalOrder.querySelector('.modal__overlay').addEventListener('click', closeOrderModal);
    }
    
    // Form submit
    if (formOrder) {
        formOrder.addEventListener('submit', handleOrderSubmit);
    }
    
    // Escape key
    document.addEventListener('keydown', handleKeydown);
    
    // Parallax effect
    window.addEventListener('scroll', handleParallax, { passive: true });
    
    // Hide scroll indicator
    window.addEventListener('scroll', handleScrollIndicator, { passive: true });
    
    console.log('Hero initialized');
};

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export { init };