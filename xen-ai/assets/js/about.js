// about.js - About Page GSAP Animations

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

    // 2. Parallax Image
    gsap.utils.toArray('[data-speed]').forEach(img => {
        gsap.to(img, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 3. General Scroll Reveals
    gsap.utils.toArray('section .fade-up').forEach(element => {
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

    // 4. Infinite Marquee Animation
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const clone = marqueeContent.cloneNode(true);
        marqueeContent.parentElement.appendChild(clone);
        
        gsap.to('.marquee-content', {
            xPercent: -100,
            repeat: -1,
            duration: 25,
            ease: "linear"
        });
    }
    
    // 5. Initialize PureCounter
    new PureCounter();
});
