Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="products container" >
        <product v-for= "item of products" :img = "img" :product = "item" >
        </product>
        </div > `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item" >
    <img :src='img' alt="good image" class="pictures">
    <h3>{{product.product_name}}</h3>
    <p>{{product.price}}</p>
    <button class='button_buy' @click="$parent.$emit('add-product',product)"> КУПИТЬ </button>
    </div>`
})