<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/quote-classic">Quote (Classic)</RouterLink>
        <RouterLink to="/quote">Quote</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <section class="busters">
    <button @click="queryClient.invalidateQueries({ queryKey: ['quote'] })">
      Bust quote cache
    </button>
    <button @click="queryClient.invalidateQueries({ queryKey: ['posts'] })">
      Bust posts cache
    </button>
  </section>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin-bottom: 3rem;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.busters {
  background: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 3rem;
  padding: 1rem;
}
</style>
