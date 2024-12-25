<template>
  <div class="feedback-form">
    <h2>{{ title }}</h2>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        label="Name"
        variant="solo"
      ></v-text-field>

      <v-text-field
        v-model="phone.value.value"
        :counter="7"
        :error-messages="phone.errorMessage.value"
        label="Phone Number"
        variant="solo"
      ></v-text-field>

      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
        variant="solo"
      ></v-text-field>

      <v-textarea
        v-model="select.value.value"
        :items="items"
        :error-messages="select.errorMessage.value"
        label="Message"
        variant="solo"
      ></v-textarea>

      <div class="input-file-row" v-if="mode === 'cv-form'">
            <label class="input-file">
                <input type="file" name="file" @change="handleFileChange">		
                <span>Upload your CV</span>
            </label>
            <div class="file-added">{{  filename }} </div>  
        </div>  

      <v-checkbox
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        value="1"
        label="I have read and agreed to both the terms & conditions and the Privacy Policy"
        type="checkbox"
      ></v-checkbox>

      <!-- <v-btn block class="me-4" type="submit" variant="flat" color="#021D40" size="large">Send</v-btn> -->

      <v-btn
        class="text-none text-subtitle-1"
        color="#021D40"
        size="large"
        variant="flat"
        block
        type="submit"
      >
        Send
      </v-btn>

      <!-- <v-btn @click="handleReset"> clear </v-btn> -->
    </form>
  </div>
</template>
  
<script setup>
  import { ref } from 'vue'
  import { useField, useForm } from 'vee-validate'
  import { useMainStore }  from '@/store/index'
  const store = useMainStore()

  const props = defineProps(['mode', 'title'])
  console.log('props.mode ', props.mode)
  //const title = ref((props.mode == 'qoute') ? 'Get an instant qoute' : 'Send us your CV')

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value) {
        if (value?.length >= 2) return true
        return 'Name needs to be at least 2 characters.'
      },
      phone (value) {
        if (value?.length > 9 && /[0-9-]+/.test(value)) return true
        return 'Phone number needs to be at least 9 digits.'
      },
      email (value) {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) return true
        return 'Must be a valid e-mail.'
      },
      checkbox (value) {
        console.log('checkbox value ', value)
        if (value === '1') return true
        return 'Must be checked.'
      },
    },
  })
  const name = useField('name')
  const phone = useField('phone')
  const email = useField('email')
  const select = useField('select')
  const checkbox = useField('checkbox')
  const file = useField('file')
  const filename = ref(undefined)

  const submit = handleSubmit( async (values) => {
    values.mode = props.mode
    if (props.mode === 'cv-form') {
      console.log('filename ', filename)
      values.filename = filename
    }
    console.log('values: ', JSON.stringify(values, null, 2))
    const { data } = await useFetch('/api/sendform', {
        method: "POST",
        body: values,
        headers: {"cache-control": "no-cache"},
        onResponse(context) {
            console.log('onResponse ', context.response._data)
            handleFileUpload()
        }
    })

   })

  const handleFileChange = fileData => {
      const fileInputData = fileData.target
      console.log('fileInputData ', fileInputData);
      if (fileInputData.files && fileInputData.files?.length > 0) {
          file.value = fileInputData.files[0]
          file.filename = file.value.name
          filename.value = file.value.name
          console.log('file.value ', file.value.name);
          
      }
  }
  const handleFileUpload = async () => {
      console.log(file)
      const body = new FormData()
      body.append("file", file.value)
      await useFetch("/api/uploadfile", {
          method: "POST",
          body: body,
          onResponse(context) {
              handleReset()
              store.setSendmailResponse({
                status: 'success', mode: true
              })
              setTimeout(() => {
                store.setSendmailResponse({
                  status: null, mode: null
                })
              }, 5000);

          }
      })
  }


</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.feedback-form {
  width: 100%;

  &__heading {
    letter-spacing: px;
    font-weight: 400;
    line-height: 1.45;
    text-align: left;
    margin: 0px 0 2rem;

    @include for-phone-only {
      font-size: 1.15rem;
    }

    @include for-tablet-portrait-up {
      font-size: 1.25rem;
    }

    @include for-desktop-up {
      font-size: 1.75rem;
    }

    @include for-big-desktop-up {
      font-size: 2rem;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    padding: 0 0px;

    @include for-phone-only {
      padding: 0 0px;
    }

    @include for-tablet-portrait-up {
      padding: 0 0px;
    }

    input {
      display: block;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: #ffffff;
      // background-color: #ffffff40;
      background: transparent;
      border: 1px solid #ffffff;
      //border-bottom: 1px solid #909090;
      box-shadow: none;
      padding: 1.25rem 1rem;
      border-radius: 4px;
      width: 100%;
      max-width: 100%;
      font-size: 1rem;
      transition: all 0.15s ease-in-out;

      @include for-700-height-only {
        padding: 1rem 0.75rem;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.15);
      }

      &:focus {
        background: rgba(255, 255, 255, 0.15);
        outline: none;
      }
    }

    .main-btn {
      display: block;
      padding: 1.25rem 1rem;
      width: 100%;
      border-radius: 4px;
      text-align: center;
      font-weight: 600;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #fff;
      cursor: pointer;
      transition-property: all;
      transition-duration: 0.25s;
      transition-timing-function: ease-out;
      background-color: $mainColor;
      border: 1px solid $mainColor;

      @include for-700-height-only {
        padding: 1rem 0.75rem;
      }

      &:hover {
        background-color: $mainColorHover;
        border: 1px solid $mainColorHover;
        color: #fff;
      }

      &:disabled {
        opacity: 0.75;

        &:hover {
          background-color: $mainColor;
          color: #fff;
          cursor: default;
        }
      }
    }

    .field {
      width: 100%;
      margin-bottom: 0.75rem;

      @include for-700-height-only {
        margin-bottom: 0.35rem;
      }
      @include for-800-height-only {
        margin-bottom: 0.35rem;
      }
    }

    .errors {
      position: relative;
    }

    .errors ul,
    .errors {
      list-style: none;
      margin: 0;
      padding: 0;
      color: #ffffff;
      font-size: 14px;
      line-height: 20px;
    }

    .field.has-error label,
    .field.has-error a {
      color: #dc3545 !important;
    }

    .field.has-error input {
      border: 1px solid #dc3545 !important;
      background: rgba(246, 102, 102, 0.25);
    }

    .field .error {
      display: none;
      color: #dc3545 !important;
    }

    /////@extend

    ::placeholder {
      color: rgba(255, 255, 255, 0.75);
      font-size: 1rem;

      @include for-phone-only {
        font-size: 1rem;
      }

      @include for-tablet-portrait-up {
        font-size: 1rem;
      }
    }
  }

  &__footer {
    justify-content: flex-end !important;
    margin-top: 0.25rem;
  }

  .alright {
    @include for-phone-only {
      font-size: 0.65rem;
      line-height: 1.15;
      margin-top: 0.75rem;
    }

    @include for-tablet-portrait-up {
      font-size: 0.65rem;
      line-height: 1.25;
      margin-top: 1rem;
    }

    @include for-700-height-only {
      margin-top: 0.25rem;
    }
  }

  .success-message {
    color: #fff;
    font-weight: 400;
    min-height: 250px;
    font-size: 1.35rem;
    text-transform: uppercase;
    width: 100%;
    transform: translateY(-15px);
    transition: all 0.75s ease;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    // background: #fff;
    // box-shadow: 0 1px 20px rgba(0, 0, 0, 0.15);

    &.show {
      transform: translateY(0px);
      opacity: 1;
      visibility: visible;
    }

    .success-icon {
      position: relative;
      width: 52px;
      margin-bottom: 2rem;
      fill: transparent;
      z-index: 1;

      path {
        stroke: #f7f7f7;
      }
    }

    p {
      margin-top: 0.5rem;
      text-transform: none;
      font-size: 1rem;
      font-weight: 400;
      font-style: normal;
    }

    small {
      font-size: 1.15rem;
      text-transform: none;
    }
  }

  .field.has-error .error {
    display: block;
  }
}

.input-file-row {
  display: flex;
  align-items: center;
}
.input-file {
  position: relative;
  display: flex;
  margin-right: 1rem;
}
.input-file span {
	position: relative;
	display: inline-block;
	cursor: pointer;
	outline: none;
	text-decoration: none;
	font-size: 14px;
  font-weight: 600;
	vertical-align: middle;
	color: rgb(46, 46, 46);
	text-align: center;
	border-radius: 4px;
	background-color: transparent;
  border: 3px dashed #c9c9c9;
	line-height: 22px;
	//height: 40px;
	padding: 10px 20px;
	box-sizing: border-box;
	// border: none;
	margin: 0;
	transition: border-color 0.2s;

  &:hover {
    background-color: transparent!important;
    border-color: #a0a0a0!important;
  }
}
.input-file input[type=file] {
	position: absolute;
	z-index: -1;
	opacity: 0;
	display: block;
	width: 0;
	height: 0;
}
 
/* Focus */
.input-file input[type=file]:focus + span {
	//box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}
 
/* Hover/Active */
.input-file:hover span {
	background-color: #0f3464;
}
.input-file:active span {
	background-color: #081c36;
}
 
/* Disabled */
.input-file input[type=file]:disabled + span {
	background-color: #eee;
}
 
/* Список файлов */
.input-file-list {
	padding: 10px 0;
}
.input-file-list-item {
	margin-bottom: 10px;
}
.input-file-list-remove {
	color: red;
	text-decoration: none;
	display: inline-block;
	margin-left: 5px;
}

///
/// 
/// 
.v-field--variant-solo, .v-field--variant-solo-filled {
  box-shadow: none!important;
  border: 1px solid #BDBDBD!important;
  overflow: hidden!important;

}

.v-btn.v-btn--density-default {
  font-family: $font-sans!important;
  height: 50px!important;
  border-radius: 6px;
  text-transform: uppercase!important;
  letter-spacing: .5px!important;
}
</style>