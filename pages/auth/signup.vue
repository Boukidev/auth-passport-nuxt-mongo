<template>
  <main class="main">
    <h1 class="title-h1">Sign-up</h1>
    <form class="form-signup" @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <Icon class="user-icon" name="fluent:person-16-filled" />
        <input
          type="text"
          name="username"
          id="username"
          class="form-input"
          :class="{
            'border-bottom-red': v$.username.$error,
            'border-bottom-primary': !v$.username.$invalid,
          }"
          v-model="formData.username"
          @change="v$.username.$touch"
          placeholder="Type your username address"
          required
        />
        <span class="form-error" v-if="v$.username.$error">
          Username is required
        </span>
      </div>
      <div class="form-group">
        <label for="email" class="form-label">E-mail address</label>
        <Icon class="email-icon" name="fluent:mail-12-filled" size="18px" />
        <input
          type="email"
          name="email"
          id="email"
          class="form-input"
          :class="{
            'border-bottom-red': v$.email.$error,
            'border-bottom-primary': !v$.email.$invalid,
          }"
          placeholder="Type your e-mail address"
          v-model="formData.email"
          @change="v$.email.$touch"
          required
        />
        <span class="form-error" v-if="v$.email.$error">Invalid email</span>
      </div>
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
      <div class="form-group">
        <label for="confirm-password" class="form-label">
          Confirm password
        </label>
        <Icon class="password-icon" name="fluent:lock-closed-12-filled" />
        <input
          v-if="showConfirmPass"
          type="text"
          name="confirm-password"
          id="confirm-password"
          class="form-input"
          :class="{
            'border-bottom-red': v$.confirmPassword.$error,
            'border-bottom-primary': !v$.confirmPassword.$invalid,
          }"
          placeholder="Confirm your password"
          v-model="formData.confirmPassword"
          @change="v$.confirmPassword.$touch"
          required
        />
        <input
          v-else
          type="password"
          name="confirm-password"
          id="confirm-password"
          class="form-input"
          :class="{
            'border-bottom-red': v$.confirmPassword.$error,
            'border-bottom-primary': !v$.confirmPassword.$invalid,
          }"
          placeholder="Confirm your password"
          v-model="formData.confirmPassword"
          @change="v$.confirmPassword.$touch"
          required
        />
        <button
          v-if="showConfirmPass"
          class="btn btn-eye"
          @click="toggleConfirmPass()"
        >
          <Icon class="eye-icon" name="fluent:eye-off-16-filled" />
        </button>
        <button v-else class="btn btn-eye" @click="toggleConfirmPass()">
          <Icon class="eye-icon" name="fluent:eye-12-filled" />
        </button>
        <span
          class="form-error password-error"
          v-if="v$.confirmPassword.$error"
        >
          Password don't match
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
        <input type="submit" class="btn btn-submit" value="Signup" />
      </div>
      <div class="divider"></div>
      <div class="redirect-signin">
        Do you already have an account ?
        <nuxt-link to="/auth/signin">Signin</nuxt-link>
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

const showPass = ref(false);
const showConfirmPass = ref(false);
const togglePass = () => (showPass.value = !showPass.value);
const toggleConfirmPass = () =>
  (showConfirmPass.value = !showConfirmPass.value);

const formData = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const rules = computed(() => {
  return {
    username: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAs: sameAs(formData.password) },
  };
});
const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
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
  margin-top: 1.5rem;
  padding: 4rem 3rem 2rem;
  border-radius: 10px;
  background-color: $white;
}
.title-h1 {
  margin-bottom: 3rem;
  text-align: center;
  text-transform: capitalize;
}
.form-signup {
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
  &:hover {
    background-color: $primary-hover;
  }
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
