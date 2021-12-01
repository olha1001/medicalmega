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

let yourOrder =  document.querySelectorAll('.your_order'),
    range = document.querySelectorAll('.range span'),
    leftFor = document.querySelectorAll('.left_for'),
    leftForPrice = document.querySelectorAll('.left_for span');

//total sum products
function calcSumShipping() {
    let sum = 0;
    document.querySelectorAll('.total-price b').forEach((totalPrice) => {
        sum += parseFloat(totalPrice.innerHTML);
        document.querySelectorAll('.total-values b').forEach((totalValues) => {
            totalValues.innerHTML = `$ ${sum.toFixed(2)}`;
        });
    });
    for (var i = 0; i < yourOrder.length; i++) {
        yourOrder[i].innerHTML = `<span>Your Order: </span> ${sum.toFixed(2)}`;
        range[i].style.width = sum * 100 / 150 + '%';
        leftForPrice[i].innerHTML = `$${(150 - sum).toFixed(2)}`
        if (sum < 150 && sum >= 130) {
            leftFor[i].innerHTML = `<span>$${(150 - sum).toFixed(2)} </span>  only left for free delivery`;
            document.querySelector('.popup .range_shipping_left h2').innerHTML = `Get Free Delivery`;
            document.querySelector('.popup .range_shipping_left p').innerHTML = `Add more products to your order`; 
        } else if (sum >= 150) {
            leftFor[0].innerHTML = `You Have Free Shipping`;
            leftFor[1].innerHTML = ``;
            document.querySelector('.popup .range_shipping_left h2').innerHTML = `You Have Free Shipping`;
            document.querySelector('.popup .range_shipping_left p').innerHTML = ``; 
        } else {
            document.querySelector('.popup .range_shipping_left h2').innerHTML = `Get Free Delivery`;
            document.querySelector('.popup .range_shipping_left p').innerHTML = `Add more products to your order`; 
            leftFor[i].innerHTML = `<span>$${(150 - sum).toFixed(2)} </span>  left for free delivery`;
        }
    }
}
calcSumShipping();

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
        calcSumShipping();
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
            calcSumShipping();
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
