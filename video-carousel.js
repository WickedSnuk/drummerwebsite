// Video Carousel Functionality
class VideoCarousel {
    constructor() {
        this.currentIndex = 0;
        this.trackInner = document.getElementById('carouselTrackInner');
        this.slides = document.querySelectorAll('.video-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevVideo');
        this.nextBtn = document.getElementById('nextVideo');
        this.isAnimating = false;
        
        if (this.slides.length === 0) return;
        
        this._initializeEventListeners();
    }
    
    _initializeEventListeners() {
        // Previous button
        this.prevBtn.addEventListener('click', () => this._previousSlide());
        
        // Next button
        this.nextBtn.addEventListener('click', () => this._nextSlide());
        
        // Dots navigation
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this._goToSlide(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this._previousSlide();
            } else if (e.key === 'ArrowRight') {
                this._nextSlide();
            }
        });
    }
    
    _goToSlide(index) {
        if (index === this.currentIndex || this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Calculate the transform value
        const translateValue = -index * 100;
        this.trackInner.style.transform = `translateX(${translateValue}%)`;
        
        // Update dots
        this.dots[this.currentIndex].classList.remove('active');
        this.dots[index].classList.add('active');
        
        // Update current index
        this.currentIndex = index;
        
        // Re-enable navigation after animation
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    
    _nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this._goToSlide(nextIndex);
    }
    
    _previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this._goToSlide(prevIndex);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoCarousel();
});
