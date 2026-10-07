// portfolio.js - Portfolio Page GSAP Animations & Filtering

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

    // 2. Portfolio Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Toggle
            filterBtns.forEach(b => {
                b.classList.remove('text-brand-light', 'active');
                b.classList.add('text-gray-500');
            });
            btn.classList.add('text-brand-light', 'active');
            btn.classList.remove('text-gray-500');

            const filterValue = btn.getAttribute('data-filter');

            // Animation out
            gsap.to(workItems, {
                scale: 0.9,
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    // Filter DOM
                    workItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'inline-block';
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    // Refresh ScrollTriggers since layout changed
                    ScrollTrigger.refresh();

                    // Animate visible items back in
                    const visibleItems = Array.from(workItems).filter(item => item.style.display !== 'none');
                    gsap.fromTo(visibleItems, 
                        { scale: 0.9, opacity: 0, y: 30 },
                        { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
                    );
                }
            });
        });
    });

    // 2. General Scroll Reveals
    gsap.utils.toArray('section .fade-up, section .text-reveal, section .work-item').forEach(element => {
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

    // 3. Infinite Marquee Animation
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
