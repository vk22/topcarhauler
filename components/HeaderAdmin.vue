<template>
    <header class="admin-header">
      <div class="header-l">
        <div class="logo">VRV Global Admin</div>
        <ul>
          <!-- <li><nuxt-link to="/">Home</nuxt-link></li> -->
          <li><nuxt-link to="/quotes">Quotes</nuxt-link></li>
          <li><nuxt-link to="/requests">Requests</nuxt-link></li>
        </ul>
      </div>
      <div class="header-r">
        <div class="logout" v-if="authenticated" @click="logout()">Logout</div>
      </div>

    </header>
</template>
  
<script setup> 

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const logout = () => {
  logUserOut();
  location.reload();
};

//store.autoGalleryStart()

</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.admin-header {
    display: flex;
    justify-content: space-between;
    z-index: 9;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    background: #fff;

    .header-l, .header-r {
      // width: 200px;
      display: flex;
      align-items: center;
    }

    .header-l {

      .logo {
        color: #0c2648;
        font-weight: 800;
        margin-right: 2rem;
        padding-right: 2rem;
        border-right: 1px solid #ddd;
      }
      ul {
        display: flex;
        li {
          margin-right: 1rem;
          a {
            color: #555;
            text-decoration: none;
            font-weight: 400;
            &.router-link-active.router-link-exact-active {
              color: #333;
              text-decoration: none;
              font-weight: 600;
            }
          }
        }
      }
    }

    .header-r {
      justify-content: flex-end;
    }
 
    .logo {
      img {
        width: 200px;
        @include for-700-height-only {
          width: 120px;
        }
      }
    }

    .btn-quote {
      background-color: #00000012;
      border: 1px solid #fff;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-size: .75rem;
      font-weight: 600;
      letter-spacing: .5px;
      padding: 0.75rem 2rem;
      text-align: center;
      text-transform: uppercase;
      transition-duration: .25s;
      transition-property: all;
      transition-timing-function: ease-out;
      width: auto;
    }
}

.quote-form-container {
  background: #fff;
  padding: 3rem 2rem;
  border-radius: 6px;
}

</style>