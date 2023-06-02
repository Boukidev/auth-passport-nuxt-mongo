<template>
  <main class="main">
    <h1>Authentication - Nuxt3 & MongoDB</h1>
    <p>
      Welcome to this presentation on a full-stack authentication application
      built with Nuxt 3, a JavaScript framework based on Vue.js, and MongoDB, a
      flexible and scalable NoSQL database.
    </p>
    <nuxt-link to="/auth/signin">Sign-in</nuxt-link>
  </main>
</template>

<style lang="scss" scoped>
.main {
  width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;
  color: $white;
}
p {
  font-size: 20px;
}
a {
  display: block;
  padding: 0.5rem 1.25rem;
  background-color: $primary;
  color: #f1f1f1;
  border-radius: 3px;
  text-transform: uppercase;
  &:hover {
    background-color: $primary-hover;
  }
}
</style>
