document.addEventListener('DOMContentLoaded',function () {
	let selectorsHeader = document.querySelectorAll('#lang-selector--header .lang-selector__lang');
    let selectorsMenu = document.querySelectorAll('#lang-selector--menu .lang-selector__lang');
    selectorsHeader.forEach(function (select) {
        select.addEventListener('click',function () {
            let form = document.querySelector('#lang-selector--header');
            form.querySelector('input').value = this.dataset['langId'];
            form.submit();
        })
    });
    selectorsMenu.forEach(function (select) {
        select.addEventListener('click',function () {
            let form = document.querySelector('#lang-selector--menu');
            form.querySelector('input').value = this.dataset['langId'];
            form.submit();
        })
    });
});