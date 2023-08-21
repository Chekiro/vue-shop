import Product from "../types/Product";
import ProductCart from "../types/ProductCart";

interface shopStoreProps {
  selectedItem: null | ProductCart;
  cartItems: ProductCart[];
  totalPrice: any;
}

const shopStore = {
  state: {
    selectedItem: null,
    cartItems: [],
  },
  mutations: {
    setSelectedItem(state: shopStoreProps, selectedItem: Product) {
      const newItem: ProductCart = { ...selectedItem, quantity: 1 };
      state.selectedItem = newItem;
    },
    addToCart(state: any, cartItem: Product) {
      const existingItem = state.cartItems.find(
        (item: Product) => item.id === cartItem.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const selectedItem: ProductCart = { ...cartItem, quantity: 1 };
        state.cartItems.push(selectedItem);
      }

      state.totalPrice = computeTotalPrice(state.cartItems);
    },

    removeFromCart(state: any, itemId: number) {
      state.cartItems = state.cartItems.filter(
        (item: Product) => item.id !== itemId
      );
      state.totalPrice = computeTotalPrice(state.cartItems);
    },
    clearCart(state: any) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
    updateTotalPrice(state: any) {
      state.totalPrice = computeTotalPrice(state.cartItems);
    },
  },
  getters: {
    cartItemCount(state: any) {
      return state.cartItems.length;
    },
    totalCartPrice(state: any) {
      return state.totalPrice;
    },
    cartItemsDropDown(state: any) {
      return state.cartItems;
    },
  },
};

const computeTotalPrice = (cartItems: Product[]) => {
  let totalPrice = 0;
  for (const item of cartItems) {
    const price = parseFloat(item.price.slice(1));
    totalPrice += price * item.quantity;
  }
  return totalPrice.toFixed(2);
};

export default shopStore;
