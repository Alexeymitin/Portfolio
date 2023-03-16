"use strict";

document.addEventListener("DOMContentLoaded", () => {
    //hamburger
    const menu = document.querySelector(".menu"),
        hamburger = document.querySelector(".hamburger"),
        close = document.querySelectorAll("[data-close]");

    hamburger.addEventListener("click", (_e) => {
        menu.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    close.forEach((item) => {
        item.addEventListener("click", () => {
            menu.classList.remove("active");
            document.body.style.overflow = "";
        });
    });

    //skills complete

    const percent = document.querySelectorAll(".about__complete_wrapper p"),
        percentDisplay = document.querySelectorAll(
            ".about__stats_background div"
        );

    percent.forEach((item, i) => {
        percentDisplay[i].style.width = item.innerHTML;
    });

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

    //Send form

    const form = document.querySelector(".contacts__form"),
        checkbox = document.querySelector(".contacts__policy_label span"),
        inputName = document.querySelector("#name"),
        inputEmail = document.querySelector("#email");

    form.addEventListener("submit", formSend);

    let error = formValidate(form);

    function formSend(e) {
        e.preventDefault();

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add("sending");
            console.log("Отправка запроса");
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            let req = new XMLHttpRequest();
            req.open("POST", "sendmail.php", true);
            req.onload = function () {
                if (req.status >= 200 && req.status < 400) {
                    // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                    if (req.status === 200) {
                        // Если сообщение отправлено
                        form.classList.remove("sending");
                        console.log(req.response);
                        alert("Сообщение отправлено" + req.status);
                    } else {
                        // Если произошла ошибка
                        form.classList.remove("sending");
                        alert("Ошибка. Сообщение не отправлено");
                    }
                    // Если не удалось связаться с php файлом
                } else {
                    alert("Ошибка сервера. Номер: " + req.status);
                }
            };

            // Если не удалось отправить запрос. Стоит блок на хостинге
            req.onerror = function () {
                alert("Ошибка отправки запроса");
            };
            req.send(formData);
        }
    }

    inputEmail.addEventListener("input", (e) => {
        console.log(inputEmail.value.length);
        inputEmail.value = inputEmail.value.substring(0, 50);
        if (emailTest(inputEmail)) {
            formAddError(inputEmail);
        } else {
            formRemoveError(inputEmail);
        }
    });

    inputName.addEventListener("input", onNameInput);
    inputName.addEventListener("paste", (e) => {
        onNameInput();
    });

    function onNameInput(e) {
        let input = e.target,
            inputNameValue = getInputNameValue(input);

        input.value = inputNameValue.substring(0, 50);

        if (!inputNameValue) {
            formAddError(inputName);
            return (input.value = "");
        } else {
            formRemoveError(inputName);
        }
    }

    function formAddError(input) {
        input.classList.add("error");
    }

    function formRemoveError(input) {
        input.classList.remove("error");
    }

    function emailTest(input) {
        return !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value);
    }

    function getInputNameValue(input) {
        return input.value.replace(/[^a-zA-ZА-Яа-яЁё ]/, "");
    }
});
