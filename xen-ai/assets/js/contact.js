// contact.js - Contact Page GSAP Animations

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initial Hero Fade In
    const tl = gsap.timeline();
    
    tl.fromTo(".text-reveal", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    )
    .fromTo(".fade-up", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=0.8"
    );

    // 2. Form Inputs Stagger Animation
    gsap.fromTo("form > div", 
        { y: 20, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power3.out",
            delay: 0.5
        }
    );
    
    gsap.fromTo("form button", 
        { y: 20, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "power3.out",
            delay: 0.9
        }
    );

    // 3. General Scroll Reveals (For FAQ)
    gsap.utils.toArray('section .fade-up').forEach(element => {
        // Skip elements already animated by the initial timeline
        if(element.closest('.pt-40')) return;

        gsap.fromTo(element, 
            { y: 40, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

});
