<template>
    <div class="container">
        <div class="header">
            <h1>WEATHER APP</h1>
            <div class="search-bar">
                <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
                <button @click="searchByCity" class="search-button">Search</button>
            </div>
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
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        });
      }
    },
    // 根据提供的API URL获取天气数据
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data; // 将返回的数据存储在 `weatherData` 中
      } catch (error) {
        console.error("获取天气数据时出错：", error);
      }
    },
    // 根据用户输入的城市名称搜索天气
    async searchByCity() {
      if (this.city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      }
    },
  },
};
</script>
