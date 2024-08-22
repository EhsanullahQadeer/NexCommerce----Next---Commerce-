import { FC } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import BlogGrid from "@/features/categories/BlogGrid";

const Blog: FC = () => {
  const links = [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/blog",
      name: "Blog",
    },
  ];
  return (
    <div>
      <Hero title="Blogs" subTitle="Blog" />
      <Container>
        <Breadcrumb links={links} />
      </Container>
      <BlogGrid />
    </div>
  );
};

export default Blog;
