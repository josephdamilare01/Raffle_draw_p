document.addEventListener('DOMContentLoaded', function() {
    // --- Element Selection ---
    const carousel = document.getElementById('giftCarousel');
    const list = carousel ? carousel.querySelector('.list') : null;
    const nextButton = carousel ? carousel.querySelector('.next') : null;
    const prevButton = carousel ? carousel.querySelector('.prev') : null;
    const timeRunning = carousel ? carousel.querySelector('.timeRunning') : null;
    
    // Safety check (assuming giftsHardcoded is defined globally)
    if (typeof giftsHardcoded === 'undefined' || !list || !nextButton || !prevButton || !timeRunning) {
        console.error('Carousel elements or gift data are missing.');
        return; 
    }

    // --- Configuration ---
    // Transition time in CSS is 1s, so timeRunning should be slightly longer.
    const transitionDuration = 1000; 
    const autoPlayTime = 7000; // 7 seconds interval for auto-play (matches new CSS)

    // --- Timer Variables ---
    let runTimeOut; // For handling the removal of 'next'/'prev' classes
    let runNextAuto; // For handling the automatic slide change

    // --- DOM Generation ---

    /**
     * Dynamically generates the carousel items from the hardcoded gift list.
     * Note: No need for an 'active' class here; the CSS handles the initial state
     * via :nth-child(2).
     */
    function generateCarouselItems() {
        giftsHardcoded.forEach((gift, index) => {
            const item = document.createElement('div');
            item.classList.add('item');
            
            // Set the background image
            item.style.backgroundImage = `url(${gift.image})`;

            // If the item is the second one, ensure it has the overlay for readability
            if (index === 1) {
                // In the new design, content is only visible on the second element
                item.classList.add('active'); 
            }

            item.innerHTML = `
                <div class="content">
                    <div class="title">Featured Gift</div>
                    <div class="name">${gift.name}</div>
                    <div class="des">Department: ${gift.department || 'General'}</div>
                    </div>
            `;
            list.appendChild(item);
        });
    }

    // --- Animation Logic ---

    /**
     * Resets and restarts the CSS animation for the progress bar.
     */
    function resetTimeAnimation() {
        // This is a standard trick to restart a CSS animation:
        timeRunning.style.animation = 'none';
        timeRunning.offsetHeight; /* trigger reflow */
        timeRunning.style.animation = null; 
        timeRunning.style.animation = `runningTime ${autoPlayTime / 1000}s linear 1 forwards`;
    }

    /**
     * Main function to move the slider by reordering DOM elements.
     * @param {string} type - 'next' or 'prev'.
     */
    function showSlider(type) {
        const sliderItemsDom = list.querySelectorAll('.carousel .list .item');
        
        // 1. Reorder the DOM elements
        if (type === 'next') {
            // Move the first item to the end (it smoothly becomes the next small item)
            list.appendChild(sliderItemsDom[0]);
            carousel.classList.add('next');
        } else {
            // Move the last item to the front (it smoothly becomes the new active item)
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            carousel.classList.add('prev');
        }
        
        // --- Manage 'active' class for content visibility/overlay (Crucial for the new design) ---
        // Find the newly active item (which is now the second item in the list)
        // Note: The previous active item moves to index 0 on 'next' click, or index 1 on 'prev' click.
        
        // Remove the 'active' class from ALL items first (simplifies logic)
        sliderItemsDom.forEach(item => item.classList.remove('active'));

        // Apply 'active' to the item at index 1 (the full-screen, visible item)
        // Re-query the list since the DOM order has changed:
        const newList = list.querySelectorAll('.carousel .list .item');
        if (newList.length >= 2) {
            newList[1].classList.add('active'); 
        }

        // 2. Manage the transition classes
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            // After the transition finishes, remove the temporary class
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, transitionDuration); // Wait for the 1s CSS transition

        // 3. Reset Auto-Play Timer and Progress Bar
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            // Use the click function to trigger the next slide
            nextButton.click(); 
        }, autoPlayTime);

        // Reset the running time animation for the new interval
        resetTimeAnimation();
    }


    // --- Event Listeners for Buttons ---
    nextButton.addEventListener('click', () => {
        showSlider('next');
    });

    prevButton.addEventListener('click', () => {
        showSlider('prev');
    });

    // --- Initialization ---
    generateCarouselItems(); 
    resetTimeAnimation(); // Start the initial progress bar animation
    
    // Start the automatic rotation
    runNextAuto = setTimeout(() => {
        nextButton.click();
    }, autoPlayTime);
});
