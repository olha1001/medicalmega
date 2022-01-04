let btnPlus = document.querySelectorAll('.btn-calc_plus'), //btn +
    btnMinus = document.querySelectorAll('.btn-calc_minus'), //btn -
    inputQty = document.querySelectorAll('.calc-qty'), //quantity input
    calc = document.querySelectorAll('.calc'), // calc wrapper +\-
    tabs = document.querySelectorAll('.tabs-discription li'), //tabs description
    contents = document.querySelectorAll('.content-discription .content-item'), // content discription
    dataButton = document.querySelectorAll('[data-button]'), // btn for open popup or block
    closeBtn = document.querySelectorAll('[data-close]'), //btn close for hide popup or block
    slidesNav = document.querySelectorAll('.slider-nav .slide'), //slides navigation
    slidesFor = document.querySelectorAll('.slider-for .slide'); //slider main

function changeQty(qty,action) {
    if (action == 'plus') {
        qty.value = parseInt(qty.value) + 1;
    } else if (action == 'minus') {
        qty.value = parseInt(qty.value) - 1;
    }
    if (qty.value > 1) {
        qty.previousElementSibling.disabled = false;
    } else {
        qty.previousElementSibling.disabled = true;
        qty.value = 1;
    }
}

//+/- btns quantity
calc.forEach((el, i) => {
    btnPlus[i].addEventListener('click', () => changeQty(inputQty[i],'plus'))
    btnMinus[i].addEventListener('click', () => changeQty(inputQty[i],'minus'))
})

//descriptions
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', () => {
        tabs[i].closest('.tabs-discription').querySelector('.active').classList.remove('active');
        contents[i].closest('.content-discription').querySelector('.active').classList.remove('active');
        tabs[i].classList.add('active');
        contents[i].classList.add('active');
    })
}

function toggleActive(getData, action) {
    if (document.querySelector(`[data-item=${getData}]`)) {
        if (action == true) {
            document.querySelector(`[data-item=${getData}]`).classList.add('active')
        } else {
            document.querySelector(`[data-item=${getData}]`).classList.remove('active')
        }
    }
}

for (let i = 0; i < dataButton.length; i++) {
    dataButton[i].addEventListener('click', () => toggleActive(dataButton[i].getAttribute('data-button'),true))
    closeBtn[i].addEventListener('click', () => toggleActive(closeBtn[i].getAttribute('data-close'),false))
}

slidesFor.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
        document.querySelector('.img-zoom-result').style.visibility = 'visible';
        document.querySelector('.img-zoom-lens').style.visibility = 'visible';
    })
    el.addEventListener('mouseout', (e) => {
        document.querySelector('.img-zoom-result').style.visibility = 'hidden';
        document.querySelector('.img-zoom-lens').style.visibility = 'hidden';
    })
})

//slider
slidesNav.forEach((el,i) => {
    el.addEventListener('click', () => {
        el.closest('.slider-nav').querySelector('.active').classList.remove('active');
        el.classList.add('active');

        let src = el.querySelector('img').getAttribute('src');
        document.querySelector('.slider-for_img').setAttribute('src',src)
        document.querySelector('.img-zoom-result').style.backgroundImage = `url("${src}")`
    })
})
