import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostState } from "./types";
import { FormValues } from "../pages/CardCreatePage/types";
import { EditFormValues } from "../pages/EditCardPage/types";

const initialState: PostState = {
  posts: JSON.parse(sessionStorage.getItem("products") || "[]"),
  likes: JSON.parse(sessionStorage.getItem("likes") || "[]"),
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[], void>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      return data; // Берём только 10 постов
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<FormValues>) => {
      const res: Post = {
        ...action.payload,
        id: Number(new Date()),
        userId: 1,
      };

      state.posts.unshift(res);
      sessionStorage.setItem("products", JSON.stringify(state.posts));
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.likes = state.likes.filter((post) => post !== action.payload);
      sessionStorage.setItem("products", JSON.stringify(state.posts));
      sessionStorage.setItem("likes", JSON.stringify(state.likes));
    },
    updatePost: (state, action: PayloadAction<EditFormValues>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index].title = action.payload.title;
        state.posts[index].body = action.payload.body;
        sessionStorage.setItem("products", JSON.stringify(state.posts));
      }
    },
    toggleLikedPost: (state, action: PayloadAction<number>) => {
      if (!state.likes.find((item) => item == action.payload)) {
        state.likes.push(action.payload);
        sessionStorage.setItem("likes", JSON.stringify(state.likes));
      } else {
        state.likes = state.likes.filter((item) => item != action.payload);
        sessionStorage.setItem("likes", JSON.stringify(state.likes));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        sessionStorage.setItem("products", JSON.stringify(action.payload)); // Сохраняем sessionStorage
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPosts, addPost, deletePost, toggleLikedPost, updatePost } =
  postSlice.actions;
export default postSlice.reducer;
