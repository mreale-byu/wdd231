/* Opens and closes the small-screen navigation menu. */

const menuButton = document.getElementById("menu");

function toggleMenu() {
	const isOpen = menuButton.getAttribute("aria-expanded") === "true";
	menuButton.setAttribute("aria-expanded", String(!isOpen));
	menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
}

menuButton.addEventListener("click", toggleMenu);
