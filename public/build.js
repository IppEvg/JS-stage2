new Vue({el:"#app",data:{catalogUrl:"db/products.json",cartUrl:"db/userCart.json",goods:[],filtered:[],imgCatalog:"",userSearch:"",show:!1,goodsOfBasket:[],error:!1},methods:{filter(){const t=new RegExp(this.userSearch,"i");this.filtered=this.goods.filter((e=>t.test(e.product_name)))},getJson(t){return fetch(t).then((t=>t.json())).catch((t=>{console.log("error"),this.error=!0}))},putJson(t,e){return fetch(t,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((t=>t.json())).catch((t=>{this.error=!0}))},postJson(t,e){return fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((t=>t.json())).catch((t=>{console.log("error"),this.error=!0}))},delJson(t,e){return fetch(t,{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify(e)}).then((t=>t.json())).catch((t=>{this.error=!0}))},addProduct(t){let e=this.goodsOfBasket.find((e=>e.id_product===t.id_product));if(e)this.putJson(`/api/cart/${e.id_product}/${e.product_name}`,{quantity:1}).then((t=>{t.result&&e.quantity++}));else{const e=Object.assign({quantity:1},t);t.imgPath=`Pictures/${t.id_product}.jpg`,this.postJson("/api/cart",e).then((t=>{t.result&&this.goodsOfBasket.push(e)}))}},delProduct(t){t.quantity>1?this.putJson(`/api/cart/${t.id_product}/${t.product_name}`,{quantity:-1}).then((e=>{e.result&&t.quantity--})):this.delJson(`/api/cart/${t.id_product}`,t).then((e=>{e.result?this.goodsOfBasket.splice(this.goodsOfBasket.indexOf(t),1):console.log("error")}))}},computed:{getSumm(t){let e=0;for(let t of this.goodsOfBasket)e+=t.price*t.quantity;return e}},mounted(){this.getJson("/api/products").then((t=>{for(let e of t)e.imgPath=`Pictures/${e.id_product}.jpg`,this.goods.push(e),this.filtered.push(e)})),this.getJson("/api/cart").then((t=>{for(let e of t.contents)e.imgPath=`Pictures/${e.id_product}.jpg`,this.goodsOfBasket.push(e)}))}});