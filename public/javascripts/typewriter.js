
const languages = ["English",
    "Spanish",
    "Japanese",
    "French",
    "Chinese",
    "German",
    "Arabic"]


document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById('typed-out');

    i = 0;
    element.addEventListener('animationiteration', () => {
        element.textContent = `Learn ${languages[++i % languages.length]}.`
    });
});

function myFunction() {
    alert('Animation has completed!');
}
