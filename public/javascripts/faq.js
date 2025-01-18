function expandElement(plus) {
    const element = plus.parentElement;
    plus.classList.add('hidden')
    const minus = element.getElementsByClassName("minus")[0]
    minus.classList.remove('hidden')
    const  answer = element.parentElement.getElementsByClassName("faq-answer")[0]
    answer.classList.remove('hidden')
}

function collapseElement(minus) {
    const element = minus.parentElement;
    minus.classList.add('hidden')
    const plus = element.getElementsByClassName("plus")[0]
    plus.classList.remove('hidden')
    const  answer = element.parentElement.getElementsByClassName("faq-answer")[0]
    answer.classList.add('hidden')
}