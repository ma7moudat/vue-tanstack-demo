<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { Post, PostCommentsResponse } from '@/models'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const loadComments = ref(false)

const {
  data: post,
  error: postError,
  isError: postIsError,
  isFetching: postIsFetching,
  isLoading: postIsLoading
} = useQuery<Post>({
  queryKey: ['posts', route.params.id],
  queryFn: (): Promise<Post> =>
    route.params.id
      ? fetch(`https://dummyjson.com/posts/${route.params.id}?delay=1000`).then((res) => res.json())
      : Promise.reject('Post ID not provided')
})

const {
  data: comments,
  error: commentsError,
  isError: commentsIsError,
  isFetching: commentsIsFetching,
  isLoading: commentsIsLoading
} = useQuery({
  enabled: () => loadComments.value && !postIsError.value,
  queryKey: ['posts', route.params.id, 'comments'],
  queryFn: (): Promise<PostCommentsResponse> =>
    fetch(`https://dummyjson.com/posts/${route.params.id}/comments?delay=1000`).then((res) =>
      res.json()
    ),
  select: (data) => data.comments
})
</script>

<template>
  <div>
    <article>
      <span v-if="postIsLoading">Loading...</span>
      <span v-else-if="postIsError">Error: {{ postError }}</span>
      <template v-else-if="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <RouterLink to="/posts">Back to list</RouterLink>
        <p v-if="postIsFetching" style="color: var(--color-heading)">
          <br />
          Re-fetching in the background...
        </p>
      </template>
    </article>
    <section v-if="post">
      <br />
      <h3>Comments</h3>
      <button v-if="!loadComments" @click="loadComments = true" style="margin-top: 1rem">
        Load comments
      </button>
      <span v-if="commentsIsLoading">Loading comments...</span>
      <span v-else-if="commentsIsError">Error: {{ commentsError }}</span>
      <div v-else-if="comments" class="comments">
        <p v-for="(comment, index) in comments" :key="index" style="margin-top: 1rem">
          {{ comment.body }} &mdash; {{ comment.user.username }}
        </p>
        <p v-if="commentsIsFetching" style="color: var(--color-heading)">
          <br />
          Re-fetching comments in the background...
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
