import FormData from "../types/FormData";
import PaymentData from "../types/PaymentData";

interface FormStoreState {
  formData: FormData;
  paymentData: PaymentData;
  isValid: boolean;
}

const formStore = {
  state: {
    formData: {},
    paymentData: {},
  } as FormStoreState,

  mutations: {
    setFormData(state: FormStoreState, formData: FormData) {
      state.formData = formData;
    },
    setPaymentData(state: FormStoreState, paymentData: PaymentData) {
      state.paymentData = paymentData;
    },
  },
  getters: {
    getStoreFormData(state: any) {
      return state.formData;
    },
    getStorePaymentData(state: any) {
      return state.paymentData;
    },
  },
};

export default formStore;
