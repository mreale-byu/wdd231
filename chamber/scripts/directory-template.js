/* Builds the card and row markup for one member. */

export function memberCard(member) {
	return `
		<article class="member-card">
			<h2>${member.name}</h2>
			<div class="member-logo">
				<img src="${member.logo}" alt="${member.name} logo" width="512" height="512" loading="lazy">
			</div>
			<div class="member-details">
				<p class="member-address">${member.address}</p>
				<p class="member-phone">Phone: ${member.phone}</p>
				<p class="member-level">Membership level <span class="badge ${member.levelClass}">${member.level}</span></p>
				<a class="member-link" href="${member.url}">Visit website</a>
			</div>
		</article>`;
}

export function memberRow(member) {
	return `
		<article class="member-row">
			<h2>${member.name}</h2>
			<p class="row-address">${member.address}</p>
			<p class="row-phone"><span class="row-label">Phone: </span>${member.phone}</p>
			<p class="row-level"><span class="row-label">Membership level </span><span class="badge ${member.levelClass}">${member.level}</span></p>
			<a class="row-link" href="${member.url}">Visit website</a>
		</article>`;
}
