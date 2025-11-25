// Prevent active navigation link from reloading the page
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If the link has the 'active' class, prevent page reload
            if (this.classList.contains('active')) {
                e.preventDefault();
                return false;
            }
        });
    });
});
