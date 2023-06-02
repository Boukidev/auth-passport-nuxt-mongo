<template>
  <main class="main">
    <h1 class="title-h1">reset password</h1>
    <form class="form-reset-password">
      <div class="form-group">
        <label for="password" class="form-label">New password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="form-input"
          v-model="passwordModel"
          placeholder="Type your password"
          required
        />
      </div>
      <div class="check-password">
        <ul class="check-list">
          <li class="check-item">1 Majuscule</li>
          <li class="check-item">1 Minuscule</li>
          <li class="check-item">1 chiffre</li>
          <li class="check-item">1 caractere special</li>
          <li class="check-item">8 caractere minimum</li>
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
const passwordModel = ref("");
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
  border-bottom: 2px solid $gray;
  outline: none;
  transition: border-bottom ease-in-out 0.3s;
  &:focus {
    border-bottom: 2px solid $primary;
  }
}
.check-list {
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
}
.check-item {
  width: 50%;
}
.btn-submit {
  margin-top: 1.5rem;
  padding: 0.75rem;
  color: $white;
  background-color: $primary;
  border-radius: 5px;
}
.divider {
  height: 2px;
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
