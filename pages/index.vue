<template>
  <v-app>
    <div class="wrapper">
      <SendEmailResponse></SendEmailResponse>
      <Header></Header>
      <!-- Top Banner -->
      <TopBanner></TopBanner>
      <section class="content">
        <AboutUs></AboutUs>
        <Advantages></Advantages>
        <WorkWithUs></WorkWithUs>
      </section>
      <section class="forma" id="forma">
        <div class="forma__container">
          <Form2 :mode="'cv-form'" :title="'Join our team'"></Form2>
        </div>
      </section>
      <Footer></Footer>
    </div>
  </v-app>
</template>

<script setup> 
  // import { useMainStore }  from '@/store/index'
  // const store = useMainStore()

</script>


<style lang="scss">
@import "assets/scss/main.scss";


.body h1 {
  font-family: sans-serif;
  font-size: 8vw;
}


.overlay {
  // background: #0d6b80ba;
  // background: #002229ba;
  background-color: rgba($color: #000000, $alpha: 0.3);
  background-image: radial-gradient(at center, #3e3e3e26 20%, #2c3238b7 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.nav {
  width: 90%;
  display: flex;
  justify-content: center;

  .nav-arr {
    margin: 0 24px;
    &.disable {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__left {
    svg {
      transform: rotate(-180deg);
    }
  }

  svg {
    width: 40px;
    path {
      fill: #fff;
    }
  }

  .dot {
    background: #fff;
    width: 30px;
    height: 5px;
    margin: 5px;
    opacity: .5;
    transition: opacity .25s ease-in-out;
    border-radius: 2px;
    cursor: pointer;

    &.active {
      opacity: 1;
    }
  }
}

.forma {
  background: #d4d8e937;
  padding: 5rem 2.5rem;
  display: flex;
  justify-content: center;
  

  &__container {
    width: 100%;
    max-width: 700px;
  }
}

</style>
