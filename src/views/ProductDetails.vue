<script setup lang="ts">
import { toast, type ToastOptions } from "vue3-toastify";
import { ref, computed } from "vue";
//@ts-ignore
import { useStore } from "vuex";
import Product from "../types/Product";
import ProductCart from "../types/ProductCart";

const store = useStore();
const shortDetail = ref("");

const shortenedDescription = (text: string) => {
  if (text.length > 500) {
    return (shortDetail.value = text.slice(0, 500) + "...");
  } else {
    return (shortDetail.value = text);
  }
};

const currentItem = computed(() => store.state.shopStore.selectedItem);

const notify = (text: string) => {
  toast(`Item ${text} added to Cart!`, {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type: "success",
    theme: "colored",
  } as ToastOptions);
};
const addToCart = (item: Product, text: string) => {
  store.commit("addToCart", item);
  notify(text);
};

const decreaseQuantity = (item: ProductCart) => {
  if (item.quantity && item.quantity > 1) {
    item.quantity -= 1;
    updateTotalPrice();
  }
};

const increaseQuantity = (item: ProductCart) => {
  if (item.quantity) {
    item.quantity += 1;
  } else {
    item.quantity = 1;
  }
  updateTotalPrice();
};

const updateTotalPrice = () => {
  store.commit("updateTotalPrice");
};
</script>
<template>
  <div class="product">
    <div class="product__content">
      <div class="product__content--img">
        <img :src="currentItem.image" />
      </div>
      <div class="product__content--info">
        <h2>{{ currentItem.product_name }}</h2>
        <div class="product__content--info-description">
          <p>{{ shortenedDescription(currentItem.description) }}</p>
          <p>
            Company: <span> {{ currentItem.company }} </span>
          </p>
          <p>
            Price: <span> {{ currentItem.price }} </span>
          </p>
          <div>
            <button @click="increaseQuantity(currentItem)">+</button>
            <p>Quantity : {{ currentItem.quantity }}</p>

            <button @click="decreaseQuantity(currentItem)">-</button>
          </div>
        </div>
      </div>
    </div>
    <div class="product__buttons">
      <router-link :to="{ name: 'home' }">Back to Home</router-link>
      <router-link
        @click="addToCart(currentItem, currentItem.product_name)"
        to="home"
        >Add to Cart</router-link
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
.product {
  padding: 64px 16px;

  &__content {
    display: flex;
    flex-direction: row;
    text-align: center;
    gap: 20px;
    width: 100%;

    &--img {
      width: 50%;
      img {
        width: 100%;
      }
      @media (max-width: 800px) {
        width: 100%;
      }
    }
    &--info {
      width: 50%;
      flex-direction: column;
      display: flex;
      align-items: center;

      &-description {
        padding: 30px 0;
        text-align: justify;

        p {
          margin: 15px 0;
          font-size: 18px;

          span {
            font-weight: 700;
          }
        }

        button {
          margin-left: 80px;
          width: 30px;
          background-color: black;
          text-decoration: none;
          cursor: pointer;
          font-weight: 400;
          font-size: 18px;

          font-family: "Montserrat", sans-serif;
          outline-style: none;
          color: white;
          border: none;
          &:hover {
            background-color: #ccc;
            color: #000;
          }
        }
      }
      @media (max-width: 800px) {
        width: 100%;
      }
    }
    @media (max-width: 800px) {
      flex-direction: column;
      justify-content: center;
    }
  }
  &__buttons {
    padding: 24px 0;
    display: flex;
    justify-content: space-around;
    text-align: center;
    a {
      display: inline-block;
      background-color: black;
      color: white;
      text-decoration: none;
      cursor: pointer;
      padding: 15px 26px;
      width: 40%;
      font-weight: 400;
      font-size: 18px;
      font-family: "Montserrat", sans-serif;
      outline-style: none;
      cursor: pointer;
      color: white;
      border: none;

      &:hover {
        background-color: #ccc;
        color: #000;
      }
      @media (max-width: 800px) {
        width: 100%;
        margin: 10px 0;
      }
    }
    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
}
</style>
