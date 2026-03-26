import { init as initHeader } from './header.js';
import { init as initHero } from './hero.js';
import { init as initAbout } from './about.js';

const initApp = () => {    
    initHeader();
    initHero();  
    initAbout();  
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

export { initApp };