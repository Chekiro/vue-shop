<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import router from "../router";
import { useStore } from "vuex";
import FormData from "../types/FormData";
const store = useStore();

const formData = reactive({
  name: "",
  companyName: "",
  copyCountry: "",
  copyCity: "",
  copyStreet: "",
  copyZipCode: "",
  surname: "",
  phoneNumber: "",
  nip: "",
  email: "",
  country: "",
  city: "",
  street: "",
  zipCode: "",
  clientType: "Personal",
  deliveryType: "Personally",
  creditCard: "Visa Credit Card",
  emailInvalid: false,
  phoneNumberInvalid: false,
  zipCodeInvalid: false,
  copyZipCodeInvalid: false,
  nipInvalid: false,
});

onMounted(() => {
  const storeFormData = computed(() => store.getters.getStoreFormData);
  if (storeFormData.value) {
    for (const field in storeFormData.value) {
      formData[field] = storeFormData.value[field];
    }
  }
});

const submitForm = () => {
  let hasEmptyFields = false;
  let isValidEmail = true;
  let isValidPhoneNumber = true;
  let isValidZipCode = true;
  let isCompanyType = formData.clientType === "Company";
  let isCourierTypeCourier = formData.deliveryType === "Courier";

  for (const field in formData) {
    if (isCompanyType && (field === "companyName" || field === "nip")) {
      continue;
    }
    if (
      !isCourierTypeCourier &&
      (field === "copyCountry" ||
        field === "copyCity" ||
        field === "copyStreet" ||
        field === "copyZipCode")
    ) {
      continue;
    }

    if (
      !isCompanyType &&
      field !== "companyName" &&
      field !== "nip" &&
      formData[field] === ""
    ) {
      hasEmptyFields = true;
      formData[field + "Empty"] = true;
    } else {
      formData[field + "Empty"] = false;
    }
  }

  if (formData.email !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValidEmail = emailRegex.test(formData.email);
  }
  formData.emailInvalid = !isValidEmail;

  if (formData.phoneNumber !== "") {
    const phoneNumberRegex = /^\d{9}$/;
    isValidPhoneNumber = phoneNumberRegex.test(formData.phoneNumber);
  }
  formData.phoneNumberInvalid = !isValidPhoneNumber;

  if (formData.zipCode !== "") {
    const zipCodeRegex = /^\d{2}-\d{3}$/;
    isValidZipCode = zipCodeRegex.test(formData.zipCode);
  }
  formData.zipCodeInvalid = !isValidZipCode;

  if (!hasEmptyFields && isValidEmail && isValidPhoneNumber && isValidZipCode) {
    const formDataCopy: FormData = { ...formData };
    store.commit("setFormData", formDataCopy);
    router.push("/payment");
    return;
  }
};

const limitDigits = (event) => {
  const inputValue = event.target.value;
  const digitsOnly = inputValue
    .split("")
    .filter((char) => !isNaN(parseInt(char, 10)));
  event.target.value = digitsOnly.slice(0, 9).join("");
};
const allowLettersOnly = (event) => {
  const inputValue = event.target.value;
  const onlyLettersRegex = /^[a-zA-Z]+$/;
  if (!onlyLettersRegex.test(inputValue)) {
    event.target.value = inputValue.replace(/[^a-zA-Z]/g, "");
  }
};

const validZipCode = (event) => {
  const inputValue = event.target.value;
  const onlyNumbersAndDashRegex = /^[\d-]+$/;
  if (!onlyNumbersAndDashRegex.test(inputValue)) {
    event.target.value = inputValue.replace(/[^-\d]/g, "");
  }
};
const validateNIP = (event) => {
  const inputValue = event.target.value;
  const nipRegex = /^\d{10}$/;
  const isValidNIP = nipRegex.test(inputValue);

  if (isValidNIP) {
    const nipDigits = inputValue.split("").map(Number);
    const weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    const sum = nipDigits.reduce(
      (acc, digit, index) => acc + digit * weight[index],
      0
    );
    const controlNumber = sum % 11;
    formData.nipInvalid = controlNumber !== 0;
  } else {
    formData.nipInvalid = true;
  }
};

const repeatValues = () => {
  formData.copyCountry = formData.country;
  formData.copyCity = formData.city;
  formData.copyStreet = formData.street;
  formData.copyZipCode = formData.zipCode;
};

const backToCart = () => {
  router.push("/cart");
};
</script>
<template>
  <div class="contact">
    <div class="contact__header">
      <h2>Contact Informations</h2>
    </div>
    <div class="contact__forms">
      <div class="contact__forms--clientType">
        <form>
          <fieldset>
            <legend>Client Type</legend>
            <div class="type">
              <div>
                <input
                  type="radio"
                  id="personal"
                  name="type"
                  value="Personal"
                  v-model="formData.clientType"
                  checked
                />
                <label for="personal">Personal</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="company"
                  name="type"
                  value="Company"
                  v-model="formData.clientType"
                />
                <label for="company">Company</label>
              </div>
            </div>
            <div v-if="formData.clientType === 'Company'" class="box">
              <label for="companyName">Company Name<span>*</span></label>
              <p class="error-message" v-if="formData.companyNameEmpty">
                Field can't be empty
              </p>
              <input
                type="text"
                id="companyName"
                v-model="formData.companyName"
                :class="{ error: formData.companyNameEmpty }"
                @input="allowLettersOnly"
              />
            </div>
            <div v-if="formData.clientType === 'Company'" class="box">
              <label for="NIP">NIP<span>*</span></label>
              <p class="error-message" v-if="formData.nipEmpty">
                Field can't be empty
              </p>
              <p class="error-message" v-if="formData.nipInvalid">
                Invalid NIP
              </p>
              <input
                type="text"
                id="NIP"
                v-model="formData.nip"
                :class="{ error: formData.nipEmpty || formData.nipInvalid }"
                @input="validateNIP"
                required
              />
            </div>
          </fieldset>
        </form>
      </div>
      <div class="contact__forms--info">
        <form>
          <fieldset>
            <legend>Contact Details</legend>
            <div class="column">
              <div class="box">
                <label for="name">Name<span>*</span></label>
                <p class="error-message" v-if="formData.nameEmpty">
                  Field can't be empty
                </p>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  :class="{ error: formData.nameEmpty }"
                  @input="allowLettersOnly"
                  required
                />
              </div>
              <div class="box">
                <label for="surname">Surname<span>*</span></label>
                <p class="error-message" v-if="formData.surnameEmpty">
                  Field can't be empty
                </p>
                <input
                  type="text"
                  id="surname"
                  v-model="formData.surname"
                  :class="{ error: formData.surnameEmpty }"
                  @input="allowLettersOnly"
                  required
                />
              </div>
              <div class="box">
                <label for="phone">Phone number<span>*</span></label>
                <p class="error-message" v-if="formData.phoneNumberEmpty">
                  Field can't be empty
                </p>
                <p class="error-message" v-if="formData.phoneNumberInvalid">
                  Invalid phone number
                </p>
                <input
                  type="text"
                  id="phone"
                  v-model="formData.phoneNumber"
                  :class="{
                    error:
                      formData.phoneNumberEmpty || formData.phoneNumberInvalid,
                  }"
                  @input="limitDigits"
                  required
                />
              </div>
              <div class="box">
                <label for="email">Email<span>*</span></label>
                <p class="error-message" v-if="formData.emailEmpty">
                  Field can't be empty
                </p>
                <p class="error-message" v-if="formData.emailInvalid">
                  Invalid email address
                </p>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  :class="{
                    error: formData.emailEmpty || formData.emailInvalid,
                  }"
                  required
                />
              </div>
            </div>
            <div class="column">
              <div class="box">
                <label for="city">City<span>*</span></label>
                <p class="error-message" v-if="formData.cityEmpty">
                  Field can't be empty
                </p>
                <input
                  type="text"
                  id="city"
                  v-model="formData.city"
                  :class="{ error: formData.cityEmpty }"
                  @input="allowLettersOnly"
                  required
                />
              </div>
              <div class="box">
                <label for="street">Street<span>*</span></label>
                <p class="error-message" v-if="formData.streetEmpty">
                  Field can't be empty
                </p>
                <input
                  type="text"
                  id="street"
                  v-model="formData.street"
                  :class="{ error: formData.streetEmpty }"
                  required
                />
              </div>
              <div class="box">
                <label for="zip_code">Zip Code<span>*</span></label>
                <p class="error-message" v-if="formData.zipCodeEmpty">
                  Field can't be empty
                </p>
                <p class="error-message" v-if="formData.zipCodeInvalid">
                  Invalid zip code
                </p>
                <input
                  type="text"
                  id="zip_code"
                  v-model="formData.zipCode"
                  :class="{
                    error: formData.zipCodeEmpty || formData.zipCodeInvalid,
                  }"
                  @input="validZipCode"
                  required
                />
              </div>
              <div class="box">
                <label for="country">Country<span>*</span></label>
                <p class="error-message" v-if="formData.countryEmpty">
                  Field can't be empty
                </p>
                <input
                  type="text"
                  id="country"
                  v-model="formData.country"
                  :class="{ error: formData.countryEmpty }"
                  @input="allowLettersOnly"
                  required
                />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="contact__forms--delivery">
        <form>
          <fieldset>
            <legend>Delivery Methods</legend>
            <div class="delivery">
              <div class="delivery__header">
                <p>Delivery Type :</p>
              </div>
              <div class="delivery__type">
                <div>
                  <input
                    type="radio"
                    id="personally"
                    name="type"
                    value="Personally"
                    v-model="formData.deliveryType"
                    checked
                  />
                  <label for="personally">Personally</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="courier"
                    name="type"
                    value="Courier"
                    v-model="formData.deliveryType"
                  />
                  <label for="courier">Courier</label>
                </div>
              </div>
            </div>
            <div v-if="formData.deliveryType == 'Courier'" class="container">
              <div class="column">
                <div class="box">
                  <label for="country">Country<span>*</span></label>
                  <p class="error-message" v-if="formData.copyCountryEmpty">
                    Field can't be empty
                  </p>
                  <input
                    type="text"
                    id="country"
                    v-model="formData.copyCountry"
                    :class="{ error: formData.copyCountryEmpty }"
                    @input="allowLettersOnly"
                    required
                  />
                </div>
                <div class="box">
                  <label for="city">City<span>*</span></label>
                  <p class="error-message" v-if="formData.copyCityEmpty">
                    Field can't be empty
                  </p>
                  <input
                    type="text"
                    id="city"
                    v-model="formData.copyCity"
                    :class="{ error: formData.copyCityEmpty }"
                    @input="allowLettersOnly"
                    required
                  />
                </div>
              </div>
              <div class="column">
                <div class="box">
                  <label for="street">Street<span>*</span></label>
                  <p class="error-message" v-if="formData.copyStreetEmpty">
                    Field can't be empty
                  </p>
                  <input
                    type="text"
                    id="street"
                    v-model="formData.copyStreet"
                    :class="{ error: formData.copyStreetEmpty }"
                    required
                  />
                </div>
                <div class="box">
                  <label for="zip_code">Zip Code<span>*</span></label>
                  <p class="error-message" v-if="formData.copyZipCodeEmpty">
                    Field can't be empty
                  </p>
                  <p class="error-message" v-if="formData.copyZipCodeInvalid">
                    Invalid zip code
                  </p>
                  <input
                    type="text"
                    id="zip_code"
                    v-model="formData.copyZipCode"
                    :class="{
                      error:
                        formData.copyZipCodeEmpty ||
                        formData.copyZipCodeInvalid,
                    }"
                    @input="validZipCode"
                    required
                  />
                </div>
                <div class="box buttons">
                  <button type="button" @click="repeatValues">Repeat</button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="contact__button">
      <button @click="backToCart" type="button">Back</button>
      <button @click="submitForm" type="button">Go to Payment Methods</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.contact {
  padding: 64px 16px;

  .error {
    border: 1px solid red;
  }

  .error-message {
    color: red;
    margin: 5px 0;
  }

  &__forms {
    &--clientType {
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
        }
        .box {
          display: flex;
          flex-direction: column;
          padding: 0px 10%;

          input {
            padding: 8px;
            margin: 10px 0;
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
          }
        }
      }
    }

    label {
      font-size: 18px;
    }
    legend {
      font-size: 24px;
    }

    &--info {
      margin-top: 20px;
      fieldset {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 32px;

        .box {
          display: flex;
          flex-direction: column;
          padding: 0px 10%;
          input {
            padding: 8px;
            margin: 10px 0;
            width: 100%;
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
          }
        }
        .column {
          width: 50%;
        }
      }
    }
    &--delivery {
      margin-top: 20px;

      fieldset {
        padding: 32px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .container {
          display: flex;
          flex-direction: row;

          .box {
            display: flex;
            flex-direction: column;
            padding: 0px 10%;
            input {
              padding: 8px;
              margin: 10px 0;
              width: 100%;
              font-family: "Montserrat", sans-serif;
              font-size: 16px;
            }
          }
          .column {
            width: 50%;
          }
        }
      }

      .buttons {
        margin: 15px 0px;
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

      .delivery {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 10px;

        p {
          font-size: 19px;
        }

        label {
          margin-left: 7px;
          @media (max-width: 615px) {
            font-size: 15px;
          }
          @media (max-width: 550px) {
            font-size: 11px;
          }
        }

        &__type {
          display: flex;
          gap: 30px;
          padding: 15px 0;
        }
      }
    }
  }

  &__button {
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
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: center;

    h2 {
      font-size: 32px;
      margin-bottom: 10px;
    }
  }
  span {
    color: red;
  }
}
</style>
