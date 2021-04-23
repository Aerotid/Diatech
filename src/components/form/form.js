import {Input, Phone, Message, Email} from '../../components/input/input';
import jQuery from 'jquery';


export default class Form {
    get nSubmit() {
        if (!this.submit) {
            this.submit = this.nRoot.querySelector('.btn');
        }
        return this.submit;
    }

    constructor(nRoot) {
        this.map = {
            'data-phone': Phone,
            'data-email': Email,
            'data-message': Message,
        };
        this.nRoot = nRoot;

        this.fields = [...this.nRoot.querySelectorAll('[data-input-group]')].map(nGroup => {
            const keys = Object.keys(this.map).filter(key => nGroup.hasAttribute(key));
            let cls = Input;
            if (keys.length > 0) {
                cls = this.map[keys[0]];
            }
            return new cls(nGroup);
        });
        this.nSubmit.addEventListener('click', e => {
            e.preventDefault();
            let isValid = this.validate();
            if(isValid) {
                this.ajax();
            }
        });

        //
        // let message = new Object();
        // message.loading = 'Загрузка...';
        // message.success = 'Спасибо! У Вас все получилось';
        // message.failure = 'Ээххх! Что-то пошло не так...';
        //
        // let statusMessage = document.createElement('div');
        // statusMessage.className = 'status';
        //
        // // Настройка AJAX запроса
        // let request = new XMLHttpRequest();
        // request.open('POST', 'http://weblab.ua/wp-content/uploads/ajaxmoka/ajax-simple.json', true);
        // request.setRequestHeader('accept', 'application/json');
        //
        // // Добавляем обработчик на событие `submit`
        // nRoot.addEventListener('submit', function(event) {
        //     event.preventDefault();
        //     nRoot.appendChild(statusMessage);
        //
        //     // Это простой способ подготавливить данные для отправки (все браузеры и IE > 9)
        //     let formData = new FormData(nRoot);
        //
        //     // Отправляем данные
        //     request.send(formData);
        //
        //     // Функция для наблюдения изменения состояния request.readyState обновления statusMessage соответственно
        //     request.onreadystatechange = function () {
        //         // <4 =  ожидаем ответ от сервера
        //         if (request.readyState < 4)
        //             statusMessage.innerHTML = message.loading;
        //         // 4 = Ответ от сервера полностью загружен
        //         else if (request.readyState === 4) {
        //             // 200 - 299 = успешная отправка данных!
        //             if (request.status == 200 && request.status < 300)
        //                 statusMessage.innerHTML = message.success;
        //             else
        //                 nRoot.insertAdjacentHTML('beforeend', message.failure);
        //         }
        //     }
        // });



    }



    validate() {
        const a = this.fields.map(field => field.validate())
        console.log(a);
        const isValid = this.fields.every(field => field.validate());
        if(!isValid)
        console.log(`Is valid: ${isValid}`);
        return isValid;
    }

    ajax() {
        let textSuccess = null;
        let textError = null;
        if(document.body.dataset.lang === 'EN') {
            textSuccess = 'Thank you for your application';
            textError = 'Mistake. Data not sent';
        }
        else {
            textSuccess = 'Спасибо. Ваша заявка принята';
            textError = 'Ошибка. Данные не отправлены';
        }
        const form = jQuery('.form form');
        jQuery.ajax({
            type: "POST",
            url: form.attr('action'),
            data: form.serialize(),
            success: function(response) {
                document.querySelector('.btn').innerHTML = textSuccess;
            },
            error: function(response) {
                document.querySelector('.btn').innerHTML = textError;
            }
        });
        return false;
    }

}