// Contact form handler
const RECIPIENT_EMAIL = 'nyk.tedu@gmail.com';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageInput = contactForm.querySelector('textarea');
        
        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const message = messageInput?.value.trim() || '';
        
        // Validate all fields
        if (!name) {
            showMessage('Please enter your name.', 'error');
            nameInput?.focus();
            return;
        }
        
        if (!email) {
            showMessage('Please enter your email address.', 'error');
            emailInput?.focus();
            return;
        }
        
        // Validate email format
        if (!EmailValidator.isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            emailInput?.focus();
            return;
        }
        
        if (!message) {
            showMessage('Please enter a message.', 'error');
            messageInput?.focus();
            return;
        }
        
        // Email is valid, proceed with sending
        sendEmail(name, email, message);
    });
});

/**
 * Send email using EmailJS
 * @param {string} name - Sender's name
 * @param {string} email - Sender's email
 * @param {string} message - Message content
 */
function sendEmail(name, email, message) {
    // Show loading state
    showMessage('Sending your message...', 'info');
    
    // Send email via EmailJS
    sendEmailViaEmailJS(name, email, message)
        .then((result) => {
            if (result.success) {
                // Show success message
                showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
                
                // Clear form
                const form = document.querySelector('.contact-form');
                if (form) form.reset();
            } else {
                // Show error message
                showMessage('Sorry, there was an error sending your message. Please try again or email us directly.', 'error');
            }
        })
        .catch((error) => {
            console.error('Email sending error:', error);
            showMessage('Sorry, there was an error sending your message. Please try again or email us directly.', 'error');
        });
}

/**
 * Show inline message below the button
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success', 'error', 'info')
 */
function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('form-message');
    
    if (!messageDiv) return;
    
    // Remove existing classes
    messageDiv.classList.remove('show', 'success', 'error', 'info');
    
    // Set message and type
    messageDiv.textContent = message;
    messageDiv.classList.add(type);
    
    // Trigger animation
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10);
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    }
}
