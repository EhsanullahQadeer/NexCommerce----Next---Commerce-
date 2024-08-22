"use client";

import { useDispatch, useSelector } from "react-redux";
import Container from "@/components/Container";
import CategoryFilterDrawer from "./CategoryFilterDrawer";
import BlogTabs from "@/components/Tabs/BlogTabs";
import BlogCard from "@/components/Cards/BlogCard";
import { Blog } from "@/types/blog";
import { handleFilterKeyChange } from "@/store/slices/blogs/blogsSlice";
import { RootState } from "@/store";
import Pagination from "@/components/Pagination";

const BlogGrid = () => {
  const dispatch = useDispatch();
  const categoryFilters = useSelector(
    (state: RootState) => state.blogs.blogCategories
  );
  const blogs = useSelector((state: RootState) => state.blogs.blogs);

  return (
    <>
      <Container className="mt-5">
        <BlogTabs
          tabs={categoryFilters}
          onTabChange={(tab: string) => dispatch(handleFilterKeyChange(tab))}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5 py-[27px] px-[30px]">
          {blogs.map((item: Blog) => (
            <BlogCard key={item.id} {...item} />
          ))}
        </div>
        <Pagination numberOfPages={2} currentPage={1} onPageChange={() => {}} />
      </Container>
      <CategoryFilterDrawer />
    </>
  );
};

export default BlogGrid;
