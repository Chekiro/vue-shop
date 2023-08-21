<script setup></script>
<template>
  <div class="subscribe">
    <h1 class="subscribe__title">Subscribe</h1>
    <p class="subscribe__text">To get special offers and VIP treatment:</p>
    <p>
      <input class="subscribe__input" type="email" placeholder="Enter e-mail" />
    </p>

    <button type="button" class="subscribe__button">Subscribe</button>
  </div>
</template>
<style scoped lang="scss">
.subscribe {
  width: 100%;
  padding: 32px 16px;
  background-color: black;
  color: white;

  &__title {
    font-size: 36px;
    font-weight: 400;
    margin: 10px 0;
  }
  p {
    margin: 15px 0;
  }
  &__text {
    font-size: 15px;
  }
  &__input {
    width: 100%;
    background-color: white;
    padding: 13px;
    border: none;
  }
  &__button {
    margin-bottom: 16px;
    background-color: #f44336;
    border: none;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    font-family: "Montserrat", sans-serif;
    display: inline-block;
    padding: 11px 13px;
    color: white;
    text-decoration: none;

    &:hover {
      color: black;
      background-color: #ccc;
    }
  }
}
</style>
