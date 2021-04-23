'use strict'

document.addEventListener('DOMContentLoaded', () => {

    //! создание ползунка

    let slider = document.querySelector('[data-slider]'),
        pagesPrice = document.querySelector('.form__text'),
        checkbox = document.querySelector('.checkbox'),
        check = document.querySelector('#checked'),
        modal = document.querySelector('.modal'),
        btn = document.querySelectorAll('.button');


        //Вызов модального окна
        btn.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.toggle('modal_active');
            })
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.toggle('modal_active');
            }
        })

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                modal.classList.remove('modal_active')
            }
        })
        


        //Закрашивание progressbar  
        function sliderProgress() {
            let sliderProgressColor = `linear-gradient(90deg, rgb(164, 243, 235) ${slider.value}%, rgb(236, 240, 251) ${slider.value}%)`;
                slider.style.background = sliderProgressColor;
        }
        sliderProgress();

        //Изменения на странице Вместе с ползунком
        function textChanges(page, price) {

            let priceDiscount = price - (price/100 * 25);

            if (check.checked) {
                pagesPrice.innerHTML = `${page} PAGEVIEWS<div class='form__price'><span>$${priceDiscount.toFixed(2)}</span>/ month</div>`
            } else {
                pagesPrice.innerHTML = `${page} PAGEVIEWS<div class='form__price'><span>$${price.toFixed(2)}</span>/ month</div>`
            }
        }
    
        function priceChanges() {

            switch (slider.value) {
                case '0' :
                    textChanges('10K', 8);
                    break;
                case '25' : 
                    textChanges('50K', 12);
                    break;
                case '50' :
                    textChanges('100K', 16);
                    break;
                case '75' : 
                    textChanges('500K', 24);
                    break;
                case '100' : 
                    textChanges('1M', 36);
                    break;
            }
        }

        priceChanges();

        checkbox.addEventListener('click', () => {

            if (!check.checked) {
                checkbox.classList.add('checkbox_active');
                checkbox.classList.remove('checkbox_disabled');
            } else {
                checkbox.classList.remove('checkbox_active');
                checkbox.classList.add('checkbox_disabled');
            }

        })

        check.addEventListener('change', priceChanges)

        priceChanges();

        slider.addEventListener('input', () => {
            sliderProgress();
            priceChanges();   
        })

});