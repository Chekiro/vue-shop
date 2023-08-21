import { createStore } from "vuex";
import shopStore from "./shopStore";
import formStore from "./formStore";

export default createStore({
  modules: {
    shopStore,
    formStore,
  },
});
