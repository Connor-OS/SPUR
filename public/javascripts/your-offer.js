const weeksInput = document.getElementById('weeks');
const costInput = document.getElementById('cost_per_week');

const total = document.getElementById('course-total')

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

costInput.addEventListener('valueChanged', calculate_total)
weeksInput.addEventListener('input', calculate_total);

calculate_total();
