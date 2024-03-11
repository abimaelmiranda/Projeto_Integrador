document.addEventListener("DOMContentLoaded", function() {
    fetch("../pages/header.html")
        .then(response => response.text())
        .then(html => {
            document.querySelector("header").innerHTML = html;
        });
});