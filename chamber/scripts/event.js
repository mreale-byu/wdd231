/* Loads the event data and renders the upcoming events grid. */

import { eventCard } from "./event-template.js";

const accessLevels = {
	1: { label: "Open to all", modifier: "badge-member" },
	2: { label: "Members only", modifier: "badge-gold" },
	3: { label: "Ticketed", modifier: "badge-silver" }
};

const eventGrid = document.getElementById("event-grid");

async function fetchEvents() {
	const response = await fetch("data/events.json");
	if (!response.ok) {
		throw new Error(`Event data request failed with status ${response.status}`);
	}
	return response.json();
}

function prepareEvents(records) {
	return records.map((record) => {
		const access = accessLevels[record.access] ?? accessLevels[1];
		return {
			name: record.name,
			when: record.when,
			venue: record.venue,
			note: record.note,
			url: record.url,
			tag: access.label,
			tagClass: access.modifier
		};
	});
}

function renderEvents(events) {
	eventGrid.innerHTML = events.map(eventCard).join("");
}

async function showEvents() {
	try {
		renderEvents(prepareEvents(await fetchEvents()));
	} catch (error) {
		eventGrid.textContent = "The upcoming events could not be loaded.";
		console.error(error);
	}
}

showEvents();
