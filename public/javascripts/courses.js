// function selectCourse(element) {
//     Array.from(
//         element.parentElement.getElementsByClassName("course")
//     ).forEach((item) => {
//         item.classList.remove("selected");
//         const button = item.children[1];
//         button.innerHTML = 'Select';
//         button.style.width = '';
//         button.style.padding = '';
//     });
//
//     element.classList.add("selected");
//     const select_button = element.children[1];
//     select_button.innerHTML = '<img src="images/icons/white-tick.svg" alt="tick">';
//     select_button.style.width = 'auto';
//     select_button.style.padding = '16px 8px';
//
//     // console.log(element.querySelector('h3'))
//     document.getElementById("courseDropdown").value = element.querySelector('h3').innerText;
//     const costElement = document.getElementById("cost_per_week")
//     costElement.value = element.dataset.cost;
//     costElement.dispatchEvent(new Event('valueChanged'));
// }
