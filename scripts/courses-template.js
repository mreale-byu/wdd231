// Builds the markup for the course cards.

// Returns the card for one course.
function courseCard(course) {
	return `<li class="course${course.completed ? ' completed' : ''}" title="${course.title}">
		<span class="course-mark" aria-hidden="true">✓</span>
		<span class="course-code">${course.subject} ${course.number}</span>
		${course.completed ? '<span class="visually-hidden">completed</span>' : ''}
	</li>`;
}

// Replaces the contents of the container with cards for the given courses.
function renderCourses(list, container) {
	container.innerHTML = list.map(courseCard).join('');
}
