<script setup lang="ts">
const emit = defineEmits(["show,toggleShowAside"]);
const props = defineProps(["showAside"]);

const showNewsletter = () => {
  emit("show");
};
const hideAside = () => {
  emit("toggleShowAside");
};
</script>
<template>
  <div class="sidebar" :class="{ show: props.showAside }">
    <div class="sidebar__header">
      <h3 class="sidebar__header--logo">
        <b><router-link :to="{ name: 'home' }">LOGO </router-link></b>
      </h3>
      <font-awesome-icon @click="hideAside" icon="fa-solid fa-xmark" />
    </div>
    <div class="sidebar__content">
      <a class="sidebar__content--items-item" href="#">Shirts</a>
      <a class="sidebar__content--items-item" href="#">Dresses</a>
      <a class="sidebar__content--items-item text-dark" href="#">
        Jeans <font-awesome-icon icon="fa-solid fa-caret-down" />
      </a>
      <div class="sidebar__content--items">
        <a href="#" class="sidebar__content--items-item text-small text-dark">
          <font-awesome-icon icon="fa-solid fa-caret-right" />
          <span>Skinny</span></a
        >
        <a href="#" class="sidebar__content--items-item text-small">Relaxed</a>
        <a href="#" class="sidebar__content--items-item text-small">Bootcut</a>
        <a href="#" class="sidebar__content--items-item text-small">Straight</a>
      </div>
      <a href="#" class="sidebar__content--items-item">Jackets</a>
      <a href="#" class="sidebar__content--items-item">Gymwear</a>
      <a href="#" class="sidebar__content--items-item">Blazers</a>
      <a href="#" class="sidebar__content--items-item">Shoes</a>
    </div>
    <div class="sidebar__footer">
      <a href="#footer">Contact</a>
      <a @click="showNewsletter" href="#footer">Newsletter</a>
      <a href="#footer">Subscribe</a>
    </div>
  </div>
</template>
<style scope lang="scss">
.sidebar {
  height: 100%;
  width: 250px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: fixed;

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 16px;

    &--logo {
      margin: 10px 0;
      letter-spacing: 4px;
      font-size: 24px;
      a {
        text-decoration: none;
        color: #000;
      }
      b {
        font-weight: 600;
        cursor: pointer;
      }
    }
    svg {
      cursor: pointer;
      display: none;

      &:hover {
        background-color: #ccc;
      }
      @media (max-width: 992px) {
        display: block;
        padding: 8px 16px;
      }
    }
  }

  &__content {
    padding-top: 64px;
    padding-bottom: 64px;
    display: flex;
    flex-direction: column;

    &--items {
      display: flex;
      flex-direction: column;
      padding: 12px 24px;

      &-item {
        font-family: "Roboto", sans-serif;
        cursor: pointer;
        background-color: inherit;
        text-decoration: none;
        border-style: none;
        font-size: 18px;
        text-align: left;
        width: 100%;
        display: block;
        padding: 8px 16px;
        color: #757575;
        font-weight: bolder;

        &:hover {
          background-color: #ccc;
          color: #000;
        }
      }
      .text-small {
        font-size: 15px;
      }
      .text-dark {
        color: #000;
        span {
          margin-left: 15px;
        }
      }
    }
    .text-dark {
      color: #000;
    }
  }
  &__footer {
    display: flex;
    flex-direction: column;
    justify-items: left;

    a {
      font-family: "Roboto", sans-serif;
      text-decoration: none;
      color: #000;
      padding: 8px 16px;
      font-size: 15px;
      &:hover {
        background-color: #ccc;
      }
    }
  }
  @media (max-width: 992px) {
    display: none;
    background-color: white;
    &.show {
      display: block;
    }
  }
}
</style>
