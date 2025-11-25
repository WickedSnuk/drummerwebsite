// Email validation utility
const EmailValidator = {
    /**
     * Validates email format using regex
     * @param {string} email - Email address to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    isValidEmail: function(email) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Additional checks
        if (!email || email.trim() === '') {
            return false;
        }
        
        // Basic format check
        if (!emailRegex.test(email)) {
            return false;
        }
        
        // Check for valid domain
        const parts = email.split('@');
        if (parts.length !== 2) {
            return false;
        }
        
        const domain = parts[1];
        if (domain.indexOf('.') === -1) {
            return false;
        }
        
        return true;
    },
    
    /**
     * Get validation error message
     * @param {string} email - Email address
     * @returns {string} - Error message or empty string if valid
     */
    getErrorMessage: function(email) {
        if (!email || email.trim() === '') {
            return 'Email address is required.';
        }
        
        if (!this.isValidEmail(email)) {
            return 'Please enter a valid email address.';
        }
        
        return '';
    }
};
