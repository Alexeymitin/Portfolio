document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu"),
        hamburger = document.querySelector(".hamburger"),
        close = document.querySelectorAll("[data-close]");

    hamburger.addEventListener("click", (e) => {
        menu.classList.add("active");
    });

    close.forEach((item) => {
        item.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });
});
