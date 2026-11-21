/* Builds one label/value pair of the "thankyou" page as DOM nodes*/

export function thankyouItem(label, value) {
	const item = document.createDocumentFragment();
	const term = document.createElement("dt");
	const detail = document.createElement("dd");

	term.textContent = label;
	detail.textContent = value;
	item.append(term, detail);

	return item;
}
