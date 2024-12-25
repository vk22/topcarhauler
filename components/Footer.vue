<template>
  <footer>
    <div class="left">
      <div class="address">
        Florida<br>
        North Miami Beach <br>
        33160<br>
        
      </div>
      <div>
        <div class="phone"><a href="tel:+14844847777"><v-icon icon="mdi-phone"></v-icon> <span>+1 484 484 7777</span></a></div>
        <div class="mail"><v-icon icon="mdi-email"></v-icon> <a href="mailto:info@topcarhauler.com">info@topcarhauler.com</a></div>
      </div>
      <div class="social">
        <a href="https://www.instagram.com/topcarhauler/" target="_blank" class="social-icon icon-inst"></a>
        <!-- <div class="social-icon icon-fb"></div> -->
      </div>
    </div>
    <div class="center">
      <div class="logo">
          <img src="/img/logo.svg" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="nav">
        <!-- <ul>
          <li>
            <div>About Us</div>
            <div>Careers</div>
          </li>
        </ul> -->
        <ul>
          <li>
            <div><router-link to="/privacy">Privacy policy</router-link></div>
            <div><router-link to="/terms">Terms & Conditions</router-link></div>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
  
<script setup>

</script>

<style lang="scss">
@import "assets/scss/variables.scss";

footer {
  background-color: #021D40;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  color: #fff;

  a {
    color: #fff;
  }

  .left, .right {
    width: 300px;
  }

  .left {
    & > div {
      margin-bottom: 1.5rem;
    }

    .phone, .mail {
      line-height: 1.75rem;

      a {
        text-decoration: none;
      }
    }
  }

  .social {
    display: flex;

    .social-icon {
      background-size: 100%;
      background-repeat: no-repeat;
      width: 24px;
      height: 24px;
      margin-right: .5rem;
    }
    .icon-inst{
      background-image: url('/img/icon-inst.svg');
    }
    .icon-fb{
      background-image: url('/img/icon-fb.svg');
    }

  }

  .right {
    @include for-phone-only {
      display: none;
    }

    @include for-tablet-portrait-up {
      display: block;
    }
    .nav {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      ul {
        margin-bottom: 1rem;
        li {
          display: block;
          text-align: right;
          a {
            text-decoration: none;
          }
        }
      }
    }

  }
}

</style>