<script setup lang="ts">
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

const quoteId = ref(1)
const { isLoading, isError, isFetching, data, error } = useQuery({
  placeholderData: keepPreviousData,
  queryKey: ['quote', quoteId],
  queryFn: () =>
    fetch(`https://dummyjson.com/quotes/${quoteId.value}?delay=1000`).then((r) => r.json())
})
</script>

<template>
  <div>
    <h2>Quote</h2>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error }}</span>
    <template v-else-if="data">
      <p>{{ data?.quote }}</p>
      <p>&mdash; {{ data?.author }}</p>
      <p v-if="!isLoading && isFetching" style="color: var(--color-heading)">
        <br /><br />
        Re-fetching in the background...
      </p>
    </template>

    <div style="margin-top: 2rem">
      <button v-for="id in 5" :key="id" @click="quoteId = id">{{ id }}</button>
    </div>
  </div>
</template>
