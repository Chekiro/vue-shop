<script setup>
const emit = defineEmits(["toggleShowAside"]);

const toggleShowAside = () => {
  emit("toggleShowAside");
};
</script>
<template>
  <header class="header">
    <div>
      <p>LOGO</p>
      <font-awesome-icon @click="toggleShowAside" icon="fa-solid fa-bars" />
    </div>
  </header>
</template>
<style scoped lang="scss">
.header {
  color: #fff;
  background-color: #000;
  font-size: 24px;
  top: 0;
  letter-spacing: 4px;
  position: fixed;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  display: none;

  div {
    padding: 24px 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    svg {
      cursor: pointer;
    }
  }

  @media (max-width: 992px) {
    display: block;
    z-index: 1;
  }
}
</style>
