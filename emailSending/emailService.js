/**
 * Email Service Integration
 * 
 * This file provides instructions and code for integrating with EmailJS
 * or setting up your own backend email service.
 * 
 * OPTION 1: EmailJS (Recommended for client-side, no backend needed)
 * ---------------------------------------------------------------------
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Get your Public Key, Service ID, and Template ID
 * 5. Uncomment and configure the code below
 */

// EmailJS Configuration - FILL IN YOUR KEYS BELOW
const EMAILJS_CONFIG = {
    publicKey: '1YdK0qG3TMhNf-Vxx',        // Replace with your EmailJS Public Key
    serviceId: 'service_pyfg7kr',        // Replace with your EmailJS Service ID
    templateId: 'template_hmo8tu9'       // Replace with your EmailJS Template ID
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

// Send email using EmailJS
function sendEmailViaEmailJS(name, email, message) {
    const templateParams = {
        name: name,         // Visitor's name (matches {{name}} in template)
        email: email,       // Visitor's email (matches {{email}} in template)
        message: message    // Message content (matches {{message}} in template)
    };
    
    return emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
    )
    .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        return { success: true };
    })
    .catch((error) => {
        console.error('Failed to send email:', error);
        return { success: false, error: error };
    });
}

/**
 * OPTION 2: Your Own Backend Server
 * ---------------------------------------------------------------------
 * If you have a Node.js/PHP/Python backend, you can send emails through it.
 * 
 * Example using Fetch API to call your backend:
 */

/*
async function sendEmailViaBackend(name, email, message) {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: 'nyk.tedu@gmail.com',
                from: email,
                name: name,
                message: message
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return { success: true, data: data };
        } else {
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}
*/

/**
 * HOW TO USE:
 * -----------
 * 1. Choose your integration method (EmailJS or Backend)
 * 2. Uncomment the relevant code above
 * 3. Fill in your credentials/endpoints
 * 4. In formHandler.js, replace the sendEmail function with:
 *    - sendEmailViaEmailJS() if using EmailJS
 *    - sendEmailViaBackend() if using your own backend
 * 5. Add EmailJS script to contact.html if using EmailJS:
 *    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
 */
