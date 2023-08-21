<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import ProductCart from "../types/ProductCart";
import { toast, type ToastOptions } from "vue3-toastify";
import router from "../router";
const store = useStore();
const cartItems = computed(() => store.state.shopStore.cartItems);

const notify = () => {
  toast(`Item has been removed from the list`, {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type: "success",
    theme: "colored",
  } as ToastOptions);
};

const removeItem = (itemId: number) => {
  notify();
  store.commit("removeFromCart", itemId);
};

const clearCart = () => {
  store.commit("clearCart");
};
const cartItemCount = computed(() => store.getters.cartItemCount);
const totalCartPrice = computed(() => store.getters.totalCartPrice);

const totalPrice = (item: ProductCart) => {
  const price = parseFloat(item.price.slice(1));
  if (item.quantity) {
    return (price * item.quantity).toFixed(2);
  }
  return "0.00";
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

const toContactForm = () => {
  router.push("/contact");
};
</script>
<template>
  <div class="cart">
    <div class="cart__items">
      <div v-for="item in cartItems" :key="item.id" class="cart__items--info">
        <div>
          <img :src="item.image" />
        </div>
        <div>
          <p>{{ item.product_name }}</p>
        </div>
        <div>
          <button @click="increaseQuantity(item)">+</button>
          <p>Quantity : {{ item.quantity }}</p>

          <button @click="decreaseQuantity(item)">-</button>
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
    </div>
    <div v-if="cartItemCount > 0" class="cart__summary">
      <div>
        <button @click="clearCart">Clear cart list</button>
      </div>
      <div>
        <button @click="toContactForm">Go to payment</button>
      </div>

      <div>
        <p>
          The total price is: <span>$ {{ totalCartPrice }}</span>
        </p>
      </div>
    </div>
    <div v-if="cartItemCount == 0" class="empty">
      <p>Cart is empty</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart {
  padding: 64px 16px;
  .empty {
    display: flex;
    justify-content: center;

    p {
      font-size: 32px;
    }
  }

  &__items {
    width: 100%;

    &--info {
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
          height: 150px;
        }
        span {
          font-size: 18px;
          font-weight: 600;
        }
        p {
          font-size: 18px;
        }
        svg {
          color: red;
          cursor: pointer;
          height: 25px;
        }

        input {
          width: 20%;
        }
      }
      button {
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
  }
  &__summary {
    padding: 15px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    text-align: center;
    align-items: center;

    p {
      font-size: 18px;
    }
    button {
      display: inline-block;
      background-color: black;
      color: white;
      text-decoration: none;
      cursor: pointer;
      padding: 15px 26px;
      width: 100%;
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
    }
    span {
      font-weight: 600;
    }
  }
}
</style>
