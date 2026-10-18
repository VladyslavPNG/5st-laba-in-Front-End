document.addEventListener("DOMContentLoaded", function () {
    
    const form = document.getElementById("myForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Зупиняємо відправку форми
        let isValid = true;

        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => input.classList.remove("error"));

        // 1. ПІБ (Т.Т.Т.Т.Т.Т.) - Тільки літери, крапки та пробіли
        const pib = document.getElementById("pib");
        const pibRegex = /^[А-Яа-яІіЇїЄєA-Za-z\.\s]+$/;
        if (!pibRegex.test(pib.value.trim()) || pib.value.trim().length < 3) {
            pib.classList.add("error");
            isValid = false;
        }

        // 3. Група (ТТ-ЧЧ) - 2 літери, дефіс, 2 цифри
        const group = document.getElementById("group");
        const groupRegex = /^[А-ЯA-Z]{2}-\d{2}$/i;
        if (!groupRegex.test(group.value.trim())) {
            group.classList.add("error");
            isValid = false;
        }

        // 4. Телефон (ЧЧЧ-ЧЧЧ-ЧЧЧ) або з дужками
        const phone = document.getElementById("phone");
        const phoneRegex = /^\(\d{3}\)-\d{3}-\d{3}-\d{3}$|^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            phone.classList.add("error");
            isValid = false;
        }

        // 7. Дата народження (чч.чч.чччч)
        const dob = document.getElementById("dob");
        const dobRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!dobRegex.test(dob.value.trim())) {
            dob.classList.add("error");
            isValid = false;
        }

        // 8. Адреса (м. + текст)
        const address = document.getElementById("address");
        const addressRegex = /^м\.\s+[А-Яа-яІіЇїЄєA-Za-z\s\,\.]+$/i;
        if (!addressRegex.test(address.value.trim())) {
            address.classList.add("error");
            isValid = false;
        }

        // 9. e-mail (TTTTTT@TTTTTT.com)
        const email = document.getElementById("email");
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add("error");
            isValid = false;
        }

        if (isValid) {
            alert(`Введені дані:\n
ПІБ: ${pib.value}
Група: ${group.value}
Телефон: ${phone.value}
Дата народження: ${dob.value}
Адреса: ${address.value}
E-mail: ${email.value}`);
            form.reset();
        } else {
            alert("Будь ласка, виправте виділені поля!");
        }
    });


    const table = document.getElementById("gridTable");
    const colorPicker = document.getElementById("colorPicker");
    const variantNumber = 10; 
    let counter = 1;

    for (let i = 0; i < 6; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < 6; j++) {
            const td = document.createElement("td");
            td.textContent = counter;
            td.dataset.index = counter; 
            td.dataset.row = i;         
            td.dataset.col = j;         

            td.addEventListener("mouseover", function () {
                if (parseInt(this.dataset.index) === variantNumber) {
                    this.style.backgroundColor = getRandomColor();
                }
            });

            td.addEventListener("mouseout", function () {
                if (parseInt(this.dataset.index) !== variantNumber) {
                    this.style.backgroundColor = "";
                }
            });

            td.addEventListener("click", function () {
                this.style.backgroundColor = colorPicker.value;
            });

            td.addEventListener("dblclick", function () {
                const currentRow = parseInt(this.dataset.row);
                const currentCol = parseInt(this.dataset.col);
                
                const rowCells = table.rows[currentRow].cells;
                
                for (let c = currentCol; c < 6; c += 2) {
                    rowCells[c].style.backgroundColor = getRandomColor();
                }
            });

            tr.appendChild(td);
            counter++;
        }
        table.appendChild(tr);
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});