// Filters the course cards by subject and keeps the buttons updated.

const filterRow = document.querySelector('.filters');
const courseList = document.querySelector('#course-list');
const totalCredits = document.querySelector('#total-credits');

let shownCourses = [];

// The credits of the shown courses.
function showTotalCredits() {
	totalCredits.textContent = shownCourses.reduce((total, course) => total + course.credits, 0);
}

// Uses filter to narrow the courses to one subject, or to every course for 'All'.
function showCourses(subject) {
	shownCourses = courses.filter((course) => subject === 'All' || course.subject === subject);
	renderCourses(shownCourses, courseList);
	showTotalCredits();
}

// Updates the clicked button as the pressed one.
function pressButton(button) {
	filterRow.querySelectorAll('.filter').forEach((filter) => {
		filter.setAttribute('aria-pressed', filter === button);
	});
}

filterRow.addEventListener('click', (event) => {
	const button = event.target.closest('.filter');
	if (!button) return;
	pressButton(button);
	showCourses(button.dataset.filter);
});

showCourses('All');
