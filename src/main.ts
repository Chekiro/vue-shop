import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import store from "./stores/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "./router";
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {
  faCaretDown,
  faCaretRight,
  faXmark,
  faCartShopping,
  faMagnifyingGlass,
  faLocationDot,
  faPhone,
  faEnvelope,
  faBars,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCcAmex,
  faInstagram,
  faLinkedinIn,
  faPinterestP,
  faSnapchat,
  faSquareFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
library.add(
  faCartShopping,
  faMagnifyingGlass,
  faCaretDown,
  faXmark,
  faCaretRight,
  faLocationDot,
  faPhone,
  faEnvelope,
  faPinterestP,
  faCcAmex,
  faSquareFacebook,
  faInstagram,
  faSnapchat,
  faTwitter,
  faLinkedinIn,
  faCreditCard,
  faBars,
  faTrash
);
createApp(App)
  .use(Vue3Toasity, {
    autoClose: 3000,
    pauseOnHover: false,
  } as ToastContainerOptions)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
