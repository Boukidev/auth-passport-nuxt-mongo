<template>
  <main class="main">
    <h1 class="title-h1">reset password</h1>
    <form class="form-reset-password" @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <Icon class="password-icon" name="fluent:lock-closed-12-filled" />
        <input
          v-if="showPass"
          type="text"
          name="password"
          id="password"
          class="form-input"
          :class="{
            'border-bottom-red': v$.password.$error,
            'border-bottom-primary': !v$.password.$invalid,
          }"
          placeholder="Type your password"
          v-model="formData.password"
          @change="v$.password.$touch"
          @input="validatePass()"
          required
        />
        <input
          v-else
          type="password"
          name="password"
          id="password"
          class="form-input"
          :class="{
            'border-bottom-red': v$.password.$error,
            'border-bottom-primary': !v$.password.$invalid,
          }"
          placeholder="Type your password"
          v-model="formData.password"
          @change="v$.password.$touch"
          @input="validatePass()"
          required
        />
        <button v-if="showPass" class="btn btn-eye" @click="togglePass()">
          <Icon class="eye-icon" name="fluent:eye-off-16-filled" />
        </button>
        <button v-else class="btn btn-eye" @click="togglePass()">
          <Icon class="eye-icon" name="fluent:eye-12-filled" />
        </button>
        <span class="form-error password-error" v-if="v$.password.$error">
          Invalid password
        </span>
      </div>
      <div class="check-password">
        <ul class="check-list">
          <li :class="`check-item ${upper}`">1 Majuscule</li>
          <li :class="`check-item ${lower}`">1 Minuscule</li>
          <li :class="`check-item ${digit}`">1 chiffre</li>
          <li :class="`check-item ${specialChar}`">1 caractere special</li>
          <li :class="`check-item ${minChar}`">8 caractere minimum</li>
        </ul>
      </div>
      <div class="form-group">
        <input type="submit" class="btn btn-submit" value="Reset password" />
      </div>
      <div class="divider"></div>
      <div class="redirect-signin">
        Return to <nuxt-link to="/auth/signin">Signin</nuxt-link> form
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

const showPass = ref(false);
const togglePass = () => (showPass.value = !showPass.value);

const formData = reactive({ password: "" });
const rules = computed(() => {
  return { password: { required, minLength: minLength(8) } };
});
const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  if (!isFormCorrect || regex.test(formData.password)) {
    console.log("validation incorrect");
  } else {
    console.log("validation vérifié");
  }
  return 1;
};

const upper = ref("");
const lower = ref("");
const digit = ref("");
const specialChar = ref("");
const minChar = ref("");
const validatePass = () => {
  const upperRegex = /[A-Z]/;
  const lowerRegex = /[a-z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  const minCharRegex = /^.{8,}$/;

  if (upperRegex.test(formData.password)) {
    upper.value = "upper";
  } else {
    upper.value = "";
  }

  if (lowerRegex.test(formData.password)) {
    lower.value = "lower";
  } else {
    lower.value = "";
  }

  if (digitRegex.test(formData.password)) {
    digit.value = "digit";
  } else {
    digit.value = "";
  }

  if (specialCharRegex.test(formData.password)) {
    specialChar.value = "specialChar";
  } else {
    specialChar.value = "";
  }

  if (minCharRegex.test(formData.password)) {
    minChar.value = "minChar";
  } else {
    minChar.value = "";
  }

  return 1;
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: 5rem;
  padding: 4rem 3rem 2rem;
  border-radius: 10px;
  background-color: $white;
}
.title-h1 {
  margin-bottom: 3rem;
  text-align: center;
  text-transform: capitalize;
}
.form-reset-password {
  margin: 1rem 0;
}
.form-group {
  display: flex;
  flex-direction: column;
  position: relative;
}
.form-label {
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: $dark;
}
.form-input {
  margin-bottom: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: $light-gray;
  border: 2px solid transparent;
  border-bottom: 2.5px solid $primary;
  outline: none;
  transition: border-bottom ease-in-out 0.3s;
}
.border-bottom-red {
  border-bottom: 2.5px solid red;
}
.border-bottom-primary {
  border-bottom: 2.5px solid $primary;
}
.icon {
  position: absolute;
  top: 2.15rem;
  left: 0.25rem;
}
.eye-icon {
  left: initial;
  right: 0.25rem;
}
.form-error {
  position: absolute;
  bottom: 0;
  font-size: 13px;
  color: red;
}
.password-error {
  bottom: 1rem;
}
.check-list {
  padding-left: 1rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
}
.check-item {
  width: 50%;
}
.upper,
.lower,
.digit,
.specialChar,
.minChar {
  text-decoration: line-through;
}
.btn-submit {
  margin-top: 1.5rem;
  padding: 0.75rem;
  color: $white;
  background-color: $primary;
  border-radius: 5px;
}
.divider {
  height: 1px;
  width: 100%;
  margin: 1rem auto;
  background: linear-gradient(90deg, $white, $primary, $white);
  border-radius: 5px;
}
.redirect-signin {
  text-align: center;
  a {
    color: $primary;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
