<script setup>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
import Newsletter from "../components/Newsletter.vue";
import MobileHeader from "../components/MobileHeader.vue";
import { ref } from "vue";

const showNewsletter = ref(false);
const toggleShowNewsletter = () => {
  showNewsletter.value = !showNewsletter.value;
};

const showAside = ref(false);
const toggleShowAside = () => {
  showAside.value = !showAside.value;
};
</script>
<template>
  <div class="app">
    <Newsletter v-if="showNewsletter" @show="toggleShowNewsletter" />
    <aside>
      <Aside
        @show="toggleShowNewsletter"
        @toggleShowAside="toggleShowAside"
        :showAside="showAside"
      />
    </aside>
    <div class="app__container">
      <div class="overlay" :class="{ blur: showAside }"></div>
      <MobileHeader @toggleShowAside="toggleShowAside" />
      <Header />
      <router-view />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  line-height: 1.5;

  aside {
    z-index: 1;
    width: 250px;
    height: 100%;
    @media (max-width: 992px) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
    }
  }

  &__container {
    width: calc(100% - 250px);
    display: flex;
    flex-direction: column;
    height: fit-content;

    @media (max-width: 992px) {
      width: 100%;
    }
    .overlay {
      display: none;
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 2;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      @media (max-width: 992px) {
        &.blur {
          display: block;
        }
      }
    }
  }
}
</style>
