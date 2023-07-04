// Function to animate the statistics counter
function animateStatisticsCounter(statisticsElement) {
    const targetCount = parseInt(statisticsElement.getAttribute('data-count'));
    let count = 0;
    const increment = Math.ceil(targetCount / 100); // Increment value (adjust as needed)
  
    const counterInterval = setInterval(() => {
      count += increment;
      statisticsElement.textContent = count + '%';
  
      if (count >= targetCount) {
        statisticsElement.textContent = targetCount + '%';
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
  