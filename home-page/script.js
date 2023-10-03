





// code for explore india and popular hotel

// JavaScript function to redirect to the search page
function redirectToSearch(destination) {
    // Replace 'search-page.html' with the actual URL of your search page
    window.location.href = 'search-page.html?q=' + encodeURIComponent(destination);
}


       
         // code for home, about us and search
  document.addEventListener('DOMContentLoaded', function () {
    // Get references to the buttons
    const homeButton = document.querySelector('#home-button');
    const searchButton = document.querySelector('#search-button');
    const aboutUsButton = document.querySelector('#about-us-button');

    // Function to handle the "Home" button click
    function goToHome() {
      // Replace this with the actual URL of your home page
      window.location.href = '/'; // Example: Redirect to the root URL
    }

    // Function to handle the "Search" button click
    function goToSearch() {
      // Replace this with the actual URL of your search page
      window.location.href = '/search'; // Example: Redirect to the search page
    }

    // Function to handle the "About Us" button click
    function goToAboutUs() {
      // Replace this with the actual URL of your "About Us" page
      window.location.href = '/about-us'; // Example: Redirect to the About Us page
    }

    // Add click event listeners to the buttons
    homeButton.addEventListener('click', goToHome);
    searchButton.addEventListener('click', goToSearch);
    aboutUsButton.addEventListener('click', goToAboutUs);
  });




         // code for Where are you going? and Where do you want to stay?
  document.addEventListener('DOMContentLoaded', function () {
    // Get references to the form and form elements
    const searchForm = document.querySelector('.search-bar');
    const cityInput = document.querySelector('.city-search input');
    const hotelInput = document.querySelector('.hotel-search input');

    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Get the values entered by the user
      const city = cityInput.value.trim();
      const hotel = hotelInput.value.trim();

      // You can add your custom logic here, such as validation or redirection
      if (city === '' && hotel === '') {
        // Example: Display an error message or prevent the form submission
        alert('Please fill in at least one search field.');
      } else {
        // Example: Redirect to a search results page with the user's input
        // Replace this URL with the actual search results page URL
        window.location.href = `/search-results?city=${encodeURIComponent(city)}&hotel=${encodeURIComponent(hotel)}`;
      }
    }

    // Add an event listener to the form for when it's submitted
    searchForm.addEventListener('submit', handleFormSubmit);
  });




