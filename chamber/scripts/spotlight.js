/* Renders up to three random Silver or Gold members as the member spotlights. */

import { fetchMembers, prepareMembers } from "./members.js";
import { memberCard } from "./directory-template.js";

const spotlight = document.getElementById("spotlight");

function pickRandom(list, count) {
	const pool = [...list];
	const picked = [];

	while (picked.length < count && pool.length > 0) {
		const index = Math.floor(Math.random() * pool.length);
		picked.push(pool[index]);
		pool.splice(index, 1);
	}

	return picked;
}

function renderSpotlight(members) {
	spotlight.innerHTML = members.map(memberCard).join("");
}

async function showSpotlight() {
	try {
		const records = await fetchMembers();
		const eligible = records.filter((record) => record.membership === 2 || record.membership === 3);
		renderSpotlight(prepareMembers(pickRandom(eligible, 3)));
	} catch (error) {
		spotlight.textContent = "The member spotlights could not be loaded.";
		console.error(error);
	}
}

showSpotlight();
