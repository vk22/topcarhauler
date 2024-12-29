
<template>
  <div class="feedback-form">
    <div class="feedback-form__heading">
      <h2>{{ title }}</h2>
    </div>
    <Form
      ref="form"
      @submit="onSubmit"
      :validation-schema="schema"
      @invalid-submit="onInvalidSubmit"
    >
      <TextInput
        name="name"
        type="text"
        label="Full Name"
        placeholder="Your Name"
        success-message="Nice to meet you!"
      />
      <TextInput
        name="phone"
        type="phone"
        label="Phone"
        placeholder="Your phone number"
        success-message="Got it!"
      />
      <TextInput
        name="email"
        type="text"
        label="Email"
        placeholder="Your email"
        success-message="Got it!"
      />
      <TextInput
        name="message"
        type="textarea"
        label="Message"
        placeholder="Your message"
        success-message="Thank you!"
      />
      <div class="input-file-row" v-if="mode === 'cv-form'">
        <label class="input-file">
          <input type="file" name="file" @change="handleFileChange" />
          <span>Upload your CV</span>
        </label>
        <div class="file-added">{{ filename }}</div>
      </div>

      <v-checkbox
        name="checkbox"
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        value="1"
        type="checkbox"
      >
        <template v-slot:label>
          <div>
            I have read and agreed to both the
            <a href="/privacy" target="_blank">Terms & Conditions</a> and the
            <a href="/terms" target="_blank">Privacy Policy</a>
          </div>
        </template>
      </v-checkbox>

      <!-- <ErrorMessage name="checkbox"></ErrorMessage> -->

      <button class="submit-btn" type="submit">Submit</button>
    </Form>
  </div>
</template>

<script setup>
import { Form, useField, ErrorMessage } from "vee-validate";
import { useMainStore } from "@/store/index";
const store = useMainStore();
const props = defineProps(["mode", "title"]);
console.log("props.mode ", props.mode);

let checkbox = useField("checkbox");
const file = useField("file");
const filename = ref(undefined);

const fileUploadStatus = ref(false);
const formDataUploadStatus = ref(false);

const schema = {
  name(value) {
    // console.log(' name value ', value)
    if (value?.length >= 2) return true;
    return "Name needs to be at least 2 characters.";
  },
  phone(value) {
    if (value?.length > 6 && /[0-9-]+/.test(value)) return true;
    return "Phone number needs to be at least 6 digits.";
  },
  checkbox(value) {
    // console.log('checkbox value ', checkbox.value.value)
    if (checkbox.value.value === "1") return true;
    return "Must be checked.";
  },
};

const handleFileChange = (fileData) => {
  const fileInputData = fileData.target;
  console.log("fileInputData ", fileInputData);
  if (fileInputData.files && fileInputData.files?.length > 0) {
    file.value = fileInputData.files[0];
    file.filename = file.value.name;
    filename.value = file.value.name;
    console.log("file.value ", file.value.name);
  }
};


const onInvalidSubmit = () => {
  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.classList.add("invalid");
  setTimeout(() => {
    submitBtn.classList.remove("invalid");
  }, 1000);
}

const onSubmit = async (values, { resetForm } ) => {
  values.mode = props.mode;
  if (props.mode === "cv-form") {
    console.log("filename ", filename);
    values.filename = filename.value;
  }
  // console.log("values: ", JSON.stringify(values, null, 2));

  /// uploadFile if exist
  if (values.filename) {
    const uploadFileRes = await uploadFile();
    if (uploadFileRes) {
      filename.value = "";
      fileUploadStatus.value = true
    }
  }
  /// sendForm
  const sendFormRes = await sendForm(values)
  console.log('sendFormRes ', sendFormRes)
  if (sendFormRes) {
    filename.value = "";
    formDataUploadStatus.value = true
  }
  if (sendFormRes.success) {
    afterSubmit(sendFormRes);
    resetForm();
  }

}

const sendForm = async (values) => {
  const { data, status } = await useFetch("/api/sendform", {
    method: "POST",
    body: values
  });
  return data.value
}

const uploadFile = async () => {
  // console.log('file ', file);
  const body = new FormData();
  body.append("file", file.value);
  const { data, status } = await useFetch("/api/uploadfile", {
    method: "POST",
    body: body
  });
  return data.value;
};

const afterSubmit = (response) => {
  // console.log("afterSubmit");
  if (response.success) {
    store.setSendmailResponse({
      status: response.status,
      mode: true,
    });
  }
  setTimeout(() => {
    store.setSendmailResponse({
      status: null,
      mode: null,
    });
  }, 5000);
};
</script>



<style lang="scss">
@import "assets/scss/variables.scss";

:root {
  --primary-color: #0071fe;
  --error-color: #f23648;
  --error-bg-color: #fddfe2;
  --success-color: #21a67a;
  --success-bg-color: #e0eee4;
}

.feedback-form {
  width: 100%;

  &__heading {
    letter-spacing: 1px;
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

form {
  width: 100%;
  margin: 0px auto;
  padding-bottom: 60px;
}

.submit-btn {
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
  &.invalid {
    animation: shake 0.5s;
    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }
  10% {
    transform: translate(-1px, -2px);
  }
  20% {
    transform: translate(-3px, 0px);
  }
  30% {
    transform: translate(3px, 2px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(-1px, 2px);
  }
  60% {
    transform: translate(-3px, 1px);
  }
  70% {
    transform: translate(3px, 1px);
  }
  80% {
    transform: translate(-1px, -1px);
  }
  90% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, -2px);
  }
}

.submit-btn:hover {
  //transform: scale(1.1);
}

////

.input-file-row {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
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
    background-color: transparent !important;
    border-color: #a0a0a0 !important;
  }
}
.input-file input[type="file"] {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
}

/* Focus */
.input-file input[type="file"]:focus + span {
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
.input-file input[type="file"]:disabled + span {
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
</style>
