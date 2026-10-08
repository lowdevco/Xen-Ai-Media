// script.js - Global Scripts (Navbar, Footer, universal GSAP setups)

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Menu Toggle Example ---
    const menuToggle = document.getElementById('menu-toggle');
    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            console.log('Mobile menu clicked!');
            // Add GSAP logic to open mobile menu later
        });
    }

    // --- Global Animations ---
    // Fade in the navbar on load
    gsap.from("header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });

});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('mobile-menu-overlay');
    const header = document.querySelector('header');
    
    if(btn && overlay) {
        btn.addEventListener('click', () => {
            const isOpen = overlay.classList.contains('opacity-100');
            const lines = btn.querySelectorAll('span');
            
            if(!isOpen) {
                // Open menu
                overlay.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                overlay.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
                
                // Animate hamburger to X
                lines[0].style.transform = 'translateY(3.5px) rotate(45deg)';
                lines[1].style.transform = 'translateY(-3.5px) rotate(-45deg)';
                
                // Remove mix-blend so it doesn't invert over the dark overlay
                if(header.classList.contains('mix-blend-difference')) {
                    header.classList.remove('mix-blend-difference');
                    header.dataset.blendRemoved = 'true';
                }
            } else {
                // Close menu
                overlay.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                overlay.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                
                // Reset hamburger
                lines[0].style.transform = 'none';
                lines[1].style.transform = 'none';
                
                // Restore mix-blend
                if(header.dataset.blendRemoved === 'true') {
                    header.classList.add('mix-blend-difference');
                    header.dataset.blendRemoved = 'false';
                }
            }
        });
    }
});

// Accordion Exclusive Open Logic
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('details');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', (e) => {
            // Check if it's currently closed (meaning this click will open it)
            if (!accordion.hasAttribute('open')) {
                accordions.forEach(other => {
                    if (other !== accordion && other.hasAttribute('open')) {
                        other.removeAttribute('open');
                    }
                });
            }
        });
    });
});
