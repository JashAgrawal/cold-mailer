"use client";
import { blogPosts } from "@/app/blog/data";
import Head from "next/head";

const MetaData = ({ id }: { id: string }) => {
  const blog = blogPosts.find((post) => post.id === id);
  return (
    <Head>
      <title>{blog?.title}</title>
      <meta name="description" content={blog?.excerpt} />
      <meta name="keywords" content={blog?.category} />
      <meta name="author" content="Jash Agrawal" />
    </Head>
  );
};

export default MetaData;
