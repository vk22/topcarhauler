<template>
  <header class="main-header fadeIn-0" ref="someRefName">
    <div class="header-l">
      
    </div>
    <div class="header-c">
      <div class="logo">
        <img src="/img/logo.svg" alt="" />
      </div>
    </div>
    <div class="header-r">
      <div class="btn-quote" @click="gotToForm">Join our team</div> 
      <v-dialog v-model="dialog" width="auto">
        <div class="quote-form-container">
          <Form :mode="'quote'" :title="'Get an instant qoute'"></Form>
        </div>
      </v-dialog>
    </div>
  </header>
</template>
  
<!-- <script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      gotToForm() {
        this.$refs.targetRef.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
</script> -->

<script setup> 
  // import { useMainStore }  from '@/store/index'
  // const store = useMainStore()

  let dialog = false;

  function gotToForm() {
    const position = document.getElementById('forma').offsetTop;
    window.scrollTo({ top: position, behavior: "smooth" }); 
  }

</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.main-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    z-index: 9999;
    width: 100%;
    padding: 2rem;

    .header-l, .header-r {
      width: 40%;
      display: flex;
      align-items: flex-start;
      padding-top: 2rem;
      color: #fff;
    }

    .header-r {
      justify-content: flex-end;
      align-items: center;
      color: #fff;
      .phone {
        a {
          display: flex;
          text-decoration: none;
        }
        i {
          margin-right: .5rem;
        }
        @include for-phone-only {
          display: none;
        }
        @include for-tablet-portrait-up {
          display: flex;
          span {
            display: none;
          }
        }

        @include for-desktop-up {
          display: flex;
          span {
            display: block;
          }
        }
      }
      .btn-quote {
        margin-left: 2rem;
        @include for-phone-only {
          display: none;
        }
        @include for-tablet-portrait-up {
          display: flex;
        }

        @include for-desktop-up {
          display: flex;
        }
      }
    }
 
    .logo {
      img {
        width: 240px;
        
        @include for-phone-only {
          width: 240px;
        }
        @include for-tablet-portrait-up {
          width: 240px;
        }

        @include for-desktop-up {
          width: 240px;
        }
        @include for-700-height-only {
          width: 240px;
        }
      }
    }

    .btn-quote {
      background-color: #ff5722;
      border: 1px solid #ff5722;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-size: .85rem;
      font-weight: 600;
      letter-spacing: .5px;
      padding: 0.75rem 1rem;
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