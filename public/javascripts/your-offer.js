const costInput = document.getElementById('cost_per_week');
const courseInput = document.getElementById('courseDropdown');
const courseDateInput = document.getElementById('course_dates');

const total = document.getElementById('course-total')

function syncCourseSelection(element) {
    // ensure data is synced between the course selected at the top of the page and
    // the details form at the bottom
    Array.from(
        element.parentElement.getElementsByClassName("course")
    ).forEach((item) => deSelectCourse(item));

    selectCourse(element)

    courseInput.value = element.querySelector('h3').innerText;
    costInput.value = element.dataset.cost

    document.getElementById("course_name").innerHTML =
        element.querySelector('h3').innerText;

    document.getElementById("course_size").innerHTML =
        element.querySelector('li:nth-of-type(1) p').innerText;

    document.getElementById("course_schedule").innerHTML =
        element.querySelector('li:nth-of-type(2) p').innerText;

    calculate_total()
}


function deSelectCourse(course) {
    course.classList.remove("selected");
    const button = course.children[1];
    button.innerHTML = 'Select';
    button.style.width = '';
    button.style.padding = '';
}

function selectCourse(course) {
    course.classList.add("selected");
    const select_button = course.children[1];
    select_button.innerHTML = '<img src="images/icons/white-tick.svg" alt="tick">';
    select_button.style.width = 'auto';
    select_button.style.padding = '16px 8px';
}


function calculate_total() {
    // Get the value from the input (convert it to a number)
    const cost = parseFloat(costInput.value);

    const dates = courseDateInput.value.split(" - ");

    const start_date = new Date(dates[0])
    const end_date = new Date(dates[1])
    let length_of_study_weeks = (end_date.getDate() - start_date.getDate() + 3)/ 7
    console.log(length_of_study_weeks)

    // Check if the input is a valid number
    if (!isNaN(length_of_study_weeks) && !isNaN(cost)) {
        total.textContent = length_of_study_weeks * cost;
    }
}


courseInput.addEventListener('valueChanged', (event) =>
    syncCourseSelection(document.getElementById(courseInput.value)));
costInput.addEventListener('valueChanged', calculate_total);
courseDateInput.addEventListener('valueChanged', calculate_total);


calculate_total();
