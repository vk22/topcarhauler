<template>
  <section class="top-banner">
    <div class="top-banner__container">
      <div class="center">
        <div class="headline fadeIn-0">
          <div class="big">FINISHED VEHICLE LOGISTICS</div>
          <div class="medium">For new cars, used cars and <br>for car mobility services</div>
        </div>
        <div class="btn-quote" @click="gotToForm">Join our team</div>

      </div>
      <div class="nav fadeIn-1">
        <span class="dot" v-for="(item, index) in gallery" :key="index" :class="{ 'active': index === activeIndex }"
          @click="goToSlide(index)"></span>
      </div>
    </div>
    <div class="gallery" @click="toggleGallery()" :class="{ 'active': galleryIsActive }">
      <div class="gallery__wrap" :class="{
        'active': galleryItem.index === activeIndex,
        'slide-to-left': galleryItem.index === activeNext && galleryIsActive,
      }" v-for="galleryItem in gallery" :key="galleryItem.index">
        <div class="gallery__item hidden_mobile" :class="'image-' + galleryItem.index"
          :style="{ backgroundImage: 'url(' + galleryItem.url + ')' }"></div>
        <div class="gallery__item hidden_desktop" :class="'image-' + galleryItem.index"
          :style="{ backgroundImage: 'url(' + galleryItem.url_mob + ')' }"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: "img/gallery0.jpg"
    },
    {
      rel: "preload",
      as: "image",
      href: "img/gallery1.jpg"
    },
    {
      rel: "preload",
      as: "image",
      href: "img/gallery2.jpg"
    },
    {
      rel: "preload",
      as: "image",
      href: "img/gallery0_mob.jpg"
    },
    {
      rel: "preload",
      as: "image",
      href: "img/gallery1_mob.jpg"
    },
    {
      rel: "preload",
      as: "image",
      href: "img/gallery2_mob.jpg"
    }
  ]
})
import { useMainStore } from '@/store/index'
const store = useMainStore()
const gallery = store.getGallery
let activeIndex = computed(() => store.activeIndex)
let activeNext = computed(() => store.activeNext)
let dir = computed(() => store.dir)
let interval;
const startGallery = () => {
  interval = setInterval(() => store.autoGalleryNext(), 5000);
}

const goToSlide = (index) => {
  if (interval) {
    clearTimeout(interval)
  }
  store.goToSlide(index)
}
let galleryIsActive = false

setTimeout(() => {
  galleryIsActive = true
  startGallery()
}, 2000);

function gotToForm() {
  const position = document.getElementById('forma').offsetTop;
  window.scrollTo({ top: position, behavior: "smooth" });
}

</script>

<style lang="scss">
@import "assets/scss/variables.scss";


.top-banner {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 500px;
  height: 90vh;
  //min-height: 600px;
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;

  @include for-phone-only {
    margin-bottom: 0rem;
    height: 90vh;
  }

  @include for-tablet-portrait-up {
    margin-bottom: 0rem;
    height: 90vh;
  }

  @include for-desktop-up {
    margin-bottom: 5rem;
    height: 70vh;
  }

  &__container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    z-index: 999;
    padding: 3rem 0 3rem;

    @include for-phone-only {
      max-width: 90%;
    }

    @include for-tablet-portrait-up {
      max-width: 950px;
    }

    @include for-desktop-up {
      max-width: 950px;
    }

    @include for-big-desktop-up {
      max-width: 950px;
    }

    @include for-700-height-only {
      padding: 1.75rem 0 1.75rem;
    }

    @include for-800-height-only {
      padding: 2rem 0 2rem;
    }

    .center {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;

      @include for-phone-only {
        top: 35%
      }

      @include for-tablet-portrait-up {
        top: 35%
      }

      @include for-desktop-up {
        top: 35%
      }

      @include for-big-desktop-up {
        top: 45%
      }

      @include for-700-height-only {
        top: 35%
      }

      @include for-800-height-only {
        top: 45%
      }

    }

    .headline {
      font-size: 1.15rem;
      letter-spacing: 0.25px;
      font-weight: 400;
      color: #fff;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 5vh;

      @include for-700-height-only {
        margin-bottom: 5vh;
      }

      @include for-800-height-only {
        margin-bottom: 6vh;
      }

      .medium {
        font-size: 1.15rem;
        letter-spacing: 0.25px;
        font-weight: 400;

        @include for-phone-only {
          font-size: .95rem;
          line-height: 1.15rem;
          letter-spacing: 0.25px;
        }

        @include for-tablet-portrait-up {
          font-size: .95rem;
          line-height: 1.15rem;
          letter-spacing: 0.25px;
        }

        @include for-desktop-up {
          font-size: 1.15rem;
          line-height: 1.75rem;
          letter-spacing: 0.25px;
        }


        // @include for-700-height-only {
        //   font-size: .95rem;
        //   line-height: 1.15rem;
        //   letter-spacing: 0.25px;
        // }

        // @include for-800-height-only {
        //   font-size: 1.15rem;
        //   line-height: 1.55rem;
        //   letter-spacing: 0.25px;
        // }
      }

      .big {
        font-family: $font-sans;
        font-size: 4em;
        line-height: 1em;
        font-weight: 700;
        letter-spacing: 0.25px;
        padding: 1rem 0 1.35rem;
        margin-bottom: 1.5rem;

        @include for-phone-only {
          font-size: 3em;
          letter-spacing: 3px;
          line-height: 1.15em;
          padding: 0.25rem 0 0.45rem;
        }

        @include for-tablet-portrait-up {
          font-size: 3em;
          letter-spacing: 3px;
          line-height: 1em;
          padding: 0.25rem 0 0.45rem;
        }

        @include for-desktop-up {
          font-size: 4.25em;
          letter-spacing: 3px;
          line-height: 1em;
          padding: 0.45rem 0 0.65rem;
        }

        @include for-700-height-only {
          font-size: 3em;
          letter-spacing: 3px;
          line-height: 1.1em;
          padding: 0.25rem 0 0.45rem;
        }

        // @include for-700-height-only {
        //   font-size: 2.5em;
        //   letter-spacing: 0px;
        //   line-height: .85em;
        //   padding: 0.25rem 0 0.45rem;
        // }
        // @include for-800-height-only {
        //   font-size: 3.5em;
        //   letter-spacing: 0px;
        //   line-height: .85em;
        //   padding: 0.45rem 0 0.65rem;
        // }
      }

      div {}
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
      width: 200px;

      @include for-phone-only {
        display: block;
      }

      @include for-tablet-portrait-up {
        display: none;
      }

      @include for-desktop-up {
        display: none;
      }
    }
  }

}

.gallery {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: hidden;
  opacity: 1;
  animation: fadeInStart 1s;
  animation-fill-mode: forwards;

  &__wrap {
    background: rgb(0, 17, 38);
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__item {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    opacity: .75;
  }
}

.slide-to-left {
  right: 0;
  display: block;
  z-index: 89;
  overflow: hidden;
  animation: slideToLeft 1s;
  animation-fill-mode: forwards;

  .gallery__item {
    right: 0;
    animation: slideInL 1s;
    animation-fill-mode: forwards;
  }
}

.slide-to-right {
  left: 0;
  display: block;
  z-index: 89;
  overflow: hidden;
  animation: slideToRight 1s;
  animation-fill-mode: forwards;

  .gallery__item {
    left: 0;
    animation: slideInR 1s;
    animation-fill-mode: forwards;
  }
}

.activeNext {
  display: block;
  z-index: 9;
}

.active {
  display: block;
  z-index: 9;

  .gallery__item {
    // animation: scaleIn 6s;
    // animation-fill-mode: forwards;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(1);
    animation-timing-function: cubic-bezier(.565, .43, .24, .92);
  }

  100% {
    transform: scale(1.02);
    animation-timing-function: cubic-bezier(.565, .43, .24, .92);
  }
}

@keyframes slideToLeft {
  0% {
    width: 0%;
    animation-timing-function: cubic-bezier(.565, .43, .24, .92);
  }

  100% {
    width: 100%;
    animation-timing-function: cubic-bezier(.565, .43, .24, .92);
  }
}

@keyframes slideToRight {
  0% {
    width: 0;
    animation-timing-function: cubic-bezier(.565, .43, .24, .92);
  }

  100% {
    width: 100%;
    animation-timing-function: cubic-bezier(.565, .43, .24, .92);
  }
}

@keyframes slideInR {
  0% {
    transform: translateX(-45px) scale(1.01);
    transform-style: preserve-3d;
    animation-timing-function: cubic-bezier(.565, .43, .24, .92);
  }

  100% {
    transform: translateX(0px) scale(1);
    transform-style: preserve-3d;
  }
}

@keyframes slideInL {
  0% {
    transform: translateX(45px) scale(1.01);
    transform-style: preserve-3d;
    animation-timing-function: cubic-bezier(.565, .43, .24, .92);
  }

  100% {
    transform: translateX(0px) scale(1);
    transform-style: preserve-3d;
  }
}
</style>
