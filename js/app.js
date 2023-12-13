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
		description: 'Эспрессо в нашем кофейне — это чарующее погружение в мир насыщенных вкусов, где сливаются ноты темного шоколада, орехов и бодрящей энергии. Опыт густого крема и аромата свежесваренного кофе создаст для вас мгновение уюта и наслаждения. Добро пожаловать в мир настоящего кофейного искусства.',
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
		description: 'Наслаждайтесь легкостью и яркостью в каждом глотке нашего американо. Этот ароматный кофейный напиток раскрывает ноты свежесваренного кофе, создавая легкую и освежающую атмосферу. Опыт совершенства в каждой чашке — добро пожаловать в уютное кофейное путешествие.',
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
		description: 'Дайте себе уютный побег с нашим капучино — волшебным сочетанием густого эспрессо, нежной молочной пены и вдохновляющего аромата. В каждом глотке ощутите тепло и гармонию вкусов, приносящих радость и удовлетворение. Погрузитесь в мир утонченного кофейного наслаждения с нашим капучино.',
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
		description: 'Наши латте — это чарующая симфония вкусов, где нежное эспрессо объединяется с бархатистым молоком, создавая неповторимую гармонию. Опыт богатства и нежности в каждом глотке, погружая вас в атмосферу непринужденного удовольствия. Дополните свой день вдохновляющим латте у нас в кофейне.',
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
		description: 'Откройте для себя наш раф — волшебное сочетание нежного эспрессо, теплого молока и ванильной сладости. В каждом глотке раскрывается утонченная гармония вкусов, приносящая нежность и удовлетворение. Насладитесь моментом исключительного кофейного наслаждения с нашим рафом, созданным для тех, кто ценит изысканный вкус.',
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
		description: 'Представляем вам наш уникальный Раф Халва — вдохновенное сочетание традиционного рафа и изысканной сладости халвы. Наслаждайтесь бархатистой текстурой, обогащенной ароматом эспрессо и насыщенной вкусом нежной халвы. Этот напиток — настоящее путешествие в мир удовольствия, приносящее радость каждому глотку.',
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
		description: 'Наши Флет Уайт — это легкость и свежесть в каждом прикосновении. Элегантное сочетание свежесваренного эспрессо и бархатистой молочной пены создаёт напиток, наполненный бодрствующей энергией. Опыт чистого, мягкого вкуса, подаряющего вам легкость и вдохновение в любое время дня. Добро пожаловать в мир Флет Уайт, где каждый глоток — это мгновение освежения.',
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
		description: 'Наши моккачино — это танец вкусов, в котором сливаются насыщенный эспрессо, гармония молока и сладость шоколада. В каждом глотке вы почувствуете богатство и аромат темного кофе, ласково обнятое нежной молочной пеной и нотками шоколада. Опыт утонченного наслаждения, созданный для ценителей кофейного искусства — добро пожаловать в мир наших моккачино.',
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
		description: 'Глясе — это наше удивительное творение, объединяющее свежеваренное эспрессо и легкую сладость в одном чарующем напитке. Опыт нежной гармонии ванильного сиропа, кофейной энергии и исключительной гладкости приносит удовольствие с каждым глотком. Погрузитесь в чувственный мир вкусов с нашим Глясе, созданным для тех, кто ценит утонченность и неповторимость в каждой чашке кофе.',
    },
];

let listCards = {};

// Добавьте описание к каждому товару в цикле
products.forEach((product) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
        <img src="image/${product.image}" data-description="${product.description}">
        <div class="title">${product.name}</div>
        <div class="price" id="price_${product.id}">${getFormattedPrice(product.prices[250])}</div>
        <select id="user_obym_${product.id}" onchange="updatePrice(${product.id})">
            <option value="250">250 мл</option>
            <option value="350">350 мл</option>
            <option value="400">400 мл</option>
        </select>
        <button onclick="addToCard(${product.id})">Добавить в корзину</button>`;
    list.appendChild(newDiv);
});

// Добавьте следующий код после вашего существующего кода
document.addEventListener('DOMContentLoaded', function () {
    // Получите все элементы с классом 'item'
    let items = document.querySelectorAll('.item');

    // Добавьте обработчик события для каждого элемента
    items.forEach(function (item) {
        let img = item.querySelector('img');

        // Добавьте обработчик события для клика на изображение
        img.addEventListener('click', function () {
            // Получите описание товара из атрибута 'data-description'
            let description = img.getAttribute('data-description');

            // Покажите всплывающее окно с описанием
            alert(description);
        });
    });
});

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

function addToCard(key) {
    const selectedVolume = document.getElementById(`user_obym_${key}`).value;
    const productKey = `${key}_${selectedVolume}`;

    // Проверка, есть ли у выбранного объема действительная цена
    if (products[key - 1].prices[selectedVolume] !== 'такого объёма нет') {
        if (!listCards[productKey]) {
            // Копирование продукта из списка в корзину
            listCards[productKey] = {
                ...products[key - 1],
                quantity: 1,
                selectedVolume: selectedVolume,
                price: products[key - 1].prices[selectedVolume]
            };
        } else {
            // Уже есть в корзине, увеличиваем количество
            listCards[productKey].quantity++;
        }

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
    if (products[key - 1].prices[selectedVolume] !== 'такого объёма нет') {
        const priceElement = document.getElementById(`price_${key}`);
        priceElement.innerText = getFormattedPrice(products[key - 1].prices[selectedVolume]);
    } else {
        // Обработка случая, когда у выбранного объема нет цены
        const priceElement = document.getElementById(`price_${key}`);
        priceElement.innerText = 'такого объёма нет';
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

    // Используем исправленный код для получения данных о товарах в корзине
    let listCardContents = [];
    let listCardItems = document.querySelectorAll('.listCard li');

    listCardItems.forEach((item) => {
        let itemData = {};
        itemData.name = item.querySelector('div:nth-child(2)').textContent.trim();
        itemData.price = item.querySelector('div:nth-child(3)').textContent.trim();
        itemData.volume = item.querySelector('div:nth-child(4)').textContent.trim();
        itemData.quantity = item.querySelector('.count').textContent.trim();
        listCardContents.push(itemData);
    });

    // Преобразуем массив объектов в JSON-строку
    let itemsJSON = JSON.stringify(listCardContents);

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
        items: itemsJSON, // Теперь используем JSON-строку с информацией о товарах
        total: total
    };

    // Отправка данных в Telegram
    tg.sendData(JSON.stringify(data));
    tg.close();
});
