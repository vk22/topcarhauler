import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    host: undefined,
    activeIndex: 0,
    activeNext: 0,
    dir: 1,
    galleryIsWork: false,
    timerId: null,
    interval: null,
    gallery: [
      {
        index: 0,
        url: "gallery0.jpg",
        url_mob: "gallery0_mob.jpg",
      },
      {
        index: 1,
        url: "gallery1.jpg",
        url_mob: "gallery1_mob.jpg",
      },
      {
        index: 2,
        url: "gallery2.jpg",
        url_mob: "gallery2_mob.jpg",
      }
    ],
    messages: {
      'success': {
        title: "Your request has been accepted",
        subtitle: "We will contact you as soon as possible"
      },
      'dublicate': {
        title: "Dublicate",
        subtitle: "There is already a request for the data sent"
      },
      'error': {
        title: "There was an error",
        subtitle: "We're already dealing with her"
      },
    },
    sendEmailResponse: {
      status: null,
      mode: null
    },
    user: null
  }),
  actions: {
    autoGalleryNext() {
        // console.log('autoGalleryNext')
        this.galleryIsWork = true
        if (this.activeIndex === this.gallery.length - 1) {
            this.activeNext = 0;
        } else {
            this.activeNext = this.activeIndex + 1;
        }
        this.dir = 1;
        setTimeout(() => {
            this.activeIndex = (this.activeNext !== null) ? this.activeNext : this.activeIndex;
            this.activeNext = null;
            this.galleryIsWork = false
        }, 1000);
    },
    goToSlide(index) {
      if (this.galleryIsWork) return;
      // if (this.interval) {
      //   commit('CLEAR_GALLERY_INTERVAL');
      // }

      this.activeNext = index
      if (this.activeIndex < index) {
        this.dir = -1;
      } 
      if (this.activeIndex > index) {
        this.dir = 1;
      } 
      
      setTimeout(() => {
          this.activeIndex = (this.activeNext !== null) ? this.activeNext : this.activeIndex;
          this.activeNext = null;
          this.galleryIsWork = false
      }, 1000);
    },
    setSendmailResponse(response) {
      this.sendEmailResponse = response;
    },
  },
  getters: {
    getGallery: (state) => {
      const gallery = state.gallery.map(item => {
        return {
          index: item.index,
          url: `img/${item.url}`,
          url_mob: `img/${item.url_mob}`
        }
      }) 
      return gallery
    },
    getSendEmailResponse(state) {
      return {
        mode: state.sendEmailResponse.mode,
        messages: state.messages[state.sendEmailResponse.status]
      }
    },
    getUser(state) {
      return state.user
    }
  }
})