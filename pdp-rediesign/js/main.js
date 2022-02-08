let btnPlus = document.querySelectorAll('.btn-calc_plus'), //btn +
    btnMinus = document.querySelectorAll('.btn-calc_minus'), //btn -
    inputQty = document.querySelectorAll('.calc-qty'), //quantity input
    calc = document.querySelectorAll('.calc'), // calc wrapper +\-
    tabs = document.querySelectorAll('.tabs-discription li'), //tabs description
    contents = document.querySelectorAll('.content-discription .content-item'), // content discription
    dataButton = document.querySelectorAll('[data-button]'), // btn for open popup or block
    closeBtn = document.querySelectorAll('[data-close]'), //btn close for hide popup or block
    slidesNav = document.querySelectorAll('.slider-nav .slide'), //slides navigation
    slidesFor = document.querySelectorAll('.slider-for .slide'), //slider main
    price = document.querySelectorAll('.pr'), //price
    alphabet = document.querySelectorAll('.alphabet li'), //alphabets
    listCategories = document.querySelectorAll('.list_categories ul'); //list categories


function changeQty(qty,pr,action) {
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
    pr.innerHTML= (+pr.dataset.price * +qty.value).toFixed(2)
    if (qty.closest('.product_sidebar') && qty.value > 1) {
        document.querySelector('.product_sidebar .add-cart span').hidden = false;
    } else {
        document.querySelector('.product_sidebar .add-cart span').hidden = true;
    }
}

//+/- btns quantity
calc.forEach((el, i) => {
    btnPlus[i].addEventListener('click', () => changeQty(inputQty[i], price[i],'plus'))
    btnMinus[i].addEventListener('click', () => changeQty(inputQty[i], price[i],'minus'))
    inputQty[i].addEventListener('input', () => changeQty(inputQty[i], price[i]))
})

//change Class active
function toggleClass(item,content,event) {
    for (let i = 0; i < item.length; i++) {
        item[i].addEventListener(event, () => {
            item[i].parentElement.querySelector('.active').classList.remove('active');
            content[i].parentElement.querySelector('.active').classList.remove('active');
            item[i].classList.add('active');
            content[i].classList.add('active');
        })
    }
}

toggleClass(tabs,contents,'click') //descriptions
toggleClass(alphabet,listCategories,'mouseover') //all categories 

function toggleActive(getData) {
    if (document.querySelector(`[data-item=${getData}]`)) {
        document.querySelector(`[data-item=${getData}]`).classList.toggle('active')
        if (getData == 'advanced-search') {
            document.querySelector(`[data-button=${getData}]`).classList.toggle('active')
            document.querySelector(`.nav_category`).classList.remove('active')
        }
    }
}

for (let i = 0; i < dataButton.length; i++) {
    dataButton[i].addEventListener('click', () => toggleActive(dataButton[i].getAttribute('data-button')))
    closeBtn[i].addEventListener('click', () => toggleActive(closeBtn[i].getAttribute('data-close')))
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

//select
function remActiveSelect() {
    let dropdowns = document.querySelectorAll(".select");
    for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].classList.contains('active')) {
            dropdowns[i].classList.remove('active');
        }
    }
}

document.querySelectorAll('.select_current').forEach((el) => {
    el.addEventListener('click', (e) => {
       e.stopImmediatePropagation();
        remActiveSelect();
        el.parentElement.classList.toggle('active');
    })
    el.nextElementSibling.querySelectorAll('.select_option').forEach( (option, index) => {
        option.addEventListener('click', (e) => {
            e.stopImmediatePropagation()
            option.closest('.select').querySelector('.active').classList.remove('active');

            option.classList.add('active');

            if (index == 0) {
                el.innerHTML = `<span>${option.innerHTML}</span>`;
            } else {
                el.innerHTML = option.innerHTML;
            }
        })
    })
})


document.body.addEventListener('click', (e) => {
    if (!e.target.matches('.select_current')) remActiveSelect();
})

window.addEventListener('scroll', () => remActiveSelect())

//range
if (document.querySelector('#order-pr')) {
    let subtotal = +document.querySelector('#order-pr').innerText;
    document.querySelector('.range_slider span').style.width = subtotal * 100 / 150 + '%';
}

//select filter
document.querySelectorAll('.select_filter').forEach(el => {
    el.querySelector('.select_item').addEventListener('click', () => el.classList.toggle('active'))
})

// radio buttons
document.querySelectorAll('.available-options .checkbox').forEach((checkbox, index) => {
    checkbox.addEventListener('click', (e) => {
      if (checkbox.checked) {
        let optionAvailable = checkbox.nextElementSibling.querySelectorAll('span')[0],
        optionPrice = checkbox.nextElementSibling.querySelector('.radio-check_price').innerHTML.replace('$',''),
        caseCount = 1;
        if (optionAvailable.innerText.includes('Each')) {
          caseCount = 1;
        } else {
          caseCount = optionAvailable.innerText.replace(/\D/g, '')
        }
        document.querySelector('.product_sidebar .calc-qty').dataset.case = caseCount;
        document.querySelector('.product_sidebar .add-cart .pr').dataset.price = optionPrice;
        document.querySelector('.product_sidebar .add-cart .pr').innerHTML = (+optionPrice * +document.querySelector('.product_sidebar .calc-qty').value).toFixed(2);
      }
    })
})
