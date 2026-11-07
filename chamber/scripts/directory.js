/* Directory page behaviour: switches the member list between grid and list
   views. base.css draws the selected button's border from aria-pressed. */

const gridButton = document.getElementById("grid-view");
const listButton = document.getElementById("list-view");

// Marks the clicked button as pressed and the other one as not.
function selectView(selectedButton) {
	gridButton.setAttribute("aria-pressed", String(selectedButton === gridButton));
	listButton.setAttribute("aria-pressed", String(selectedButton === listButton));
}

gridButton.addEventListener("click", () => selectView(gridButton));
listButton.addEventListener("click", () => selectView(listButton));
