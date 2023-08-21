<script setup lang="ts">
import { toast, type ToastOptions } from 'vue3-toastify';
import type Product from '../types/Product';
import { useStore } from "vuex";
import axios from 'axios';
import { onMounted, ref } from 'vue';
const fetchData = ref<Product[]>([]);
const store = useStore()

onMounted(async()=>{
     const data = await axios.get("http://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6");
     fetchData.value = data.data;
})

const showDetails = (item:Product) =>{
    store.commit("setSelectedItem",item)
}
const notify = (text:string) => {
  toast(`Item ${text} added to Cart!`, {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type:'success',
    theme:'colored',
  } as ToastOptions);
}

const addToCart = (item:Product,text:string) =>{
    store.commit("addToCart",item)
    notify(text);
}


</script>
<template>
    <div class="products">
        <div class="products__header">
            <p>{{ fetchData.length }} items</p>
        </div>
        <div class="products__grid">
            <div v-for="item in fetchData" :key="item.id" class="products__grid--item">
                <router-link :to="{ name: 'productDetails', params: { id: item.id }}">
                <img @click="showDetails(item)" :src="item.image"/>
                 </router-link>
                <p>
                    <span>{{item.product_name}}</span>
                    <div>
                        <span>{{item.price}}</span>
                        <font-awesome-icon @click="addToCart(item,item.product_name)" icon="fa-solid fa-cart-shopping" />
                    </div>
                </p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
 .products{
    display: flex;
    flex-direction: column;

    &__header{
        padding: 0.01em 16px;
        

        p{
            color: #757575;
            font-size: 15px;
            margin: 15px 0;
        }
    }
    &__grid{
        padding: 0.01em 16px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-flow: row;
        gap: 30px;

       &--item{

        img{
            width: 100%;
            cursor: pointer;
        };
        p{
            div{
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                svg{
                    cursor: pointer;
                }
            }
        }
       }
       @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
        }
    }
 }
</style>
