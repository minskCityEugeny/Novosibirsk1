const btnDarkMode = document.querySelector(".dark-mode-btn");

// Проверка темной темы в localStorage
if(localStorage.getItem('darkMode') === 'dark') {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
}

// Проверка темной темы на уровне системных настроек
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
}

//Если меняются системные настройки то и меняется тема
window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', () => {
    const newColorScheme = event.matches ? "dark" : 'light';

    alert('Change!!!')

    if (newColorScheme = 'dark') {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
    } else {
    btnDarkMode.classList.remove("dark-mode-btn--active");
    document.body.classList.remove("dark");
    }
})

//Включение ночного режима по кнопке
btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle("dark-mode-btn--active");
    const isDark = document.body.classList.toggle('dark');
    
    if (isDark) {
        localStorage.setItem('darkMode', 'dark')
    } else {
        localStorage.setItem('darkMode', 'light')
    }

}


//Валидация формы
document.addEventListener('DOMContentLoaded', function (){
    
    const form = document.getElementById('form');
    
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

 
        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch ('sendmail.php', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                let result = await response.json();
                alert (result.message);
                formPreview.innerHTML = '';
                form.reset();
            } else {
                alert ("Ошибка");
                form.classList.remove('_sending');
            }
        } else {
            console.log('Ошибка')
            alert('Заполните обязательные поля');
        }
    }

        function formValidate (form) {
            
            let error = 0;
            let formReq = document.querySelectorAll('._req');
            

            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);

                if (input.classList.contains('_email')){
                    if (emailTest(input)) {
                        formAddError(input);
                        error++
                    }
                } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
                    formAddError(input);
                    error++;
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
            return error;
        }

        function formAddError(input) {
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
        }
        function formRemoveError(input) {
            input.parentElement.classList.add('_error');
            input.classList.remove('_error');
        }

        function emailTest(input) {
            return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input.value);

        }
    
});
