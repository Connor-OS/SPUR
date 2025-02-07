const costInput = document.getElementById('cost_per_week');
const courseInput = document.getElementById('courseDropdown');

const total = document.getElementById('course-total')

function syncCourseSelection(element) {
    Array.from(
        element.parentElement.getElementsByClassName("course")
    ).forEach((item) => deSelectCourse(item));

    selectCourse(element)

    document.getElementById("courseDropdown").value =
        element.querySelector('h3').innerText;

    document.getElementById("course_name").innerHTML =
        element.querySelector('h3').innerText;

    document.getElementById("course_size").innerHTML =
        element.querySelector('li:nth-of-type(1) p').innerText;

    document.getElementById("course_schedule").innerHTML =
        element.querySelector('li:nth-of-type(2) p').innerText;
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
    const weeks = parseFloat(weeksInput.value);
    const cost = parseFloat(costInput.value);


    // Check if the input is a valid number
    if (!isNaN(weeks) && !isNaN(cost)) {
        total.textContent = weeks * cost;
    } else {
        total.textContent = "-";
    }
}


courseInput.addEventListener('valueChanged', (event) =>
    syncCourseSelection(document.getElementById(courseInput.value)));
costInput.addEventListener('valueChanged', calculate_total)

// calculate_total();
