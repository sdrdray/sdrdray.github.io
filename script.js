document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP & ScrollTrigger Setup ---
    gsap.registerPlugin(ScrollTrigger);

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    ScrollTrigger.create({
        start: 'top -80', // When scrolling 80px past the top
        end: 99999,
        toggleClass: { className: 'scrolled', target: header }
    });

    // --- Hero Section Animations ---
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    heroTimeline
        .fromTo('.gsap-hero-item', // Target all items with this class
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.2, delay: 0.3 }) // Stagger animation
        .fromTo('.hero-gradient-bg', // Animate background gradient subtly
            { opacity: 0 },
            { opacity: 0.7, duration: 1.5 }, '-=0.5'); // Start slightly earlier

    // --- Typed.js Initialization ---
    const typed = new Typed('.typed-text', {
        strings: ["Web Developer.", "ML Engineer.", "Problem Solver.", "Creator."],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        backDelay: 1800,
        startDelay: 800 // Start after hero text fades in
    });

    // --- General Scroll-Triggered Fade-Up Animation ---
    gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
        gsap.fromTo(elem,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%', // Trigger when 85% of the element is visible
                    toggleActions: 'play none none none', // Play animation once on enter
                    // markers: true, // Uncomment for debugging trigger points
                }
            }
        );
    });

    // --- Scroll-Triggered Stagger Animation for Lists/Grids ---
    gsap.utils.toArray('.gsap-stagger-items').forEach(container => {
        const items = container.querySelectorAll('.gsap-timeline-item, .gsap-project-item, .gsap-skill-item, .gsap-cert-item, .gsap-contact-item');
        gsap.fromTo(items,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.15, // Time between each item animation
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    // markers: true,
                }
            }
        );
    });


    // --- Mobile Navigation Toggle & Animation ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = gsap.utils.toArray('.nav-links li'); // Use GSAP utility

    // GSAP timeline for nav animation
    const navTimeline = gsap.timeline({ paused: true, reversed: true });
    navTimeline
        .to(nav, { duration: 0.5, x: 0, ease: 'power3.inOut' }) // Slide in
        .fromTo(navLinks, // Stagger links
            { opacity: 0, y: 20 },
            { duration: 0.3, opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
            "-=0.3" // Overlap slightly with slide-in
        );

    burger.addEventListener('click', () => {
        burger.classList.toggle('toggle');
        // Play or reverse the timeline based on the 'reversed' state
        navTimeline.reversed() ? navTimeline.play() : navTimeline.reverse();
        // Toggle body class to prevent scrolling when nav is open (optional)
        // document.body.classList.toggle('no-scroll');
    });

    // Close Mobile Nav When Link Is Clicked
    navLinks.forEach(link => {
        link.querySelector('a').addEventListener('click', () => {
            if (burger.classList.contains('toggle')) { // Check if nav is open
                 burger.classList.remove('toggle');
                 navTimeline.reverse(); // Close the nav
                 // document.body.classList.remove('no-scroll');
            }
        });
    });


    // --- Smooth Scrolling for Nav Links (Improved) ---
    gsap.utils.toArray('.nav-links a[href^="#"], .cta-button[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate scroll position, accounting for fixed header height
                const headerOffset = header.offsetHeight; // Get dynamic header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                // Use pageYOffset for browser compatibility
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                gsap.to(window, {
                    duration: 1, // Adjust duration for desired speed
                    scrollTo: { y: offsetPosition, autoKill: true }, // Use GSAP ScrollToPlugin
                    ease: 'power3.inOut' // Smoother easing
                });
            }
        });
    });

     // --- Active Nav Link Highlighting On Scroll ---
     const sections = gsap.utils.toArray('main section[id]'); // Target sections in main

     sections.forEach(section => {
         const sectionId = section.getAttribute('id');
         const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

         if(navLink) {
             ScrollTrigger.create({
                 trigger: section,
                 start: 'top center', // Trigger when section top hits center
                 end: 'bottom center', // End when section bottom hits center
                 // markers: true, // Debugging
                 onToggle: self => {
                     if (self.isActive) {
                         // Remove active class from all links first
                         document.querySelectorAll('.nav-links a.active').forEach(a => a.classList.remove('active'));
                         // Add active class to the current link
                         navLink.classList.add('active');
                     }
                 },
                  onLeaveBack: () => { // Handle scrolling back up
                      const prevSection = section.previousElementSibling?.previousElementSibling; // Find previous section
                      if (prevSection?.id) {
                           const prevNavLink = document.querySelector(`.nav-links a[href="#${prevSection.id}"]`);
                           if (prevNavLink) {
                                document.querySelectorAll('.nav-links a.active').forEach(a => a.classList.remove('active'));
                                prevNavLink.classList.add('active');
                           }
                      } else {
                           // If it's the first section, remove active class when scrolling above it
                           document.querySelectorAll('.nav-links a.active').forEach(a => a.classList.remove('active'));
                      }
                  }
             });
         }
     });

     // Special case for removing active class when scrolling to the very top
     ScrollTrigger.create({
         start: 0,
         end: () => sections[0].offsetTop - header.offsetHeight - 100, // Before the first section trigger zone
         onLeaveBack: () => { // When scrolling back into this zone (i.e., to the top)
             document.querySelectorAll('.nav-links a.active').forEach(a => a.classList.remove('active'));
         },
         // markers: true,
     });


    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

     // --- Optional: Add subtle mouse follow gradient effect ---
     // (Can be performance intensive - use with caution)
     /*
     const body = document.body;
     body.addEventListener('mousemove', (e) => {
         const x = e.clientX / window.innerWidth * 100;
         const y = e.clientY / window.innerHeight * 100;
         // Apply to a pseudo-element or a dedicated background div for better performance
         body.style.setProperty('--mouse-x', `${x}%`);
         body.style.setProperty('--mouse-y', `${y}%`);
     });
     // Add this CSS (example - apply to ::before or a div):
     // body::before { content: ''; position: fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index: -1;
     // background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(88, 166, 255, 0.05) 0%, transparent 30%); }
     */


    console.log("Portfolio Initialized with GSAP Animations.");

}); // End DOMContentLoaded
