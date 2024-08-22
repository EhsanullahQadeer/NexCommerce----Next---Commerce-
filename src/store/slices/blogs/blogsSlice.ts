import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { categoryFiltersResults, Blogs } from "./fakeBlogs";
import { Blog, BlogCategory } from "@/types/blog";

// Define a type for the slice state
export interface BlogsState {
  filterKey: string;
  allBlogs: Blog[];
  blogs: Blog[];
  blogCategories: BlogCategory[];
}

// Define the initial state using that type
const initialState: BlogsState = {
  allBlogs: Blogs,
  blogs: Blogs,
  blogCategories: categoryFiltersResults,
  filterKey: "*",
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    handleFilterKeyChange: (state, action: PayloadAction<string>) => {
      state.filterKey = action.payload;

      if (state.filterKey !== "*") {
        state.blogs = Blogs.filter((v) =>
          v.categories?.includes(state.filterKey)
        );
      } else {
        state.blogs = Blogs;
      }
    },
  },
});

export const { handleFilterKeyChange } = blogsSlice.actions;

// selectors can use the imported `RootState`
export const selectBlogs = (state: RootState) => state.blogs;

export default blogsSlice.reducer;
