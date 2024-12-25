<template>
  <section class="advantages">
    <v-container>
      <!-- Advantages -->
      
        <v-row>
          <v-col>
            <div class="top-title">
                  <h2>Why choose us?</h2>
                </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(item, index) in advantages.slice(0,3)" :key="index" cols="12" md="4">
            <div class="advantages__item fadeIn-1">
              <div class="icon">
                <img :src="'/img/'+item.icon" alt="">
              </div>
              <div class="title">{{ item.title }}</div>
              <div class="content">
                {{ item.content }}
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col v-for="(item, index) in advantages.slice(3,6)" :key="index" cols="12" md="4">
            <div class="advantages__item fadeIn-2">
              <div class="icon">
                <img :src="'/img/'+item.icon" alt="">
              </div>
              <div class="title">{{ item.title }}</div>
              <div class="content">
                {{ item.content }}
              </div>
            </div>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col>
            At VRV Global Logistics Inc, we go the extra mile to make vehicle transportation a stress-free experience. Trust us to deliver your vehicles safely, efficiently, and with the utmost care. Get a quote today and let us take the wheel for you!
          </v-col>
        </v-row> -->
    </v-container>
  </section>
</template>

<script setup> 

const advantages = ref([
  
  {
    icon: 'usa-ic.png',
    title: 'Nationwide Coverage',
    content: 'From coast to coast, we cover every corner of the country, delivering your vehicles wherever you need them.'

  },
  {
    icon: 'experience-ic.png',
    title: 'Experienced Team',
    content: 'Our team of professionals is dedicated to providing top-notch service, backed by years of experience in the auto transportation industry.'

  },
  {
    icon: 'customized-ic.png',
    title: 'Customized Solutions',
    content: "Whether you're a dealership, individual, or corporate entity, we tailor our services to meet your specific needs. From single cars to entire fleets, we've got you covered."

  },
  {
    icon: 'technology-ic.png',
    title: 'State-of-the-Art Technology',
    content: 'We leverage cutting-edge technology to track and manage your shipment, providing real-time updates so you can stay informed every step of the way.'

  },
  {
    icon: 'insured-ic.png',
    title: 'Fully Insured',
    content: 'Your peace of mind is our priority. Rest easy knowing that your vehicles are fully insured during transit, safeguarding your valuable assets.'

  },
  {
    icon: 'pricing-ic.png',
    title: 'Transparent Pricing',
    content: 'No hidden fees. Our transparent pricing ensures you know exactly what to expect, making the process straightforward and hassle-free.'

  }
])

</script>

<style lang="scss">
@import "assets/scss/main.scss";

.advantages {
  // display: flex;
  background: #d4d8e937;
  padding: 4rem 0;

  @include for-phone-only {
    margin-bottom: 0rem;
  }

  @include for-tablet-portrait-up {
    margin-bottom: 0rem;
  }

  @include for-desktop-up {
    margin-bottom: 6rem;
  }

  .top-title {
    text-align: center;

    @include for-phone-only {
      margin-bottom: 2rem;
    }

    @include for-tablet-portrait-up {
      margin-bottom: 2rem;
    }

    @include for-desktop-up {
      margin-bottom: 4rem;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    text-align: center;
    padding: 0 2rem;

    @include for-phone-only {
      margin-bottom: 2rem;
    }

    @include for-tablet-portrait-up {
      margin-bottom: 2rem;
    }

    @include for-desktop-up {
      margin-bottom: 4rem;
    }

    .icon {
      img {
        height: 50px;
        width: auto;
        margin-bottom: 1rem;
      }
    }
    .title {
      color: $mainColor;
      font-size: 1.35rem;
      line-height: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }
    .content {

    }
  }
}

</style>
