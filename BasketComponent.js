Vue.component('basket', {
    props: ['img', 'products', 'visibility'],
    template: `
    <div class="basket-container"  v-if='visibility'>
        <basketproduct v-for="item of products" :img="img" :item="item">
        </basketproduct>
        <p class="summ" v-if='visibility'> Общая стоимость: {{$root.getSumm}} руб.</p>
    </div>
    `
}
);
Vue.component('basketproduct', {
    props: ['img', 'item'],
    template: `
    <div class="box_basket-container">
        <img :src='img' alt="good image" class="goods-item">
        <h3>{{item.product_name}}</h3>
        <p>{{item.price}} руб.</p>
        <p class="quantity">{{item.quantity}}шт.</p>
        <p class="summ"> Итого:{{item.quantity*item.price}}  руб.</p>
        <button class="del" @click="$parent.$emit('delete',item)">X</button>
    </div>`
}
);
