<script setup lang="ts">
import router from "../router";
import { reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const formData = reactive({
  cardNumber: "",
  cvc: "",
  expiresTime: "",
  expiresTimeInvalid: false,
  cardNumberInvalid: false,
  cvcInvalid: false,
});

onMounted(() => {
  const storePaymentData = computed(() => store.getters.getStorePaymentData);
  if (storePaymentData.value) {
    for (const field in storePaymentData.value) {
      formData[field] = storePaymentData.value[field];
    }
  }
});

const backToContact = () => {
  router.push("/contact");
};

const submitForm = () => {
  let hasEmptyFields = false;
  let isValidCardNumber = true;
  let isValidCvc = true;
  let isValidExpiresTime = true;

  for (const field in formData) {
    if (formData[field] === "") {
      hasEmptyFields = true;
      formData[field + "Empty"] = true;
    } else {
      formData[field + "Empty"] = false;
    }
  }

  if (formData.cardNumber !== "") {
    const cardNumberRegex = /^\d{16}$/;
    isValidCardNumber = cardNumberRegex.test(formData.cardNumber);
  }
  formData.cardNumberInvalid = !isValidCardNumber;

  if (formData.cvc !== "") {
    const cvcRegex = /^\d{3}$/;
    isValidCvc = cvcRegex.test(formData.cvc);
  }
  formData.cvcInvalid = !isValidCvc;

  if (formData.expiresTime !== "") {
    const expiresTimeRegex = /^\d{2}\/\d{2}$/;
    isValidExpiresTime = expiresTimeRegex.test(formData.expiresTime);
  }
  formData.expiresTimeInvalid = !isValidExpiresTime;

  if (
    !hasEmptyFields &&
    isValidCardNumber &&
    isValidCvc &&
    isValidExpiresTime
  ) {
    const formDataPaymentCopy = { ...formData };
    store.commit("setPaymentData", formDataPaymentCopy);
    router.push("/summary");
    return;
  }
};

const limitDigits = (event, number: number) => {
  const inputValue = event.target.value;
  const digitsOnly = inputValue
    .split("")
    .filter((char) => !isNaN(parseInt(char, 10)));
  event.target.value = digitsOnly.slice(0, number).join("");
};

const validExpiresTime = (event) => {
  const inputValue = event.target.value;
  const expiresTimeRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!expiresTimeRegex.test(inputValue)) {
    formData.expiresTimeInvalid = true;
  } else {
    const [enteredMonth, enteredYear] = inputValue.split("/");
    const currentYear = new Date().getFullYear() % 100;

    const enteredYearInt = parseInt(enteredYear, 10);
    const enteredMonthInt = parseInt(enteredMonth, 10);
    const isValidMonth = enteredMonthInt >= 1 && enteredMonthInt <= 12;
    const isValidYear =
      enteredYearInt >= currentYear && enteredYearInt <= currentYear + 10;
    formData.expiresTimeInvalid = !(isValidMonth && isValidYear);
  }
};
</script>
<template>
  <div class="payment">
    <div class="payment__header">
      <h2>Payment Methods</h2>
    </div>
    <div class="payment__form">
      <fieldset>
        <legend>Methods</legend>
        <div class="type">
          <div>
            <input
              type="radio"
              id="credit_card"
              name="type"
              value="Credit Card"
              checked
            />
            <label for="credit_card">Credit Card</label>
          </div>
          <div>
            <input type="radio" id="upcoming" name="type" value="Upcoming" />
            <label for="upcoming">Upcoming</label>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <label for="card_number">Card Number<span>*</span></label>
            <p class="error-message" v-if="formData.cardNumberEmpty">
              Field can't be empty
            </p>
            <p class="error-message" v-if="formData.cardNumberInvalid">
              Invalid card number (only numbers allowed, max 16 digits)
            </p>
            <input
              type="text"
              id="card_number"
              v-model="formData.cardNumber"
              :class="{
                error: formData.cardNumberEmpty || formData.cardNumberInvalid,
              }"
              required
              @input="(event) => limitDigits(event, 16)"
            />
          </div>
          <div class="box">
            <label for="cvc">CVC<span>*</span></label>
            <p class="error-message" v-if="formData.cvcEmpty">
              Field can't be empty
            </p>
            <p class="error-message" v-if="formData.cvcInvalid">
              Invalid CVC (only numbers allowed, max 3 digits)
            </p>
            <input
              id="cvc"
              type="text"
              v-model="formData.cvc"
              :class="{ error: formData.cvcEmpty || formData.cvcInvalid }"
              required
              @input="(event) => limitDigits(event, 3)"
            />
          </div>
          <div class="box">
            <label for="expires_time">Expires Time<span>*</span></label>
            <p class="error-message" v-if="formData.expiresTimeEmpty">
              Field can't be empty
            </p>
            <p class="error-message" v-if="formData.expiresTimeInvalid">
              Invalid Expires Time (np. 11/23)
            </p>
            <input
              id="expires_time"
              type="text"
              v-model="formData.expiresTime"
              :class="{
                error: formData.expiresTimeEmpty || formData.expiresTimeInvalid,
              }"
              required
              @input="validExpiresTime"
            />
          </div>
        </div>
      </fieldset>
    </div>
    <div class="payment__buttons">
      <button @click="backToContact" type="submit">Back</button>
      <button @click="submitForm" type="submit">Go to Summary</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.payment {
  padding: 64px 16px;

  .error {
    border: 1px solid red;
  }

  .error-message {
    color: red;
    margin: 5px 0;
  }

  label {
    font-size: 18px;
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

  &__form {
    fieldset {
      padding: 32px;
      .type {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 30px;
        padding: 15px 0;
        label {
          margin-left: 7px;
        }

        div:last-of-type {
          pointer-events: none;
          color: gray;
        }
      }
      .column {
        .box {
          display: flex;
          flex-direction: column;
          padding: 0px 10%;

          input {
            padding: 8px;
            margin: 10px 0;
            width: 60%;
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
          }
          span {
            color: red;
          }
        }
      }
    }
  }
  &__buttons {
    margin: 15px 0;
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
