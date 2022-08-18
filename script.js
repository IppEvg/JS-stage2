class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._featchProducts();
        this.render();
        this.countSummOfGoods();
    }
    _featchProducts() {
        this.goods = [{
                id: 1,
                title: 'Shirt',
                price: 150,
            },
            {
                id: 2,
                title: 'Socks',
                price: 50
            },
            {
                id: 3,
                title: 'Jacket',
                price: 350
            },
            {
                id: 4,
                title: 'Shoes',
                price: 250
            },
        ]
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
    countSummOfGoods(){
        let summ = 0;
        for (let i = 0; i<this.goods.length;i++){
            summ += this.goods[i].price;
        }
        console.log(`Общая стоимость всех товаров составляет: ${summ} руб.`);
    }
}


class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = `Pictures/${product.title}.jpg`;
    }
    render() {
        return `<div class="goods-item"><img class= 'pictures' src = '${this.img}'><h3>${this.title}</h3><p>${this.price}</p> <button class = 'button_buy'>купить</button> </div>`
    }
}
class Basket {
    constructor(){

    }
    _orderOfProducts(){};// заказать товары
    _clearnBasket(){};//очистить корзину
    addAddresToOrder(){};//добавит адрес доставки
}
class ProductsInBasket extends ProductList{
    constructor(container,other){
        super(container);
        this.other = other;
    }
    addElseToBasket(){};//добавляет еще одну единицу товара
    delFromBasket(){};//удаляет единицу товара
    setLikeToThisProduct(){};// добавляет в избранное
}
let list = new ProductList();

// const renderGoodsItem = (values) => {
//     return `<div class="goods-item"><img class= 'pictures' src = Pictures/${values.title}.jpg><h3>${values.title}</h3><p>${values.price}</p> <button class = 'button_buy'>купить</button> </div>`;
// }
// const renderGoodsList = (list) => {
//     //т.к. метод массива map приводит массив к строке и использует запятую в качестве разделителя по умолчанию. Их убираем методом  join указывая ему пустую строку.
//     let goodsList = list.map(item => renderGoodsItem(item)).join('');
//     document.querySelector('.products').innerHTML = goodsList;
// }
// renderGoodsList(goods);