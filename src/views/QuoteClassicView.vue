<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const quoteId = ref(1)
const data = ref()
const error = ref()
const isLoading = ref(false)

const fetchQuote = (id: number) => {
  isLoading.value = true
  error.value = null
  fetch(`https://dummyjson.com/quotes/${id}?delay=1000`)
    .then((r) => r.json())
    .then((d) => {
      isLoading.value = false
      data.value = d
    })
    .catch((e) => {
      isLoading.value = false
      error.value = e
    })
}

watchEffect(() => fetchQuote(quoteId.value))
</script>

<template>
  <div>
    <h2>Quote (Classic)</h2>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="error">Error: {{ error }}</span>
    <template v-else-if="data">
      <p>{{ data?.quote }}</p>
      <p>&mdash; {{ data?.author }}</p>
    </template>

    <div style="margin-top: 2rem">
      <button v-for="id in 5" :key="id" @click="quoteId = id">{{ id }}</button>
    </div>
  </div>
</template>
