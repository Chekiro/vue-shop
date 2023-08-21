<script setup lang="ts">
import { computed, ref } from "vue";
//@ts-ignore
import { useStore } from "vuex";
import ProductCart from "../types/ProductCart";
import { toast, type ToastOptions } from "vue3-toastify";
const store = useStore();
const showCartDropdown = ref(false);
const cartItems = computed(() => store.getters.cartItemsDropDown);
const cartItemCount = computed(() => store.getters.cartItemCount);

const removeItem = (itemId: number) => {
  notify();
  store.commit("removeFromCart", itemId);
};

const notify = () => {
  toast(`Item has been removed from the list`, {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type: "success",
    theme: "colored",
  } as ToastOptions);
};

const clearCart = () => {
  store.commit("clearCart");
};

const totalPrice = (item: ProductCart) => {
  const price = parseFloat(item.price.slice(1));
  if (item.quantity) {
    return (price * item.quantity).toFixed(2);
  }
  return "0.00";
};
</script>
<template>
  <header>
    <p>Jeans</p>
    <p>
      <router-link :to="{ name: 'shopCart' }">
        <font-awesome-icon
          icon="fa-solid fa-cart-shopping"
          @mouseover="showCartDropdown = true"
        />
        <span v-if="cartItemCount > 0" class="cart-badge">{{
          cartItemCount
        }}</span>
      </router-link>
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </p>
    <div
      v-if="cartItemCount > 0"
      v-show="showCartDropdown"
      class="cart-dropdown"
      @mouseleave="showCartDropdown = false"
    >
      <div v-for="item in cartItems" :key="item.id" class="info">
        <div>
          <img :src="item.image" />
        </div>
        <div>
          <p>{{ item.product_name }}</p>
        </div>
        <div>
          <p>Quantity : {{ item.quantity }}</p>
        </div>
        <div>
          <p>
            Price: <span>$ {{ totalPrice(item) }}</span>
          </p>
        </div>
        <div>
          <font-awesome-icon
            @click="removeItem(item.id)"
            icon="fa-solid fa-trash"
          />
        </div>
      </div>
      <div v-if="cartItemCount > 0" class="buttons">
        <button @click="clearCart">Clear List</button>
      </div>
    </div>
  </header>
</template>
<style scoped lang="scss">
header {
  font-size: 24px;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.01em 16px;
  p {
    a {
      text-decoration: none;
      color: #000;
    }
    margin: 24px 0;
    svg {
      width: 22.3px;
      height: 24px;
      cursor: pointer;
      &:first-child {
        margin-right: 16px;
      }
    }

    .cart-badge {
      position: absolute;
      top: 19px;
      right: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background-color: red;
      color: white;
      border-radius: 50%;
      font-size: 12px;
    }
  }
  @media (max-width: 992px) {
    margin-top: 84px;
  }

  .cart-dropdown {
    z-index: 1000;
    position: absolute;
    top: 60%;
    right: 53px;
    background-color: rgb(255, 255, 255);
    color: black;
    border: 5px solid #908c8c;
    border-radius: 4px;
    padding: 8px;
    width: 700px;

    .buttons {
      margin: 15px 0;
      display: flex;
      justify-content: end;
      button {
        display: inline-block;
        background-color: black;
        color: white;
        text-decoration: none;
        cursor: pointer;
        padding: 15px 26px;
        width: 45%;
        font-weight: 400;
        font-size: 18px;
        font-family: "Montserrat", sans-serif;
        outline-style: none;
        border: none;
        &:hover {
          background-color: #ccc;
          color: #000;
        }
      }
    }
    .empty {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .info {
      padding: 10px 10px;
      margin: 15px 0;
      background-color: #f3f3f3;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 10px;
      text-align: center;
      align-items: center;

      div {
        img {
          height: 120px;
        }
        span {
          font-size: 16px;
          font-weight: 600;
        }
        p {
          font-size: 16px;
        }
        svg {
          color: red;
          cursor: pointer;
          height: 25px;
        }
      }
    }
    @media (max-width: 992px) {
      display: none;
    }
  }
}
</style>
