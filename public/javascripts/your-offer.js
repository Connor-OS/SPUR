const courseInput = document.getElementById('courseDropdown');
const courseCost = document.getElementById('cost_course');
const courseDateInput = document.getElementById('course_dates');

const accommodationInput = document.getElementById('accommodationDropdown');
const accommodationCost = document.getElementById('cost_accommodation');
const accommodationDateInput = document.getElementById('accommodation_dates');

function syncCourseSelection(element) {
    // ensure data is synced between the course selected at the top of the page and
    // the details form at the bottom
    Array.from(
        element.parentElement.getElementsByClassName("course")
    ).forEach((item) => deSelectElement(item));

    selectElement(element);

    courseInput.value = element.querySelector('h3').innerText;
    courseCost.value = element.dataset.cost;

    populateDetails(element, "course");
    calculate_total();
}

function syncAccommodationSelection(element) {
    // ensure data is synced between the accommodation selected at the top of the page and
    // the details form at the bottom
    Array.from(
        element.parentElement.getElementsByClassName("accommodation")
    ).forEach((item) => deSelectElement(item));
    
    selectElement(element);

    accommodationInput.value = element.querySelector('h3').innerText;
    accommodationCost.value = element.dataset.cost

    populateDetails(element, "accommodation");

    const extraCosts = element.querySelectorAll('input[data-cost]:checked');
    Array.from(extraCosts).forEach((item) => accommodationCost.value = Number(accommodationCost.value) + Number(item.dataset.cost))
    calculate_total();
}

function deSelectElement(element) {
    element.classList.remove("selected");
    const button = element.children[1];
    button.innerHTML = 'Select';
    button.style.width = '';
    button.style.padding = '';
}

function selectElement(element) {
    element.classList.add("selected");
    const select_button = element.children[1];
    select_button.innerHTML = '<img src="images/icons/white-tick.svg" alt="tick">';
    select_button.style.width = 'auto';
    select_button.style.padding = '16px 8px';
}

function populateDetails(sourceElement, destination) {
    // copy Html
    const detailsElement = document.getElementById(destination + "-details");
    detailsElement.innerHTML = sourceElement.innerHTML

    //Sync any checkboxes that might be in the source element
    const sourceCheckboxes = sourceElement.querySelectorAll('input[type="checkbox"]');
    const destinationCheckboxes = detailsElement.querySelectorAll('input[type="checkbox"]');

    destinationCheckboxes.forEach((checkbox, index) => {
        checkbox.checked = sourceCheckboxes[index].checked;
    });
}

function dateHelper(dateString) {
    let d = dateString.split("/");
    return new Date(d[2] + '/' + d[1] + '/' + d[0]);
}


function calculate_total() {
    // Get the value from the input (convert it to a number)
    const coursePerWeek = parseFloat(courseCost.value);

    let dates = courseDateInput.value.split(" - ");

    let start_date = dateHelper(dates[0])
    let end_date = dateHelper(dates[1])
    const length_of_study_weeks = (end_date.getDate() - start_date.getDate() + 3)/ 7

    const courseTotal = document.getElementById('course-total')
    // Check if the input is a valid number
    if (!isNaN(length_of_study_weeks) && !isNaN(coursePerWeek)) {
        courseTotal.textContent = length_of_study_weeks * coursePerWeek;
    }

    const accommodationPerWeek = parseFloat(accommodationCost.value);

    dates = accommodationDateInput.value.split(" - ");
    start_date = dateHelper(dates[0])
    end_date = dateHelper(dates[1])
    const length_of_stay_days = end_date.getDate() - start_date.getDate()

    const accommodationTotal = document.getElementById('accommodation-total')
    if (!isNaN(length_of_stay_days) && !isNaN(accommodationPerWeek)) {
        accommodationTotal.textContent = length_of_stay_days * accommodationPerWeek;
    }

    document.getElementById('total').textContent = parseFloat(accommodationTotal.textContent) + parseFloat(courseTotal.textContent) + parseFloat(document.getElementById('admission_fee').textContent);
}

// ensure exclusive checkboxes
$(document).on('click', 'input[type="checkbox"].exclusive', function(event) {
    if ($(this).prop('checked')) {
        const checkboxGroup = $('input[type="checkbox"].exclusive').not($(this));
        checkboxGroup.prop('checked', !$(this).prop('checked'));
    }
});

// Link checkboxes in group
$(document).on('click', 'input[type="checkbox"][data-group]', function(event) {
    const checkboxGroup = $('input[type="checkbox"][data-group="' + $(this).data('group') + '"]');
    checkboxGroup.prop('checked', $(this).prop('checked'));
    syncAccommodationSelection(document.getElementById(accommodationInput.value))
});

const dateInput = document.getElementById('date');
courseDateInput.value = dateInput.value
accommodationDateInput.value = dateInput.value

function dontNeedHousing(checkbox) {
    const accommodationElements = document.getElementsByClassName("accommodation");

    if (checkbox.checked === true) {
        Array.from(accommodationElements).forEach((item) => item.classList.add("hidden"));
        accommodationDateInput.classList.add("deactive");
        document.getElementById("accommodation-details").classList.add("hidden")
        
        accommodationInput.value = "I do not need housing";
        accommodationCost.value = 0
        
        calculate_total();
    } else {
        accommodationInput.value = "";
        Array.from(accommodationElements).forEach(function (item) {
            item.classList.remove("hidden");
            if (item.classList.contains("selected")) {
                accommodationInput.value = item.querySelector('h3').innerText;
                syncAccommodationSelection(document.getElementById(accommodationInput.value))
            }
        })

        accommodationDateInput.classList.remove("deactive");
        document.getElementById("accommodation-details").classList.remove("hidden")
    }
}

courseInput.addEventListener('valueChanged', (event) =>
    syncCourseSelection(document.getElementById(courseInput.value)));
accommodationInput.addEventListener('valueChanged', (event) =>
    syncAccommodationSelection(document.getElementById(accommodationInput.value)));

courseDateInput.addEventListener('valueChanged', calculate_total);
accommodationDateInput.addEventListener('valueChanged', calculate_total);

calculate_total();