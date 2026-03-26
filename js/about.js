const aboutBtn = document.getElementById('aboutBtn');
const modalInfo = document.getElementById('modalInfo');
const closeButtons = document.querySelectorAll('[data-modal-close]');

// Open Info Modal
const openInfoModal = () => {
    if (!modalInfo) return;
    
    modalInfo.classList.add('modal--visible');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        const submitBtn = modalInfo.querySelector('.modal__submit');
        if (submitBtn) submitBtn.focus();
    }, 300);
};

// Close Info Modal
const closeInfoModal = () => {
    if (!modalInfo) return;
    
    modalInfo.classList.remove('modal--visible');
    document.body.style.overflow = '';
};

// Handle Escape key
const handleKeydown = (event) => {
    if (event.key === 'Escape' && modalInfo?.classList.contains('modal--visible')) {
        closeInfoModal();
    }
};

// Initialize
const init = () => {
    // About button
    if (aboutBtn) {
        aboutBtn.addEventListener('click', openInfoModal);
    }
    
    // Close buttons
    closeButtons.forEach(btn => btn.addEventListener('click', closeInfoModal));
    
    // Overlay click
    if (modalInfo) {
        modalInfo.querySelector('.modal__overlay').addEventListener('click', closeInfoModal);
    }
    
    // Escape key
    document.addEventListener('keydown', handleKeydown);
    
    console.log('About initialized');
};

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export { init };