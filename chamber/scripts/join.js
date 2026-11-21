/* Initializes the form with the timestamp and controls the membership levels dialog. */

const timestamp = document.getElementById("timestamp");
const modal = document.getElementById("join-modal");
const modalTitle = document.getElementById("join-modal-title");
const modalContent = document.getElementById("join-modal-content");
const modalCloseButton = document.getElementById("close-modal");

/* For simplicity, levels are indexed by the button id. */
const levels = {
	"btn-np": {
		title: "Non Profit Membership",
		content:
			"No annual fee. Open to registered non-profit organisations serving São José dos Campos. " +
			"Includes a directory listing, access to chamber events at member rates and the monthly newsletter.",
	},
	"btn-bronze": {
		title: "Bronze Membership",
		content:
			"Entry level for small businesses. Everything in the non-profit tier, plus two free places at " +
			"each training workshop and a quarterly slot in the chamber's social media roundup.",
	},
	"btn-silver": {
		title: "Silver Membership",
		content:
			"For established businesses. Everything in Bronze, plus eligibility for the home page member " +
			"spotlight, a featured directory listing and discounted exhibition space at chamber trade events.",
	},
	"btn-gold": {
		title: "Gold Membership",
		content:
			"Full partnership. Everything in Silver, plus priority spotlight placement, a speaking slot at " +
			"the annual business forum and free use of the chamber meeting rooms.",
	},
};

function openLevelDialog(id) {
	const level = levels[id];

	if (!level) {
		return;
	}

	modalTitle.textContent = level.title;
	modalContent.textContent = level.content;
	modal.showModal();
}

timestamp.value = new Date().toISOString();

Object.keys(levels).forEach((id) => {
	/** Wireup the click event for each membership level button (based on its id) */
	document.getElementById(id).addEventListener("click", () => openLevelDialog(id));
});

modalCloseButton.addEventListener("click", () => modal.close());

/* Clicking the background closes the modal. */
modal.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.close();
	}
});
