/* Weather card and forecast day. */

function forecastDay(day) {
	return `
				<article class="forecast-day">
					<p class="forecast-name">${day.name}</p>
					<img src="${day.icon}" alt="${day.description}" width="50" height="50" loading="lazy">
					<p class="forecast-description">${day.description}</p>
					<p class="forecast-min"><span class="temp-label">Min:</span> ${day.min}°</p>
					<p class="forecast-max"><span class="temp-label">Max:</span> ${day.max}°</p>
				</article>`;
}

export function weatherCard(current, forecast) {
	return `
		<p class="weather-title">${current.city} &middot; Now</p>
		<div class="weather-body">
			<div class="weather-now">
				<p class="weather-current">
					<img src="${current.icon}" alt="${current.description}" width="100" height="100">
					<span class="weather-temp">${current.temp}&deg;C</span>
				</p>
				<p class="weather-description">${current.description}</p>
			</div>
			<p class="weather-range">
				<span class="badge badge-cool">Min ${current.min}&deg;</span>
				<span class="badge badge-warm">Max ${current.max}&deg;</span>
			</p>
			<div class="forecast">
				<h3>3-Day Forecast</h3>
				<div class="forecast-days">${forecast.map(forecastDay).join("")}
				</div>
			</div>
		</div>`;
}
