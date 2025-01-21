function expandElement(element) {
    Array.from(
        element.parentElement.getElementsByClassName("faq-answer")
    ).forEach((item) => {
        item.classList.add("hidden")
    });

    Array.from(
        element.parentElement.getElementsByClassName("plus")
    ).forEach((item) => {
        item.classList.remove("hidden")
    });

    const  answer = element.getElementsByClassName("faq-answer")[0]
    answer.classList.remove('hidden')

    const plus = element.getElementsByClassName('plus')[0]
    plus.classList.add('hidden')

    // element.scrollIntoView({
    //     behavior: "smooth",
    //     block: "center", // Adjust to "start" or "center" as needed
    // });
}