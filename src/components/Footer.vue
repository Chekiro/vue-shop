<script setup></script>
<template>
  <div class="footer">
    <div class="footer__content">
      <div class="footer__content--contact">
        <h4>Contact</h4>
        <p>Questions? Go ahead.</p>
        <form action="/action_page.php" target="_blank">
          <p>
            <input
              class="w3-input w3-border"
              type="text"
              placeholder="Name"
              name="Name"
              required
            />
          </p>
          <p>
            <input
              class="w3-input w3-border"
              type="email"
              placeholder="Email"
              name="Email"
              required
            />
          </p>
          <p>
            <input
              class="w3-input w3-border"
              type="text"
              placeholder="Subject"
              name="Subject"
              required
            />
          </p>
          <p>
            <input
              class="w3-input w3-border"
              type="text"
              placeholder="Message"
              name="Message"
              required
            />
          </p>
          <button type="submit" class="w3-button w3-block w3-black">
            Send
          </button>
        </form>
      </div>

      <div class="footer__content--about">
        <h4>About</h4>
        <p><a href="#">About us</a></p>
        <p><a href="#">We're hiring</a></p>
        <p><a href="#">Support</a></p>
        <p><a href="#">Find store</a></p>
        <p><a href="#">Shipment</a></p>
        <p><a href="#">Payment</a></p>
        <p><a href="#">Gift card</a></p>
        <p><a href="#">Return</a></p>
        <p><a href="#">Help</a></p>
      </div>
      <div class="footer__content--store">
        <h4>Store</h4>
        <p>
          <font-awesome-icon icon="fa-solid fa-location-dot" /> Company Name
        </p>
        <p><font-awesome-icon icon="fa-solid fa-phone" /> 0044123123</p>
        <p><font-awesome-icon icon="fa-solid fa-envelope" /> ex@mail.com</p>
        <h4>We accept</h4>
        <p><font-awesome-icon icon="fa-brands fa-cc-amex" /> Amex</p>
        <p>
          <font-awesome-icon icon="fa-regular fa-credit-card" /> Credit Card
        </p>
        <br />
        <div class="footer__content--store-icons">
          <font-awesome-icon icon="fa-brands fa-square-facebook" />
          <font-awesome-icon icon="fa-brands fa-instagram" />
          <font-awesome-icon icon="fa-brands fa-snapchat" />
          <font-awesome-icon icon="fa-brands fa-pinterest-p" />
          <font-awesome-icon icon="fa-brands fa-twitter" />
          <font-awesome-icon icon="fa-brands fa-linkedin-in" />
        </div>
      </div>
    </div>
    <div class="footer__author">
      <span>Powered by</span><a href="#">w3.css</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__content {
    width: 100%;
    background-color: #f1f1f1;
    text-align: center;
    display: flex;
    flex-direction: row;
    padding: 64px 8px;

    h4 {
      font-size: 20px;
      margin: 10px 0;
      font-weight: 400;
    }
    p {
      font-size: 12px;
      margin: 12px 0;
    }

    &--contact {
      width: 33%;
      padding: 0 8px;

      input {
        border: 1px solid #ccc;
        width: 100%;
        padding: 8px;
      }
      button {
        cursor: pointer;
        width: 100%;
        background-color: #000;
        padding: 8px 16px;
        text-decoration: none;
        color: white;
        text-align: center;
        border: none;

        &:hover {
          color: #000;
          background-color: #ccc;
        }
      }
    }
    &--about {
      width: 33%;
      padding: 0 8px;

      a {
        color: #000;
      }
    }
    &--store {
      width: 33%;
      padding: 0 8px;
      text-align: justify;

      &-icons {
        display: flex;
        gap: 5px;

        svg:hover {
          opacity: 0.5;
        }
      }
    }
  }
  &__author {
    background-color: #000;
    text-align: center;
    font-size: 15px;
    padding: 24px 0;
    color: white;

    span {
      margin-right: 5px;
    }
    a {
      color: white;
    }
  }
}
</style>
