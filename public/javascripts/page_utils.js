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
    console.log(display_style)
    display_style === '' ? display_style = 'block': display_style = '';
    document.getElementById(id).style.display = display_style
}

function toggleReadMore(content_id) {
    const container = document.getElementById(content_id);

    const content = container.getElementsByClassName('read-more-content')[0];
    const button = container.getElementsByClassName('read-more-button')[0];

    content.classList.toggle('expanded');

    if (content.classList.contains('expanded')) {
        button.textContent = 'Read less';
    } else {
        button.textContent = 'Read more';
    }
}