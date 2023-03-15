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

    // let error = formValidate(form);

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
                    // let json = JSON.parse(this.response); // Ебанный internet explorer 11
                    // console.log(json);

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

    inputEmail.addEventListener("input", () => {
        if (emailTest(inputEmail)) {
            formAddError(inputEmail);
            // error++;
        } else {
            formRemoveError(inputEmail);
        }
    });

    inputName.addEventListener("input", () => {
        if (nameTest(inputName)) {
            let Selection = inputName.selectionStart - 1;
            inputName.value = inputName.value.replace(/[^a-zA-Z]/g, "");
            inputName.setSelectionRange(Selection, Selection);
            formAddError(inputName);
        }
    });

    // function formValidate(form) {
    //     let error = 0;

    //     let formRequare = document.querySelectorAll(".req");

    //     for (let i = 0; i < formRequare.length; i++) {
    //         const input = formRequare[i];
    //         formRemoveError(input);
    //         formRemoveError(checkbox);

    //         if (input.getAttribute("type") === "email") {
    //             if (emailTest(input)) {
    //                 formAddError(input);
    //                 error++;
    //             }
    //         } else if (
    //             input.getAttribute("type") === "checkbox" &&
    //             input.checked === false
    //         ) {
    //             formAddError(checkbox);
    //             error++;
    //         } else {
    //             if (input.value === "") {
    //                 formAddError(input);
    //                 error++;
    //             }
    //         }
    //     }
    //     return error;
    // }

    function formAddError(input) {
        // input.parentElement.classList.add("error");
        input.classList.add("error");
    }

    function formRemoveError(input) {
        // input.parentElement.classList.remove("error");
        input.classList.remove("error");
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
            input.value
        );
    }

    function nameTest(input) {
        return !/[a-zA-ZА-Яа-яЁё]/.test(input.value);
    }
});
