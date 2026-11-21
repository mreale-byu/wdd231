/* Fills the "thankyou" page with data submitted by the join form. Every data arrives in the query string. */

import { thankyouItem } from "./thankyou-template.js";

const list = document.getElementById("thankyou-list");

const fields = [
	{ name: "first-name", label: "First name" },
	{ name: "last-name", label: "Last name" },
	{ name: "organizational-title", label: "Organization title" },
	{ name: "email", label: "Email address" },
	{ name: "phone", label: "Mobile phone number" },
	{ name: "organizational-name", label: "Organization name" },
	{ name: "membership", label: "Membership level" },
	{ name: "timestamp", label: "Application received" },
];

const levels = {
	np: "Non Profit Membership",
	bronze: "Bronze Membership",
	silver: "Silver Membership",
	gold: "Gold Membership",
};

function formatTimestamp(value) {
	const timestamp = new Date(value);
	return Number.isNaN(timestamp.getTime()) ? value : timestamp.toLocaleString();
}

function formatValue(name, value) {
	if (name === "membership") {
		return levels[value] ?? value;
	}

	if (name === "timestamp") {
		return formatTimestamp(value);
	}

	return value;
}

function showApplication() {
	
    const params = new URLSearchParams(window.location.search);

	for (const field of fields) {
		const value = (params.get(field.name) ?? "").trim();

		if (value !== "") {
			list.append(thankyouItem(field.label, formatValue(field.name, value)));
		}
	}

    /* Simple sanity check: calling thankyou.html page directly (no params) will send the user to join.html. */
	if (list.children.length === 0) {
		window.location.replace("join.html");
	}
	
}

showApplication();
