<template>
  <main class="main">
    <h1 class="title-h1">Sign-in</h1>
    <form class="form-signin" @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="email" class="form-label">E-mail address</label>
        <Icon class="email-icon" name="fluent:person-12-filled" />
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
          autofocus
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
      <div class="redirect-reset-password">
        <nuxt-link to="/auth/reset-password">Forgot password ?</nuxt-link>
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
import { required, email, minLength } from "@vuelidate/validators";

const showPass = ref(false);
const togglePass = () => {
  showPass.value = !showPass.value;
};

const formData = reactive({
  email: "",
  password: "",
});
const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(8) },
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
.form-signin {
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
.redirect-reset-password {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
  a:hover {
    text-decoration: underline;
  }
}
.btn-submit {
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
  height: 1px;
  width: 100%;
  margin: 1.5rem auto;
  background: linear-gradient(90deg, $white, $primary, $white);
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
