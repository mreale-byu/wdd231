/* Loads the member records and turns them into display-ready members. */

export const membershipLevels = {
	1: { label: "Member", modifier: "badge-member" },
	2: { label: "Silver", modifier: "badge-silver" },
	3: { label: "Gold", modifier: "badge-gold" }
};

export async function fetchMembers() {
	const response = await fetch("data/members.json");
	if (!response.ok) {
		throw new Error(`Member data request failed with status ${response.status}`);
	}
	return response.json();
}

export function prepareMembers(records) {
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
