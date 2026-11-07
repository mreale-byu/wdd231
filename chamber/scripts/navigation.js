/* Navigation behaviour for the SJC Chamber of Commerce site: opens and closes
   the small-screen menu. base.css reveals the nav while the button's
   aria-expanded attribute is "true". */

const menuButton = document.getElementById("menu");

// Flips the menu open state, keeping the button's ARIA state and label in sync.
function toggleMenu() {
	const isOpen = menuButton.getAttribute("aria-expanded") === "true";
	menuButton.setAttribute("aria-expanded", String(!isOpen));
	menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
}

menuButton.addEventListener("click", toggleMenu);
