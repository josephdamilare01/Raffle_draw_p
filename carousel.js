document.addEventListener('DOMContentLoaded', function() {
    // Check if the required elements and data exist
    const carousel = document.getElementById('giftCarousel');
    const list = carousel ? carousel.querySelector('.list') : null;
    const nextButton = carousel ? carousel.querySelector('.next') : null;
    const prevButton = carousel ? carousel.querySelector('.prev') : null;
    const timeRunning = carousel ? carousel.querySelector('.timeRunning') : null;
    
    // Check if the gift data exists globally (defined in your raffle script)
    if (typeof giftsHardcoded === 'undefined' || !list) {
        // If data or container is missing, just exit.
        return; 
    }

    // --- Configuration ---
    let carouselItems = [];
    const autoPlayTime = 8000; // 8 seconds interval for auto-play

    // --- Auto-Play Timer Variables ---
    let runTimeout;
    let progressBarInterval;
    let currentIndex = 0;

    /**
     * Dynamically generates the carousel items from the hardcoded gift list.
     */
    function generateCarouselItems() {
        giftsHardcoded.forEach((gift, index) => {
            const item = document.createElement('div');
            item.classList.add('item');
            if (index === 0) item.classList.add('active');
            
            // Set the background image (adjust path as needed)
            item.style.backgroundImage = `url(${gift.image})`;

            item.innerHTML = `
                <div class="content">
                    <div class="title">Featured Gift</div>
                    <div class="name">${gift.name}</div>
                    <div class="des">Department: ${gift.department || 'General'}</div>
                    <img class="gift-preview-img" src="${gift.image}" alt="${gift.name} Preview">
                </div>
            `;
            list.appendChild(item);
        });

        carouselItems = list.querySelectorAll('.item');
    }

    /**
     * Shows the item at the given index and hides all others.
     */
    function showSlider(newIndex) {
        const totalItems = carouselItems.length;
        if (totalItems === 0) return;

        // Clear previous active item's animation classes
        carouselItems[currentIndex].classList.remove('active');

        // Calculate the new index to handle wrapping
        if (newIndex >= totalItems) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = totalItems - 1;
        }

        // Set new active item
        currentIndex = newIndex;
        carouselItems[currentIndex].classList.add('active');
        
        // Reset and start auto-play
        clearTimeout(runTimeout);
        clearInterval(progressBarInterval);
        startAutoPlay();
    }

    /**
     * Starts the auto-play timer and progress bar animation.
     */
    function startAutoPlay() {
        // Clear any existing timer
        clearInterval(progressBarInterval);
        
        // Reset progress bar width
        timeRunning.style.width = '0%';
        
        // Start progress bar animation
        let startTime = null;
        progressBarInterval = setInterval(function(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = (elapsed / autoPlayTime) * 100;

            timeRunning.style.width = progress + '%';

            if (elapsed >= autoPlayTime) {
                clearInterval(progressBarInterval);
            }
        }, 10); // Update every 10ms for smooth animation

        // Set timeout to change slide
        runTimeout = setTimeout(() => {
            showSlider(currentIndex + 1);
        }, autoPlayTime);
    }

    // --- Event Listeners for Buttons ---
    nextButton.addEventListener('click', () => {
        showSlider(currentIndex + 1);
        // Pause and restart timer on click for smooth transition
        carousel.classList.add('paused');
        setTimeout(() => {
            carousel.classList.remove('paused');
        }, 1000); 
    });

    prevButton.addEventListener('click', () => {
        showSlider(currentIndex - 1);
        // Pause and restart timer on click for smooth transition
        carousel.classList.add('paused');
        setTimeout(() => {
            carousel.classList.remove('paused');
        }, 1000); 
    });

    // --- Initialization ---
    generateCarouselItems(); 
    showSlider(0); // Start the carousel
});