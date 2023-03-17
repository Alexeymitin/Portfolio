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
        checkbox = document.querySelector(".contacts__policy_label input"),
        inputName = document.querySelector("#name"),
        inputEmail = document.querySelector("#email"),
        warningName = document.querySelector(".name_valid"),
        warningEmail = document.querySelector(".email_valid"),
        warningCheckbox = document.querySelector(".checkbox_valid"),
        warning = document.querySelectorAll(".valid");

    // let error = 0;

    let validitedEmail = false,
        validitedName = false;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validatingEmail();
        validatingName();
        validatingCheckbox();

        let formData = new FormData(form);

        if (
            validitedEmail === true &&
            validitedName === true &&
            inputName.value !== "" &&
            inputEmail.value !== "" &&
            checkbox.checked === true
        ) {
            console.log("Отправка запроса");
            // e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            warningCheckbox.classList.remove("visibly");
            let req = new XMLHttpRequest();
            req.open("POST", "sendmail.php", true);
            req.onload = function () {
                if (req.status >= 200 && req.status < 400) {
                    // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                    if (req.status === 200) {
                        // Если сообщение отправлено

                        form.reset();
                        bindModal(".modal__overlay", ".button_modal");
                    } else {
                        // Если произошла ошибка
                        alert(
                            "Ошибка. Сообщение не отправлено. Попробуйте позже" +
                                req.status
                        );
                    }
                    // Если не удалось связаться с php файлом
                } else {
                    bindModal(".modal__overlay", ".button_modal");
                    alert(
                        "Ошибка сервера. Номер: " +
                            req.status +
                            " Попробуйте позже или вышлите мне на почту n1kak@mail.ru код ошибки"
                    );
                }
            };

            // Если не удалось отправить запрос. Стоит блок на хостинге
            req.onerror = function () {
                alert("Ошибка отправки запроса");
            };
            req.send(formData);
        }
    });

   

    function validatingCheckbox() {
        if (checkbox.checked === false) {
            warningAdd(warningCheckbox);
        } else {
            warningRemove(warningCheckbox);
        }
    }

    function validatingEmail() {
        inputEmail.value = inputEmail.value.substring(0, 50);

        if (emailTest(inputEmail)) {
            formAddError(inputEmail);
            warningAdd(warningEmail);
            validitedEmail = false;
            // error++;
        } else {
            formRemoveError(inputEmail);
            warningRemove(warningEmail);
            validitedEmail = true;
            // error = 0;
        }
        return validitedEmail;
    }

    function validatingName() {
        let inputNameValue = getInputNameValue(inputName);

        inputName.value = inputNameValue.substring(0, 50);

        if (!inputNameValue) {
            formAddError(inputName);
            warningAdd(warningName);
            validitedName = false;
            // error++;
            return (inputName.value = "");
        } else {
            formRemoveError(inputName);
            warningRemove(warningName);
            validitedName = true;
            // error = 0;
        }
        return validitedName;
    }

    function warningAdd(warn) {
        warn.classList.add("visibly")
       }
    
       function warningRemove(warn) {
        warn.classList.remove("visibly")
       }
    

    inputEmail.addEventListener("input", validatingEmail);

    inputName.addEventListener("input", validatingName);

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

    //modal-thanks

    function bindModal(overlaySelector, closeSelector) {
        const overlay = document.querySelector(overlaySelector),
            buttonCloseModal = document.querySelector(closeSelector);

        function openModal() {
            overlay.classList.add("visibly");
            document.body.style.overflow = "hidden";
        }

        openModal();

        overlay.addEventListener("click", closeModal);

        function closeModal(e) {
            if (e.target == overlay || e.target == buttonCloseModal) {
                overlay.classList.remove("visibly");
                document.body.style.overflow = "";
                overlay.removeEventListener("click", closeModal);
            }
        }
    }
});
