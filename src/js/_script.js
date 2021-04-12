'use strict'

document.addEventListener('DOMContentLoaded', () => {

    //! создание ползунка

    let slider = document.querySelector('[data-slider]'),
        btns = document.querySelector('.triangle'),
        btnLeft = document.querySelector('.left'),
        btnRight = document.querySelector('.right'),
        pagesPrice = document.querySelector('.form__text'),
        checkbox = document.querySelector('.checkbox'),
        check = document.querySelector('#checked');

        function textChanges(page, price) {
            let priceDiscount = price - (price/100 * 25);
            if (check.checked) {
                pagesPrice.innerHTML = `${page} PAGEVIEWS<div class='form__price'><span>$${priceDiscount.toFixed(2)}</span>/ month</div>`
            } else {
                pagesPrice.innerHTML = `${page} PAGEVIEWS<div class='form__price'><span>$${price.toFixed(2)}</span>/ month</div>`
            }
            
        }
    

        checkbox.addEventListener('click', () => {
            
            if (!check.checked) {
                checkbox.classList.add('checkbox_active')
            } else {
                checkbox.classList.remove('checkbox_active')
            }
        })

        slider.addEventListener('mousemove', () => {
            let sliderProgress = slider.value,
                sliderProgressColor = `linear-gradient(90deg, rgb(164, 243, 235) ${sliderProgress}%, rgb(236, 240, 251) ${sliderProgress}%)`;
    
                btns.style.left = `calc(${sliderProgress}% - (0.4px * ${sliderProgress}))`
    
                slider.style.background = sliderProgressColor;
                
                    if (sliderProgress == 0) {
                        textChanges('10K', 8)
                    } if (sliderProgress == 25) {
                        textChanges('50K', 12)
                    } if (sliderProgress == 50) {
                        textChanges('100K', 16)
                    } if (sliderProgress == 75) {
                        textChanges('500K', 24)
                    } if (sliderProgress == 100) {
                        textChanges('1M', 36)
                    }
                
        })


    btnLeft.addEventListener('click', (e) => {
        e.preventDefault();
        slider.value = +slider.value - 25;
    })

    btnRight.addEventListener('click', (e) => {
        e.preventDefault();
            slider.value = +slider.value + 25;
    })

});