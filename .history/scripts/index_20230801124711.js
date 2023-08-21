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


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 20,
      lng: -160
    },
    zoom: 2,
  });

  infoWindow = new google.maps.InfoWindow({
    content: ""
  });

  // Get the earthquake data (JSONP format)
  // This feed is a copy from the USGS feed, you can find the originals here:
  //   http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
  const script = document.createElement("script");

  script.setAttribute(
    "src",
    "https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json"
  );
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Defines the callback function referenced in the jsonp file.
function eqfeed_callback(results) {

  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;

    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });

    const f = results.features[i].properties;

    marker.addListener("click", (e) => {
      const d = new Date(0);
      d.setUTCMilliseconds(f.time);

      const contentString =
        '<div class="info-window-content">' +
        '<h2>' + f.place + '</h2>' +
        '<h3>Magnitude ' + f.mag + '</h3><p>' + d.toString() + '</p>' +
        '<a href="' + f.url + '" target="new">View on USGS</a>' +
        '</div>';

      infoWindow.setContent(contentString);
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  }
}

window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;