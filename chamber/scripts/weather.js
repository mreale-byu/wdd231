/* Loads the current weather conditions and the three-day forecast and renders the weather card. */

import { weatherCard } from "./weather-template.js";

const apiKey = "bc30c46ab11b017d7562ecbe7feaa0c6";
const city = { name: "São José dos Campos", lat: -23.139, lon: -45.926 };
const weatherUrl = (lat, lon, key) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
const forecastUrl = (lat, lon, key) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
const iconUrl = (icon, size = "@2x") => `https://openweathermap.org/img/wn/${icon}${size}.png`;
const getDayString = (date, weekday = "long") => date.toLocaleDateString("en-US", { weekday });
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const weather = document.getElementById("weather-card");

async function fetchCurrent() {
	const response = await fetch(weatherUrl(city.lat, city.lon, apiKey));
	if (!response.ok) {
		throw new Error(`Current weather request failed with status ${response.status}`);
	}
	return response.json();
}

async function fetchForecast() {
	const response = await fetch(forecastUrl(city.lat, city.lon, apiKey));
	if (!response.ok) {
		throw new Error(`Forecast request failed with status ${response.status}`);
	}
	return response.json();
}

function prepareCurrent(data) {
	return {
		city: city.name,
		temp: Math.round(data.main.temp),
		min: Math.round(data.main.temp_min),
		max: Math.round(data.main.temp_max),
		description: data.weather[0].description,
		icon: iconUrl(data.weather[0].icon)
	};
}

function prepareForecast(data) {
	const today = new Date().toDateString();
	const days = new Map();

	for (const item of data.list) {
		const date = new Date(item.dt * 1000);
		const key = date.toDateString();

		if (key === today) continue;
		if (!days.has(key) && days.size === 3) break;

		const day = days.get(key) ?? { date, min: Infinity, max: -Infinity, noon: Infinity, icon: "", description: "" };
		const noon = Math.abs(date.getHours() - 12);

		day.min = Math.min(day.min, item.main.temp_min);
		day.max = Math.max(day.max, item.main.temp_max);

		if (noon < day.noon) {
			day.noon = noon;
			day.icon = item.weather[0].icon;
			day.description = item.weather[0].description;
		}

		days.set(key, day);
	}

	return [...days.values()].map((day) => ({
		name: getDayString(day.date, "short"),
		min: Math.round(day.min),
		max: Math.round(day.max),
		description: capitalize(day.description),
		icon: iconUrl(day.icon, "")
	}));
}

async function showWeather() {
	try {
		const [current, forecast] = await Promise.all([fetchCurrent(), fetchForecast()]);
		weather.innerHTML = weatherCard(prepareCurrent(current), prepareForecast(forecast));
	} catch (error) {
		weather.textContent = "The weather could not be loaded.";
		console.error(error);
	}
}

showWeather();
