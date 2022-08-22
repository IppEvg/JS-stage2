const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = data;
                this.render()
            });
        this.clickOnBasketButton();
    }
    _getProducts() {
        return fetch(`${API}catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('error');
            });
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
    clickOnBasketButton() {
        let basketButton = document.querySelector('.cart-button');
        let hiddenContainerOfButton = document.querySelector('.basket-container');
        hiddenContainerOfButton.style.display = 'none';
        basketButton.addEventListener('click', event => {
            if (hiddenContainerOfButton.style.display == 'none') {
                hiddenContainerOfButton.style.display = 'block';
            } else if (hiddenContainerOfButton.style.display = 'block') {
                hiddenContainerOfButton.style.display = 'none';
            }
        });
    }
}
// создал новый класс для корзины. Не понял, нужно ли было сделать методы в классе для листа товаров, или, может нужно было через наследование(пробовал, но там мы получали массив с сервера, а тут объект). 
class ProductsOfBasket {
    constructor(container = '.box_basket-container') {
        this.container = container;
        this.goodsOfBasket = {};
        this._getBasket()
            .then(data => {
                this.goodsOfBasket = data;
                this.render();
                this.countSummOfGoods();
            });

    }
    _getBasket() {
        return fetch(`${API}getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('error');
            });
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goodsOfBasket.contents) {
            const item = new ProductItemOfBasket(product);
            block.insertAdjacentHTML('beforeend', item.renderBasket());
        }
    }
    // можно было взять из нашего объекта свойство this.goodsOfBasket.amount - оно и так уже посчитано на сервере. Но я взял из прошлого урока метод и переделал его под корзину, хотя это скорее всего плохая практика. 
    countSummOfGoods() {
        let summ = 0;
        for (let product of this.goodsOfBasket.contents) {
            summ += product.price*product.quantity;
        }
        let paragraphSumm = document.createElement('p');
        let boxBasket = document.querySelector('.box_basket-container');
        boxBasket.appendChild(paragraphSumm);
        paragraphSumm.innerText = `Итого: ${summ} руб.`;
    }
}

class ProductItem {
    constructor(product) {
        this.id = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = `pictures/${this.product_name}.jpg`;
    }
    render() {
        return `<div id = '${this.id} 'class="goods-item"><img class= 'pictures' src='${this.img}'><h3>${this.product_name}</h3><p>${this.price}</p> <button class = 'button_buy'> КУПИТЬ </button>`
    }
}
class ProductItemOfBasket extends ProductItem {
    constructor(product) {
        super(product);
        this.quantity = product.quantity;
    }
    renderBasket() {
        return `<div id = '${this.id}' class="goods-item"><img class= 'pictures' src='${this.img}'><h3>${this.product_name}</h3><p>${this.price}</p> <p class = 'quantity'>Количество: ${this.quantity} шт.</p>`
    }
}
let list = new ProductList();
let basket = new ProductsOfBasket();




//      Из прошлых заданий:
// class Basket {
//     constructor(){

//     }
//     _orderOfProducts(){};// заказать товары
//     _clearnBasket(){};//очистить корзину
//     addAddresToOrder(){};//добавит адрес доставки
// }

// class ProductsInBasket extends ProductList{
//     constructor(container,other){
//         super(container);
//         this.other = other;
//     }
//     addElseToBasket(){};//добавляет еще одну единицу товара
//     delFromBasket(){};//удаляет единицу товара
//     setLikeToThisProduct(){};// добавляет в избранное
// }


// const renderGoodsItem = (values) => {
//     return `<div class="goods-item"><img class= 'pictures' src = Pictures/${values.title}.jpg><h3>${values.title}</h3><p>${values.price}</p> <button class = 'button_buy'>купить</button> </div>`;
// }
// const renderGoodsList = (list) => {
//     //т.к. метод массива map приводит массив к строке и использует запятую в качестве разделителя по умолчанию. Их убираем методом  join указывая ему пустую строку.
//     let goodsList = list.map(item => renderGoodsItem(item)).join('');
//     document.querySelector('.products').innerHTML = goodsList;
// }
// renderGoodsList(goods);