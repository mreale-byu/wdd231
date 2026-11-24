/* Builds the card markup (template) for one upcoming event. */

export function eventCard(event) {
	return `
		<article class="event-card">
			<p class="event-when">${event.when}</p>
			<div class="event-body">
				<h3>${event.name}</h3>
				<p class="event-venue">${event.venue}</p>
				<p class="event-note">${event.note}</p>
				<p class="event-tag"><span class="badge ${event.tagClass}">${event.tag}</span></p>
			</div>
		</article>`;
}
