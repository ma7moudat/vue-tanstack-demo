<script setup lang="ts">
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import type { PostsResponse } from '@/models'

// Query
const { fetchNextPage, hasNextPage, isLoading, isError, isFetching, data, error } =
  useInfiniteQuery({
    getNextPageParam: (lastPage, allPages) => {
      const { limit = 30, skip = 10, total = Infinity } = lastPage
      return limit + skip < total ? limit + skip : undefined
    },
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`https://dummyjson.com/posts?delay=1000&limit=30&skip=${pageParam}`).then(
        (res): Promise<PostsResponse> => res.json()
      )
  })
</script>

<template>
  <div>
    <h2>Posts</h2>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error }}</span>
    <!-- We can assume by this point that `isSuccess === true` -->
    <ul v-else>
      <li v-for="(page, index) in data?.pages" :key="index">
        <div>Page #{{ index + 1 }}</div>
        <ul>
          <li v-for="post in page.posts" :key="post.id">
            <RouterLink :to="'/posts/' + post.id">
              {{ post.title }}
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>
    <button v-if="hasNextPage" @click="fetchNextPage()">Load more...</button>
    <p v-if="!isLoading && isFetching" style="color: var(--color-heading)">
      <br /><br />
      Re-fetching in the background...
    </p>
  </div>
</template>
