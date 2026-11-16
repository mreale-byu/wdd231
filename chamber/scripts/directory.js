/* Loads the member data and renders the directory as a card grid or a list. */

import { fetchMembers, prepareMembers } from "./members.js";
import { memberCard, memberRow } from "./directory-template.js";

const gridButton = document.getElementById("grid-view");
const listButton = document.getElementById("list-view");
const directory = document.getElementById("directory");

let members = [];

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
