/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDropdown(name) {
    document.getElementById(name).classList.toggle("show");
}

function selectDropdown(parent, value) {
    let DropdownElement = document.getElementById(parent)
    DropdownElement.value = value;
    DropdownElement.dispatchEvent(new Event('valueChanged'));
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropinput')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
