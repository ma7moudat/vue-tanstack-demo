<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { Post } from '@/models'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const { isLoading, isError, isFetching, data, error } = useQuery({
  queryKey: ['posts', route.params.id],
  queryFn: (): Promise<Post> =>
    route.params.id
      ? fetch(`https://dummyjson.com/posts/${route.params.id}?delay=1000`).then((res) => res.json())
      : Promise.reject('Post ID not provided')
})

const post = computed(() => data.value)
</script>

<template>
  <div>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error }}</span>
    <template v-else-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <RouterLink to="/posts">Back to list</RouterLink>
      <p v-if="isFetching" style="color: var(--color-heading)">
        <br /><br />
        Re-fetching in the background...
      </p>
    </template>
  </div>
</template>

<style scoped></style>
