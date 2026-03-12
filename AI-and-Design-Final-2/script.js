document.addEventListener('DOMContentLoaded', () => {
    const messageWrappers = document.querySelectorAll('.message-wrapper');
    const unitySection = document.getElementById('unity-section');

    // Hide all messages initially ( handled by CSS opacity: 0 )
    
    // Create an intersection observer to detect when elements enter the viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px', // Trigger slightly before it hits the bottom
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains('message-wrapper')) {
                    simulateTypingAndReveal(target);
                } else if (target.classList.contains('unity-section')) {
                    target.classList.add('visible');
                }
                
                // Unobserve after revealing
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe all message wrappers and the unity section
    messageWrappers.forEach(wrapper => {
        observer.observe(wrapper);
    });
    
    if (unitySection) {
        observer.observe(unitySection);
    }

    // Function to simulate typing before showing the message
    function simulateTypingAndReveal(messageElement) {
        // Create typing indicator element
        const isLeft = messageElement.classList.contains('left');
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        if (isLeft) {
            typingIndicator.style.borderBottomLeftRadius = '4px';
        } else {
            typingIndicator.style.borderBottomRightRadius = '4px';
            typingIndicator.style.alignSelf = 'flex-end';
        }
        
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert before the message bubble inside the wrapper
        // Temporarily hide the actual bubble content while "typing"
        const bubble = messageElement.querySelector('.chat-bubble');
        const originalDisplay = bubble.style.display;
        bubble.style.display = 'none';
        
        messageElement.appendChild(typingIndicator);
        
        // Make the wrapper visible to show the typing indicator
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
        
        // Fade in the indicator
        setTimeout(() => {
            typingIndicator.style.opacity = '1';
        }, 50);

        // Random typing duration between 800ms and 1800ms
        const typingDuration = Math.floor(Math.random() * 1000) + 800;

        setTimeout(() => {
            // Remove typing indicator
            typingIndicator.style.opacity = '0';
            
            setTimeout(() => {
                typingIndicator.remove();
                
                // Show actual bubble and trigger highlight
                bubble.style.display = originalDisplay;
                
                // We add the 'visible' class to trigger CSS highlight animations
                messageElement.classList.add('visible');
            }, 300); // Wait for fade out
            
        }, typingDuration);
    }
    
    // Add subtle parallax to hero graphics
    const heroBubbles = document.querySelectorAll('.hero-bubble');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (scrolled < 500) {
            heroBubbles.forEach((bubble, index) => {
                const direction = index === 0 ? -1 : 1;
                // Move them slightly closer together on scroll down
                const moveX = (direction * 40) - (direction * (scrolled * 0.05));
                const moveY = (index === 0 ? -20 : 20) + (scrolled * 0.05);
                
                bubble.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
            });
        }
    });
});
