<script setup>
const emit = defineEmits(["show"]);

const hideNewsletter = () => {
  emit("show");
};
</script>
<template>
  <div class="newsletter">
    <div class="newsletter__content animate-zoom">
      <div class="newsletter__content--container">
        <div>
          <h2>
            NEWSLETTER
            <span
              ><font-awesome-icon
                @click="hideNewsletter"
                icon="fa-solid fa-xmark"
            /></span>
          </h2>

          <p>
            Join our mailing list to receive updates on new arrivals and special
            offers.
          </p>
          <p>
            <input type="email" placeholder="Enter e-mail" />
          </p>
          <button @click="hideNewsletter" type="button">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.newsletter {
  z-index: 10;
  position: fixed;
  padding-top: 100px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  &__content {
    width: 900px;
    position: relative;
    margin: auto;
    &--container {
      color: #000;
      background-color: #fff;
      text-align: center;
      padding: 32px;

      div {
        padding: 0 16px;
        h2 {
          font-size: 30px;
          margin: 10px 0;
          letter-spacing: 4px;
          font-weight: 400;

          svg {
            float: right;
            font-size: 36px;
            cursor: pointer;
          }
        }
        p {
          font-size: 15px;
          margin: 15px 0;

          input {
            border: 1px solid #ccc;
            width: 100%;
            padding: 8px;
            font: inherit;
          }
        }
        button {
          font: inherit;
          background-color: #f44336;
          color: #fff;
          padding: 12px 24px;
          margin-bottom: 16px;
          border: none;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          cursor: pointer;

          &:hover {
            color: #000;
            background-color: #ccc;
          }
        }
      }
    }
    @media (max-width: 992px) {
      width: 600px;
    }

    @media (max-width: 600px) {
      margin: 0 10px;
      width: auto;
    }
  }
  .animate-zoom {
    animation: animatezoom 0.6s;

    @keyframes animatezoom {
      from {
        transform: scale(0);
      }

      to {
        transform: scale(1);
      }
    }
  }
}
</style>
