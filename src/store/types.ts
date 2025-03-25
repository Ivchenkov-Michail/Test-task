export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostState {
  posts: Post[];
  likes: number[];
  loading: boolean;
  error: string | null;
}
