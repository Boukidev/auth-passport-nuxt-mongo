import { useVuelidate } from '@vuelidate/core';
<template>
  <main class="main">
    <h1 class="title-h1">Sign-in</h1>
    <form class="form-login" @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="email" class="form-label">E-mail address</label>
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
        <!-- <span class="form-error">{{ rules.email.required.$message }}</span> -->
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input
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
          required
        />
        <!-- <span class="form-error">{{ rules.password.required.$message }}</span> -->
      </div>
      <div class="redirect-reset-password">
        <nuxt-link to="/auth/reset-password">Forgot password?</nuxt-link>
      </div>
      <div class="form-group">
        <input type="submit" class="btn btn-submit" value="Submit" />
      </div>
      <div class="divider"></div>
      <div class="redirect-signup">
        Are you not registered yet ?
        <nuxt-link to="/auth/signup">Signup</nuxt-link>
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

const formData = reactive({
  email: "",
  password: "",
  confirmPassword: null,
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: minLength(8),
    },
    confirmPassword: {
      required: helpers.withMessage(
        "The password confirmation field is required",
        required
      ),
      sameAs: helpers.withMessage(
        "Passwords don't match",
        sameAs(formData.password)
      ),
    },
  };
});

const v$ = useVuelidate(rules, formData);
const submitForm = () => {
  v$.value.$validate();

  if (v$.value.$error) alert("erreur formulaire");
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
.form-login {
  margin: 1rem 0;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-label {
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: $dark;
}
.form-input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: $light-gray;
  border: 2px solid transparent;
  border-bottom: 2.5px solid $gray;
  outline: none;
  transition: border-bottom ease-in-out 0.3s;
  &:focus {
    border-bottom: 2.5px solid $primary;
  }
}
.border-bottom-red {
  border-bottom: 2.5px solid red;
}
.border-bottom-primary {
  border-bottom: 2.5px solid $primary;
}
.form-error {
  position: relative;
  top: -1rem;
  color: red;
}
.redirect-reset-password {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a:hover {
    text-decoration: underline;
    color: $primary;
  }
}
.btn-submit {
  margin-top: 1.5rem;
  padding: 0.75rem;
  color: $white;
  background-color: $primary;
  border-radius: 5px;
  transition: background-color ease-in-out 0.3s;
  &:hover {
    background-color: $primary-hover;
  }
}
.divider {
  height: 2px;
  width: 100%;
  margin: 1rem auto;
  background: linear-gradient(90deg, $white, $primary, $white);
  border-radius: 5px;
}
.redirect-signup {
  text-align: center;
  a {
    color: $primary;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
