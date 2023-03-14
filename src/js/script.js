document.addEventListener("DOMContentLoaded", () => {
    //hamburger
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

    //skills complete

    const percent = document.querySelectorAll('.about__complete_wrapper p'),
          percentDisplay = document.querySelectorAll('.about__stats_background div');

    percent.forEach((item, i) => {
        percentDisplay[i].style.width = item.innerHTML;
    })

    //scrollUP
    const scrollUp = document.querySelector(".pageup");

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY;

        if (scrollTop >= 1400) {
            scrollUp.classList.add("active", "fadePageUP");
        } else {
            scrollUp.classList.remove("active", "fadePageUP");
        }
    });


    
});
