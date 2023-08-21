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
 

  // Add event listener to geolocation button
document.getElementById('geolocationButton').addEventListener('click', function() {
  // Code to retrieve and populate the location field with the user's current geolocation
  // You can use the Geolocation API or a map library like Google Maps to accomplish this
});


// Report Page 

// const inputFields = document.querySelectorAll('.form-group input');

// inputFields.forEach((input) => {
//     input.addEventListener('focus', () => {
//         input.previousElementSibling.style.color = '#999';
//     });

//     input.addEventListener('blur', () => {
//         if (!input.value) {
//             input.previousElementSibling.style.color = '#FF4136';
//         }
//     });
// });

mapboxgl.accessToken = 'pk.eyJ1IjoicmVqb2ljZWNvcnBvcmF0aW9ucyIsImEiOiJjbDE2eTV2ZG4waGRvM2twZjk3MWFsOXUzIn0.xtCcnCaB0E8hNbieercpvQ';
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11'
        });

        const map = new mapboxgl.Map({
          container: 'map', // container ID
          // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center: [-74.5, 40], // starting position [lng, lat]
          zoom: 9 // starting zoom
          });


