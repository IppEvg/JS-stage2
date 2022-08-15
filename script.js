const goods = [{
        id: 1,
        title: 'Shirt',
        price: 150
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
];


const renderGoodsItem = (values) => {
    return `<div class="goods-item"><img class= 'pictures' src = Pictures/${values.title}.jpg><h3>${values.title}</h3><p>${values.price}</p> <button class = 'button_buy'>купить</button> </div>`;
};
const renderGoodsList = (list) => {
    //т.к. метод массива map приводит массив к строке и использует запятую в качестве разделителя по умолчанию. Их убираем методом  join указывая ему пустую строку.
    let goodsList = list.map(item => renderGoodsItem(item)).join('');
    document.querySelector('.products').innerHTML = goodsList;
}
renderGoodsList(goods);