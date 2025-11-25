// Video Modal Functionality
class VideoModal {
    constructor() {
        this.modal = document.getElementById('videoModal');
        this.modalVideo = document.getElementById('modalVideo');
        this.closeBtn = document.getElementById('closeModal');
        this.videoCards = document.querySelectorAll('.video-card');
        this.collapsibleTitles = document.querySelectorAll('.category-title.collapsible');
        
        this._initializeEventListeners();
        this._initializeCollapsible();
        this._animateVideosSequentially();
    }
    
    _initializeCollapsible() {
        this.collapsibleTitles.forEach(title => {
            title.addEventListener('click', () => {
                const content = title.nextElementSibling;
                const icon = title.querySelector('.toggle-icon');
                
                // Toggle collapsed state
                title.classList.toggle('collapsed');
                content.classList.toggle('collapsed');
                
                // Change icon
                if (content.classList.contains('collapsed')) {
                    icon.textContent = '+';
                } else {
                    icon.textContent = '−';
                }
            });
        });
    }
    
    _animateVideosSequentially() {
        // Start animation after page elements load
        const baseDelay = 600; // Wait for category titles to appear
        
        // Animate each video card one by one
        this.videoCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, baseDelay + (index * 150)); // 150ms stagger between each card
        });
    }
    
    _initializeEventListeners() {
        // Add click event to all video cards
        this.videoCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const videoId = card.getAttribute('data-video-id');
                if (videoId) {
                    this._openModal(videoId);
                }
            });
        });
        
        // Close button
        this.closeBtn.addEventListener('click', () => this._closeModal());
        
        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this._closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this._closeModal();
            }
        });
    }
    
    _openModal(videoId) {
        // Check if videoId already contains parameters
        const separator = videoId.includes('&') || videoId.includes('?') ? '&' : '?';
        
        // Set the video source with autoplay
        this.modalVideo.src = `https://www.youtube.com/embed/${videoId}${separator}autoplay=1`;
        
        // Show the modal
        this.modal.classList.add('show');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    _closeModal() {
        // Stop the video by clearing the src
        this.modalVideo.src = '';
        
        // Hide the modal
        this.modal.classList.remove('show');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new VideoModal();
});
