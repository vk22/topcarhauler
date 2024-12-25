<template>
  <Transition name="success">
    <div class="success-message" v-if="sendEmailResponse.mode">
      <img class="icon" src="/img/logo.svg" alt="">
      <h3>{{ sendEmailResponse.messages.title }}</h3>
      <p>{{ sendEmailResponse.messages.subtitle }}</p>
    </div>
  </Transition>
</template>

<script setup> 
import { useMainStore }  from '@/store/index'
const store = useMainStore()
let sendEmailResponse =  computed(() => store.getSendEmailResponse)

</script>

    
<style lang="scss">
@import "assets/scss/main.scss";

.success-enter-active,
.success-leave-active {
  transition: all 0.5s ease;
}
.success-enter-from,
.success-leave-to {
  opacity: 0;
  transform: translateY(0px);
}

.success-message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 9999;
    color: #fff;
    text-transform: uppercase;
    transition: all 0.75s ease;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #011530d1;
    // box-shadow: 0 1px 20px rgba(0, 0, 0, 0.15);

    .icon {
        position: relative;
        width: 200px;
        margin-bottom: 2rem;
        fill: transparent;
        z-index: 1;

        path {
          stroke: #f7f7f7;
        }
    }

    h3 {
      color: #fff;
      font-weight: 600;
      font-size: 1.75rem;
      margin: 0;
    }

    p {
        color: #fff;
        margin-top: 0.5rem;
        text-transform: none;
        font-size: 1.5rem;
        font-weight: 400;
        font-style: normal;
    }

    small {
        font-size: 1.25rem;
        text-transform: none;
    }
}
</style>