// index.js - Homepage GSAP Animations

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initial Hero Fade In
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-content .text-reveal", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    )
    .fromTo(".fade-up", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=0.8"
    );

    // 2. Parallax Backgrounds
    gsap.utils.toArray(".parallax-bg, .parallax-img").forEach(bg => {
        gsap.to(bg, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: bg.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 3. General Scroll Reveals
    gsap.utils.toArray('section .fade-up, section .text-reveal').forEach(element => {
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

    // 4. Scroll Stack Cards Animation
    // We use CSS sticky for the actual stacking, but use GSAP to scale down and fade the cards behind.
    const cards = gsap.utils.toArray('.stack-card');
    
    cards.forEach((card, index) => {
        // We don't scale the last card because nothing stacks on top of it
        if (index === cards.length - 1) return;
        
        gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top 10%", // When this card reaches its sticky position
                endTrigger: cards[index + 1], // Until the next card reaches its sticky position
                end: "top 15%", 
                scrub: true
            }
        });
    });

    // 5. Infinite Marquee Animation
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

});
