/* Loads the member data and renders the directory as a card grid or a list. */

import { memberCard, memberRow } from "./directory-template.js";

const membershipLevels = {
	1: { label: "Member", modifier: "badge-member" },
	2: { label: "Silver", modifier: "badge-silver" },
	3: { label: "Gold", modifier: "badge-gold" }
};

const gridButton = document.getElementById("grid-view");
const listButton = document.getElementById("list-view");
const directory = document.getElementById("directory");

let members = [];

async function fetchMembers() {
	const response = await fetch("data/members.json");
	if (!response.ok) {
		throw new Error(`Member data request failed with status ${response.status}`);
	}
	return response.json();
}

function prepareMembers(records) {
	return records.map((record) => {
		const level = membershipLevels[record.membership] ?? membershipLevels[1];
		return {
			name: record.name,
			address: record.address,
			phone: record.phone,
			url: record.url,
			logo: `images/${record.image}`,
			level: level.label,
			levelClass: level.modifier
		};
	});
}

function renderMembers(template) {
	directory.innerHTML = members.map(template).join("");
}

function showView(view) {
	directory.className = view;
	renderMembers(view === "list" ? memberRow : memberCard);
}

function selectView(selectedButton) {
	gridButton.setAttribute("aria-pressed", String(selectedButton === gridButton));
	listButton.setAttribute("aria-pressed", String(selectedButton === listButton));
	showView(selectedButton === listButton ? "list" : "grid");
}

async function showDirectory() {
	try {
		members = prepareMembers(await fetchMembers());
		showView("grid");
	} catch (error) {
		directory.textContent = "The member directory could not be loaded.";
		console.error(error);
	}
}

gridButton.addEventListener("click", () => selectView(gridButton));
listButton.addEventListener("click", () => selectView(listButton));

showDirectory();
