import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../views/DefaultLayout.vue";
import Home from "../views/Home.vue";
import ProductDetails from "../views/ProductDetails.vue";
import ShopCart from "../views/ShopCart.vue";
import ContactForm from "../views/ContactForm.vue";
import PaymentForm from "../views/PaymentForm.vue";
import Summary from "../views/Summary.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/product/:id",
        name: "productDetails",
        component: ProductDetails,
      },
      {
        path: "/cart",
        name: "shopCart",
        component: ShopCart,
      },
      {
        path: "/contact",
        name: "contactForm",
        component: ContactForm,
      },
      {
        path: "/payment",
        name: "paymentForm",
        component: PaymentForm,
      },
      {
        path: "/summary",
        name: "summary",
        component: Summary,
      },
      {
        path: "/:catchAll(.*)",
        name: "wrongPath",
        component: Home,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
