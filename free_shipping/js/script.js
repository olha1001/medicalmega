'use strict'

//initialization slider
let sliderCategories = tns({
    container: document.querySelector('.slider-gallery'),
    items: 4,
    autoplay: false,
    axis: 'horizontal',
    controls: true,
    loop: false,
    prevButton: document.querySelector('.swiper-button-prev'),
    nextButton: document.querySelector('.swiper-button-next'),
    autoplayButton: false,
    autoplayButtonOutput: false,
    mouseDrag: true,
    nav: false,
    preventScrollOnTouch: 'auto',
    swipeAngle: false,
    responsive: {
        1009: {
            items: 4,
        },
        320: {
            items: 2,
        }
    }
});

//total sum products
function sumTotalPrice() {
    let sum = 0;
    document.querySelectorAll('.total-price b').forEach((totalPrice) => {
        sum += parseFloat(totalPrice.innerHTML);
        document.querySelectorAll('.total-values b').forEach((totalValues) => {
            totalValues.innerHTML = `$ ${sum.toFixed(2)}`;
        });
    });
}
sumTotalPrice();

//change quantity
function quantityFun(el) {
    if (el.querySelector('.quantity').value < 2) {
        el.querySelector('.quantity').value = 1;
        el.querySelector('.quantity-btn_minus').disabled = true;
    } else {
        el.querySelector('.quantity-btn_minus').disabled = false;
    }
    el.querySelector('.quantity-row').addEventListener('change', () => {
        if (el.querySelector('.quantity').value < 2) {
            el.querySelector('.quantity').value = 1;
            el.querySelector('.quantity-btn_minus').disabled = true;
        } else {
            el.querySelector('.quantity-btn_minus').disabled = false;
        }
        el.querySelector('.total-price b').innerHTML = `${(parseFloat(el.querySelector('.quantity').value) * parseFloat(el.querySelector('.unit-price b').innerHTML)).toFixed(2)}`;
        sumTotalPrice();
    });
    el.querySelectorAll('.quantity-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            if (button.className == 'quantity-btn quantity-btn_plus') {
                button.previousElementSibling.value = +button.previousElementSibling.value + 1;
                button.parentElement.querySelector('.quantity-btn_minus').disabled = false;
            }
            if (button.className == 'quantity-btn quantity-btn_minus') {
                if (button.nextElementSibling.value < 2) {
                    button.nextElementSibling.value = 1;
                    button.disabled = true;
                } else {
                    button.nextElementSibling.value = +button.nextElementSibling.value - 1;
                }
            }
            el.querySelector('.total-price b').innerHTML = `${(parseFloat(el.querySelector('.quantity').value) * parseFloat(el.querySelector('.unit-price b').innerHTML)).toFixed(2)}`;
            sumTotalPrice();
        });
    });
}

//open popup
function openPopup() {
    document.querySelector('.popup').classList.add('isActive');
}

document.querySelector('.shoppingcart').addEventListener('click', openPopup);

//click on add-to-cart button
document.querySelectorAll('.add-to-cart button').forEach((item, index) => {
    item.addEventListener('click', () => {
        let valueP = 1;
        valueP = +item.nextElementSibling.value;
        openPopup()
    });
});

//click on plus/minus button
document.querySelectorAll('.popup__product').forEach(el => quantityFun(el))

//hide popup
function hidePopup() {
    document.querySelector('.popup').classList.remove('isActive');
}

document.querySelector('.popup .continue-shopping').addEventListener('click', hidePopup);
document.querySelector('.popup .close').addEventListener('click', hidePopup);

function resize() {
    if (window.matchMedia("(max-width: 1009px)").matches) {
        console.log('r1')
        document.querySelectorAll('.product-description b').forEach((el, i) => {
            el.after(el.closest('.popup__product').querySelector('.quantity-row'));
        });
        document.querySelector('.paypal-button input[type="image"]').setAttribute('src', 'https://olha1001.github.io/medicalmega/pl_cart/img/pay.png');
        document.querySelector('.popup__bottom .paypal-button').before(document.querySelector('.popup__product-total'));
        document.querySelector('.popup__bottom').before(document.querySelector('.bought-products'));
        document.querySelector('.bought-products .title3').innerHTML = 'You May Also Like';
    } else {
        document.querySelector('.paypal-button input[type="image"]').setAttribute('src', 'https://i.ibb.co/CJCszqD/btn-paywith-primary-l-1.png')
        document.querySelector('.body').after(document.querySelector('.popup__product-total'));
        document.querySelector('.bought-products').before(document.querySelector('.popup__bottom'));
        document.querySelector('.bought-products .title3').innerHTML = 'Also bought with this products';
        document.querySelectorAll('.popup__product td .q').forEach((el, i) => {
            el.after(el.closest('.popup__product').querySelector('.quantity-row'));
        });
    }
}
resize()
window.addEventListener('resize', resize);