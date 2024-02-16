export type Post = {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}

export type PostsResponse = {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export type User = {
  id: number
  username: string
}

export type PostComment = {
  body: string
  id: number
  postId: number
  user: User
}

export type PostCommentsResponse = {
  comments: PostComment[]
  total: number
  skip: number
  limit: number
}
