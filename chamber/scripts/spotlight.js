/* Renders up to three random Silver or Gold members as the member spotlights. */

import { fetchMembers, prepareMembers } from "./members.js";
import { memberCard } from "./directory-template.js";

const spotlight = document.getElementById("spotlight");

function randomizeList(list) {
	const items = [...list];

	for (let i = items.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = items[i];
		items[i] = items[j];
		items[j] = temp;
	}

	return items;
}

function renderSpotlight(members) {
	spotlight.innerHTML = members.map(memberCard).join("");
}

async function showSpotlight() {
	try {
		const records = await fetchMembers();
		const eligible = records.filter((record) => record.membership === 2 || record.membership === 3);
		renderSpotlight(prepareMembers(randomizeList(eligible).slice(0, 3)));
	} catch (error) {
		spotlight.textContent = "The member spotlights could not be loaded.";
		console.error(error);
	}
}

showSpotlight();
