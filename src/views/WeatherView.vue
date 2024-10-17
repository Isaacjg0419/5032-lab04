<template>
    <div class="container">
      <div class="header">
        <h1>Weather App</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name"
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
  
      <main>
        <div v-if="weatherData">
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const apikey = "005d4f65e27d657fa79f18a1e68feebc";
  
  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        errorMessage: null,
      };
    },
    computed: {
      temperature() {
        return this.weatherData ? Math.floor(this.weatherData.main.temp - 273.15) : null;
      },
      iconUrl() {
        return this.weatherData
          ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
              await this.fetchWeatherData(url);
            },
            (error) => {
              this.errorMessage = "Unable to get your location.";
              console.error("Geolocation error:", error);
            }
          );
        } else {
          this.errorMessage = "This browser does not support geolocation.";
        }
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data; 
          this.errorMessage = null; 
        } catch (error) {
          this.weatherData = null; 
          this.errorMessage = "Error fetching weather data, please try again."; 
          console.error("Error fetching weather data:", error);
        }
      },
      async searchByCity() {
        if (this.city.trim()) {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        } else {
          this.errorMessage = "Please enter a valid city name."; 
        }
      },
    },
  };
  </script>
  
  <style>
  .container {
    width: 80%;
    margin: auto;
    text-align: center;
  }
  
  .header {
    margin-bottom: 20px;
  }
  
  .search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    font-size: 16px;
    width: 200px;
    margin-right: 10px;
  }
  
  .search-button {
    padding: 10px 20px;
    font-size: 16px;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  