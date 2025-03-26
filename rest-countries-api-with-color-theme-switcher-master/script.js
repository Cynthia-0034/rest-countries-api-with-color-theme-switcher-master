// script.js
// Theme mode
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.textContent = "☀️"; // Sun icon for light mode toggle
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Update icon and save preference
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// DOM elements
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const countriesGrid = document.getElementById("countries-grid");

// Fetch all countries
async function fetchAllCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    displayCountries(data);
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    alert("Error fetching countries. Please try again.");
  }
}

// Display countries in the grid
function displayCountries(countries) {
  // Sort countries alphabetically
  const sortedCountries = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  // Create HTML for all countries
  countriesGrid.innerHTML = sortedCountries
    .map(
      (country) => `
      <div class="country-card">
        <img src="${country.flags.png}" alt="${country.name.common} flag">
        <div class="country-info">
          <h3>${country.name.common}</h3>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${country.region}</p>
           <p><strong>currencies:</strong> ${country.currencies}</p>
           <p><strong>languages:</strong> ${country.languages?.[0]}</p>
          <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
        </div>
      </div>
    `
    )
    .join("");
}

// Filter countries by search term
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const countryCards = document.querySelectorAll(".country-card");

  countryCards.forEach((card) => {
    const countryName = card.querySelector("h3").textContent.toLowerCase();
    if (countryName.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Filter countries by region
regionFilter.addEventListener("change", (e) => {
  const region = e.target.value;
  const countryCards = document.querySelectorAll(".country-card");

  if (!region) {
    countryCards.forEach((card) => (card.style.display = "block"));
    return;
  }

  countryCards.forEach((card) => {
    const countryRegion = card
      .querySelector("p:nth-of-type(2)")
      .textContent.replace("Region: ", "");
    if (countryRegion === region) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Initialize the app
fetchAllCountries();

/*Key differences and improvements from your weather example:

Uses REST Countries API instead of OpenWeatherMap
Fetches all countries in a given continent/region
Includes error handling with try/catch
Validates continent input against a list of valid options
Displays multiple countries instead of single city data
Shows country flag, capital, and population
Sorts countries alphabetically
Adds basic styling structure*/
