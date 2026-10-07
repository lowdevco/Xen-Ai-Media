// services.js - Services & Pricing GSAP Animations

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initial Hero Fade In
    const tl = gsap.timeline();
    
    tl.fromTo(".text-reveal", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    )
    .fromTo(".fade-up", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=0.8"
    );

    // 2. General Scroll Reveals for Lists and Grids
    gsap.utils.toArray('section').forEach(section => {
        // Find all elements with .fade-up in this section
        const fadeElements = section.querySelectorAll('.fade-up');
        
        // Skip elements already animated by the hero timeline
        if (section.classList.contains('pt-40')) return;
        
        if (fadeElements.length > 0) {
            gsap.fromTo(fadeElements, 
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.1, // Stagger elements if there are multiple in a grid
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%", // Triggers when section is 85% in view
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

});
