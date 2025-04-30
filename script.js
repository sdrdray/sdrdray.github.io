document.addEventListener('DOMContentLoaded', () => {

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800, // Animation duration
        easing: 'ease-in-out', // Animation timing function
        once: true, // Whether animation should happen only once - while scrolling down
        offset: 100 // Offset (in px) from the original trigger point
    });

    // --- Initialize Typed.js ---
    const typed = new Typed('.typed-text', {
        strings: ["Web Developer.", "ML Engineer.", "Problem Solver.", "Tech Enthusiast."],
        typeSpeed: 70, // Typing speed in milliseconds
        backSpeed: 50, // Backspacing speed
        loop: true, // Loop the animation
        backDelay: 1500, // Pause before backspacing
        startDelay: 500 // Pause before starting
    });

    // --- Mobile Navigation Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links In/Out
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''; // Reset animation if closing
            } else {
                // Staggered fade-in effect
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // --- Close Mobile Nav When Link Is Clicked ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                 navLinks.forEach(link => {
                    link.style.animation = ''; // Reset animation
                });
            }
        });
    });

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                 // Calculate scroll position, accounting for fixed header height
                 const headerOffset = document.querySelector('header').offsetHeight;
                 const elementPosition = targetElement.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

     // --- Optional: Highlight Active Nav Link On Scroll ---
     // (This is a bit more complex, might need adjustments based on section heights)
     const sections = document.querySelectorAll('section[id]');
     const headerHeight = document.querySelector('header').offsetHeight;

     function navHighlighter() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Adjust top offset by header height and a little extra buffer
            const sectionTop = current.offsetTop - headerHeight - 50;
            const sectionId = current.getAttribute('id');

             /* If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
             To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector */
             const navLink = document.querySelector('.nav-links a[href*=' + sectionId + ']');

             if (navLink) { // Check if the nav link exists
                 if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                     navLink.classList.add('active');
                 } else {
                     navLink.classList.remove('active');
                 }
             }
        });

         // Special case for the top of the page (no active link)
         if (scrollY < sections[0].offsetTop - headerHeight - 50) {
             document.querySelectorAll('.nav-links a.active').forEach(a => a.classList.remove('active'));
         }
     }

     window.addEventListener('scroll', navHighlighter);
     // Initial call to set active link on page load
     navHighlighter();


}); // End DOMContentLoaded
