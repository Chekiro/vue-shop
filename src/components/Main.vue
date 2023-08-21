<script setup></script>
<template>
  <div class="main">
    <img src="https://www.w3schools.com/w3images/jeans.jpg" alt="Logo" />
    <div class="main__title">
      <h1>New arrivals</h1>
      <h1>Collection 2016</h1>
      <button>SHOP NOW</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.main {
  padding: 0.01em 16px;
  position: relative;
  img {
    width: 100%;
  }
  &__title {
    padding: 24px 48px;
    color: white;
    position: absolute;
    left: 0;
    top: 0;

    h1 {
      margin: 10px 0;
      font-weight: 400;
      &:nth-child(1) {
        font-size: 64px;

        @media (max-width: 500px) {
          font-size: 36px;
        }
      }
      &:nth-child(2) {
        text-transform: uppercase;
        font-size: 36px;

        @media (max-width: 500px) {
          display: none;
        }
      }
    }

    button {
      display: inline-block;
      background-color: black;
      padding: 15px 26px;
      margin: 7px 0px;
      font-weight: 400;
      font-size: 18px;
      font-family: "Montserrat", sans-serif;
      outline-style: none;
      cursor: pointer;
      color: white;
      border: none;

      &:hover {
        background-color: #ccc;
        color: #000;
      }
    }
  }
}
</style>
