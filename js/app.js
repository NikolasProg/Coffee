let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'ЭСПРЕССО',
        image: '1.png',
        prices: {
            250: 100,
            350: 'такого объёма нет',
            400: 'такого объёма нет',
        },
    },
    {
        id: 2,
        name: 'АМЕРИКАНО',
        image: '2.png',
        prices: {
            250: 100,
            350: 130,
            400: 130,
        },
    },
    {
        id: 3,
        name: 'КАПУЧИНО',
        image: '3.png',
        prices: {
            250: 130,
            350: 160,
            400: 190,
        },
    },
    {
        id: 4,
        name: 'ЛАТТЕ',
        image: '4.png',
        prices: {
            250: 'такого объёма нет',
            350: 160,
            400: 190,
        },
    },
    {
        id: 5,
        name: 'РАФ',
        image: '5.png',
        prices: {
            250: 'такого объёма нет',
            350: 170,
            400: 190,
        },
    },
    {
        id: 6,
        name: 'РАФ ХАЛВА',
        image: '6.png',
        prices: {
            250: 'такого объёма нет',
            350: 170,
            400: 190,
        },
    },
    {
        id: 7,
        name: 'ФЛЕТ УАЙТ',
        image: '7.png',
        prices: {
            250: 150,
            350: 180,
            400: 'такого объёма нет',
        },
    },
    {
        id: 8,
        name: 'МОККАЧИНО',
        image: '8.png',
        prices: {
            250: 'такого объёма нет',
            350: 160,
            400: 190,
        },
    },
    {
        id: 9,
        name: 'ГЛЯСЕ',
        image: '9.png',
        prices: {
            250: 'такого объёма нет',
            350: 190,
            400: 220,
        },
    },
];

let listCards = {};

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price" id="price_${key}">${getFormattedPrice(value.prices[250])}</div>
            <select id="user_obym_${key}" onchange="updatePrice(${key})">
                <option value="250">250 мл</option>
                <option value="350">350 мл</option>
                <option value="400">400 мл</option>
            </select>
            <button onclick="addToCard(${key})">Добавить в корзину</button>`;
        list.appendChild(newDiv);
    });
}

// Новая функция для форматирования цены
function getFormattedPrice(price) {
    return price !== 'такого объёма нет' ? String(price).replace(/р$/, '') + 'р' : 'такого объёма нет';
}

initApp();

function addToCard(key) {
    const selectedVolume = document.getElementById(`user_obym_${key}`).value;
    const productKey = `${key}_${selectedVolume}`;

    // Проверка, есть ли у выбранного объема действительная цена
    if (products[key].prices[selectedVolume] !== 'такого объёма нет') {
        if (listCards[productKey] == null) {
            // Копирование продукта из списка в корзину
            listCards[productKey] = JSON.parse(JSON.stringify(products[key]));
            listCards[productKey].quantity = 1;
        }

        // Корректировка цены в зависимости от выбранного объема
        listCards[productKey].price = listCards[productKey].prices[selectedVolume];
        listCards[productKey].selectedVolume = selectedVolume;

        reloadCard();
    } else {
        alert('Такого объёма нет. Выберите другой объем.');
    }
}

function reloadCard() {
    listCard.innerHTML = '';
    let totalPrice = 0;
    let count = 0;

    Object.keys(listCards).forEach((productKey) => {
        const value = listCards[productKey];

        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}р</div>
                <div>Объем: ${value.selectedVolume} мл</div>
                <div>
                    <button onclick="changeQuantity('${productKey}', 'decrement')">-</button>
                    <div class="count" id="count_${productKey}">${value.quantity}</div>
                    <button onclick="changeQuantity('${productKey}', 'increment')">+</button>
                </div>`;
            listCard.appendChild(newDiv);

            totalPrice += value.price;
            count += value.quantity;
        }

        // обновление цены на странице товара
        const keyParts = productKey.split('_');
        const productIndex = keyParts[0];
        document.getElementById(`price_${productIndex}`).innerText = getFormattedPrice(value.prices[250]);
    });

    total.innerText = `${totalPrice.toLocaleString()}р`;
    quantity.innerText = count;
}


function changeQuantity(productKey, action) {
    const selectedVolume = listCards[productKey].selectedVolume;
    let currentQuantity = listCards[productKey].quantity;

    if (action === 'decrement') {
        if (currentQuantity > 1) {
            currentQuantity--;
        } else {
            // Если количество равно 1 и происходит уменьшение, удаляем товар из корзины
            delete listCards[productKey];
        }
    } else if (action === 'increment') {
        currentQuantity++;
    }

    if (listCards[productKey]) {
        listCards[productKey].quantity = currentQuantity;
        listCards[productKey].price = listCards[productKey].prices[selectedVolume] * currentQuantity;
    }

    reloadCard();
}


function updatePrice(key) {
    const selectedVolume = document.getElementById(`user_obym_${key}`).value;

    // Проверка, есть ли у выбранного объема действительная цена
    if (products[key].prices[selectedVolume] !== 'такого объёма нет') {
        document.getElementById(`price_${key}`).innerText = getFormattedPrice(products[key].prices[selectedVolume]);
    } else {
        // Обработка случая, когда у выбранного объема нет цены
        document.getElementById(`price_${key}`).innerText = 'такого объёма нет';
    }
}
// JavaScript для управления всплывающей формой

const overlay = document.getElementById('overlay');
const form = document.getElementById('form');
const totalDiv = document.querySelector('.total');

// Показать форму при клике на totalDiv
totalDiv.addEventListener('click', () => {
    overlay.style.display = 'block';
    form.style.display = 'block';
    setTimeout(() => {
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
    }, 50);
});

// Скрыть форму при клике вне её области
overlay.addEventListener('click', () => {
    form.style.opacity = '0';
    form.style.pointerEvents = 'none';
    setTimeout(() => {
        overlay.style.display = 'none';
        form.style.display = 'none';
    }, 300);
});
orderButton.addEventListener("click", function () {
    document.getElementById("error").textContent = '';

    let name = document.getElementById("user_name").value;
    let email = document.getElementById("user_email").value;
    let phone = document.getElementById("user_phone").value;
    let koment = document.getElementById("user_koment").value;
    let items = document.getElementById("listCard").innerHTML; // Используем innerHTML, чтобы получить HTML содержимое корзины
    let total = document.querySelector(".total").textContent;

    if (name.length < 5) {
        document.getElementById("error").textContent = "Ошибка в имени";
        return;
    }
    if (phone.length < 5) {
        document.getElementById("error").textContent = "Ошибка в номере телефона";
        return;
    }

    let data = {
        name: name,
        email: email,
        phone: phone,
        koment: koment,
        items: items,
        total: total
    };

    // Отправка данных в Telegram
    tg.sendData(JSON.stringify(data));
    tg.close();
});
