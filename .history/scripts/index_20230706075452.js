var listItems = document.querySelectorAll('#myNav li');

// Iterate over each list item
for (var i = 0; i < listItems.length; i++) {
  // Add a click event listener to each list item
  listItems[i].addEventListener('click', function() {
    // Remove the active class from all list items
    for (var j = 0; j < listItems.length; j++) {
      listItems[j].classList.remove('active');
    }

    // Assign the active class to the clicked list item
    this.classList.add('active');

    // Assign an ID to the clicked list item
    this.id = 'clickedItem';
  });
}




// Function to animate the statistics counter
function animateStatisticsCounter(statisticsElement) {
    const targetCount = parseInt(statisticsElement.getAttribute('data-count'));
    let count = 0;
    let increment = 1;
  
    // Adjust increment value based on the target count
    if (targetCount > 100) {
      increment = Math.ceil(targetCount / 100);
    }
  
    const counterInterval = setInterval(() => {
      count += increment;
  
      // Update text content based on the class of the statistics element
      if (statisticsElement.classList.contains('stat1') || statisticsElement.classList.contains('stat4')) {
        statisticsElement.textContent = count + '%';
      } else {
        statisticsElement.textContent = count + '+';
      }
  
      if (count >= targetCount) {
        // Update text content when target count is reached
        if (statisticsElement.classList.contains('stat1') || statisticsElement.classList.contains('stat4')) {
          statisticsElement.textContent = targetCount + '%';
        } else {
          statisticsElement.textContent = targetCount + '+';
        }
  
        clearInterval(counterInterval);
      }
    }, 10); // Adjust the interval duration as needed
  }
  
  // Intersection Observer callback function
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statisticsElement = entry.target;
        animateStatisticsCounter(statisticsElement);
        observer.unobserve(statisticsElement);
      }
    });
  }
  
  // Create Intersection Observer instance
  const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
  
  // Observe the statistics elements
  const statisticsElements = document.querySelectorAll('.statistics');
  statisticsElements.forEach((statisticsElement) => {
    observer.observe(statisticsElement);
  });
  