<script setup lang="ts">
import { useStore } from "vuex";
import { toast, type ToastOptions } from "vue3-toastify";
import { computed } from "vue";
import router from "../router";
const store = useStore();
const formData = computed(() => store.state.formStore.formData);
const cartItems = computed(() => store.state.shopStore.cartItems);
const totalCartPrice = computed(() => store.getters.totalCartPrice);

const backToPayment = () => {
  router.push("/payment");
};

const notify = () => {
  toast(`Thank you for shopping 😊`, {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type: "success",
    theme: "colored",
  } as ToastOptions);
};

const submitPurchase = () => {
  notify();
  setTimeout(() => {
    store.commit("clearCart");
    router.push("/");
  }, 3000);
};
</script>
<template>
  <div class="summary">
    <div class="summary__header">
      <h2>Summary</h2>
    </div>
    <div class="summary__information">
      <fieldset>
        <legend>Summary of purchases</legend>
        <div class="summary__information--container">
          <div class="summary__information--container-order">
            <div class="summary__information--container orderHeader">
              <h2>Order Data</h2>
            </div>
            <hr />
            <div class="summary__information--container-order info">
              <div class="boxs">
                <div class="box">
                  <p>Name</p>
                  <span>{{ formData.name }}</span>
                </div>
                <div class="box">
                  <p>Surname</p>
                  <span>{{ formData.surname }}</span>
                </div>
                <div class="box">
                  <p>Email</p>
                  <span>{{ formData.email }}</span>
                </div>
                <div class="box">
                  <p>Phone number</p>
                  <span>{{ formData.phoneNumber }}</span>
                </div>
                <div class="box">
                  <p>Delivery Type</p>
                  <span>{{ formData.deliveryType }}</span>
                </div>
              </div>
              <div class="boxs">
                <div class="box">
                  <p>Country</p>
                  <span>{{ formData.country }}</span>
                </div>
                <div class="box">
                  <p>City</p>
                  <span>{{ formData.city }}</span>
                </div>
                <div class="box">
                  <p>Street</p>
                  <span>{{ formData.street }}</span>
                </div>
                <div class="box">
                  <p>Zip code</p>
                  <span>{{ formData.zipCode }}</span>
                </div>
                <div class="box">
                  <p>Peyment Method</p>
                  <span>{{ formData.creditCard }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="summary__information--container-basket">
            <div class="summary__information--container-basket header">
              <h2>Basket Items</h2>
            </div>
            <hr />
            <div class="container">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="container__item"
              >
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
                  <p>Price: {{ item.price }}</p>
                </div>
              </div>
              <div class="total">
                <p class="total">
                  Total Price : <span> ${{ totalCartPrice }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="summary__buttons">
      <button @click="backToPayment">Back</button>
      <button @click="submitPurchase" type="submit">
        Pay and back to Home Page
      </button>
    </div>
  </div>
</template>
<style lang="scss">
.summary {
  padding: 64px 16px;

  hr {
    border: 1px solid black;
    margin: 15px 0;
  }

  legend {
    font-size: 24px;
  }

  &__header {
    display: flex;
    justify-content: center;

    h2 {
      font-size: 32px;
    }
  }

  &__information {
    fieldset {
      padding: 32px;
    }
    &--container {
      h2 {
        font-size: 20px;
        margin: 20px 0;
      }
      &-order {
        padding: 20px 0;
        .orderHeader {
          display: flex;
          justify-content: start;
        }

        .info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);

          gap: 30px;
          padding: 0px 30px;

          .boxs {
            display: flex;
            flex-direction: column;

            .box {
              padding-left: 80px;
              p {
                margin: 10px 0;
                font-size: 18px;
                font-weight: bold;
              }
              span {
                color: #5a5757;
              }
            }
          }
        }
      }
      &-basket {
        .container {
          width: 100%;
          &__item {
            padding: 10px 10px;
            margin: 15px 0;
            background-color: #f3f3f3;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 10px;
            text-align: center;
            align-items: center;

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
          }
          .total {
            display: flex;
            justify-content: end;
            p {
              margin: 10px 0;
              font-size: 18px;
            }
            span {
              margin-left: 5px;
              font-size: 18px;
              font-weight: bolder;
            }
          }
        }
      }
    }
  }

  &__buttons {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;

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
}
</style>
