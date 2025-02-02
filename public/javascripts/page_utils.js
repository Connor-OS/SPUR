function what_is_waiting_select(element, id_num) {

    Array.from(
        document.getElementById("what-is-waiting-selection").children
    ).forEach((item) => {
        item.classList.remove("selected")
    });

    element.classList.add("selected");

    Array.from(
        document.getElementById("what-is-waiting-info").children
        ).forEach((item) => {
        item.classList.add("hidden");
    });

    document.getElementById("what-is-waiting-info" + id_num).classList.remove("hidden");
}

function hide_unhide(id) {
    let display_style = document.getElementById(id).style.display;
    display_style === 'none' ? display_style = 'block': display_style = 'none';
    document.getElementById(id).style.display = display_style
}
