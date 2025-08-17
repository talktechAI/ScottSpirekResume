// Anti-scraping protection for email and phone numbers
// This script decodes base64 encoded contact information when the page loads
// to protect against email/phone scraping bots while maintaining usability for humans

document.addEventListener('DOMContentLoaded', function() {
    
    // Function to decode base64 encoded email addresses
    function decodeEmail() {
        // Find all elements with data-decode="email" attribute
        const emailElements = document.querySelectorAll('[data-decode="email"]');
        
        emailElements.forEach(function(element) {
            // Get the href attribute which contains "mailto:" + base64 encoded email
            const hrefData = element.getAttribute('href');
            
            if (hrefData && hrefData.startsWith('mailto:')) {
                // Split at the colon to separate "mailto:" from the encoded email
                const encodedEmail = hrefData.split(':')[1];
                
                try {
                    // Decode the base64 encoded email
                    const decodedEmail = atob(encodedEmail);
                    
                    // Update the href with the decoded email
                    element.href = 'mailto:' + decodedEmail;
                    
                    // Update the displayed text with the decoded email
                    element.textContent = decodedEmail;
                    
                    // Add visual feedback on hover
                    element.addEventListener('mouseenter', function() {
                        this.style.transform = 'scale(1.05)';
                        this.style.transition = 'transform 0.2s ease';
                    });
                    
                    element.addEventListener('mouseleave', function() {
                        this.style.transform = 'scale(1)';
                    });
                    
                } catch (error) {
                    console.error('Error decoding email:', error);
                }
            }
        });
    }
    
    // Function to decode base64 encoded phone numbers
    function decodePhone() {
        // Find all elements with data-decode="phone" attribute
        const phoneElements = document.querySelectorAll('[data-decode="phone"]');
        
        phoneElements.forEach(function(element) {
            // Get the href attribute which contains "tel:" + base64 encoded phone
            const hrefData = element.getAttribute('href');
            
            if (hrefData && hrefData.startsWith('tel:')) {
                // Split at the colon to separate "tel:" from the encoded phone
                const encodedPhone = hrefData.split(':')[1];
                
                try {
                    // Decode the base64 encoded phone number
                    const decodedPhone = atob(encodedPhone);
                    
                    // Create a clickable phone link
                    const phoneLink = document.createElement('a');
                    phoneLink.href = 'tel:' + decodedPhone.replace(/\D/g, ''); // Remove non-digits for tel: link
                    phoneLink.textContent = decodedPhone;
                    phoneLink.style.color = 'inherit';
                    phoneLink.style.textDecoration = 'none';
                    
                    // Add hover effect
                    phoneLink.addEventListener('mouseenter', function() {
                        this.style.textDecoration = 'underline';
                        this.style.transform = 'scale(1.05)';
                        this.style.transition = 'all 0.2s ease';
                    });
                    
                    phoneLink.addEventListener('mouseleave', function() {
                        this.style.textDecoration = 'none';
                        this.style.transform = 'scale(1)';
                    });
                    
                    // Replace the original element's content with the phone link
                    element.innerHTML = '';
                    element.appendChild(phoneLink);
                    
                } catch (error) {
                    console.error('Error decoding phone number:', error);
                    // Fallback: just remove the data-decode attribute and show original text
                    element.textContent = element.getAttribute('href') || 'Phone available';
                }
            }
        });
    }
    
    // Function to add smooth scrolling for any internal links (future enhancement)
    function addSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Function to add print functionality
    function addPrintButton() {
        // Create a print button (optional enhancement)
        const printButton = document.createElement('button');
        printButton.textContent = 'Print Resume';
        printButton.style.position = 'fixed';
        printButton.style.bottom = '20px';
        printButton.style.right = '20px';
        printButton.style.padding = '10px 20px';
        printButton.style.backgroundColor = '#3498db';
        printButton.style.color = 'white';
        printButton.style.border = 'none';
        printButton.style.borderRadius = '5px';
        printButton.style.cursor = 'pointer';
        printButton.style.fontSize = '14px';
        printButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        printButton.style.zIndex = '1000';
        
        // Hide print button when printing
        printButton.style.displayPrint = 'none';
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        printButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#2980b9';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.2s ease';
        });
        
        printButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#3498db';
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(printButton);
    }
    
    // Function to add accessibility enhancements
    function enhanceAccessibility() {
        // Add skip navigation link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '-40px';
        skipLink.style.left = '6px';
        skipLink.style.background = '#3498db';
        skipLink.style.color = 'white';
        skipLink.style.padding = '8px';
        skipLink.style.textDecoration = 'none';
        skipLink.style.borderRadius = '4px';
        skipLink.style.zIndex = '1000';
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content ID for skip link
        const container = document.querySelector('.container');
        if (container) {
            container.id = 'main-content';
            container.setAttribute('tabindex', '-1');
        }
    }
    
    // Initialize all functions
    function init() {
        console.log('Initializing resume page...');
        
        // Decode protected contact information
        decodeEmail();
        decodePhone();
        
        // Add enhancements
        addSmoothScrolling();
        addPrintButton();
        enhanceAccessibility();
        
        console.log('Resume page initialization complete!');
    }
    
    // Run initialization
    init();
    
    // Add a subtle fade-in animation for the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// Additional utility functions for enhanced user experience

// Function to handle window resize events
window.addEventListener('resize', function() {
    // Adjust layout if needed on resize
    const header = document.querySelector('.header');
    if (window.innerWidth < 768 && header) {
        header.style.padding = '2rem 1rem';
    } else if (header) {
        header.style.padding = '3rem 2rem';
    }
});

// Function to detect if user prefers reduced motion
function respectMotionPreferences() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
        // Remove transitions for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize motion preferences on load
document.addEventListener('DOMContentLoaded', respectMotionPreferences);

// Export functions for potential external use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        decodeEmail,
        decodePhone,
        addSmoothScrolling,
        enhanceAccessibility
    };
}