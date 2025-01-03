<script setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div v-if="type !== 'textarea'"
    class="text-input"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label :for="name">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="help-message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
  <div v-else
    class="text-input"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label :for="name">{{ label }}</label>
    <textarea
      :name="name"
      :id="name"
      rows="5"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    ></textarea>

    <p class="help-message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.text-input {
  position: relative;
  margin-bottom: 1rem;
  width: 100%;

    &.has-error input {
    background-color: var(--error-bg-color);
    color: var(--error-color);
    }

    &.has-error input:focus {
    border-color: var(--error-color);
    }

    &.has-error .help-message {
    color: var(--error-color);
    }

    /* &.success input {
    background-color: var(--success-bg-color);
    color: var(--success-color);
    } */

    /* &.success input:focus {
    border-color: var(--success-color);
    } */

    &.success .help-message {
    color: var(--success-color);
    }

}

label {
  display: block;
  margin-bottom: 4px;
  width: 100%;
}

input, 
textarea {
  border-radius: 0px;
  border: 2px solid #BDBDBD;
  padding: 15px 10px;
  outline: none;
  background-color: #ffffff;
  width: 100%;
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;

    &:focus {
        border-color: var(--primary-color);
    }
}


.help-message {
  position: absolute;
  bottom: calc(-1.5 * 1em);
  left: 0;
  margin: 0;
  font-size: 14px;
}



</style>
