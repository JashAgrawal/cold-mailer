"use client";

import React from "react";
import Navbar from "@/components/common/navbar";
import BlogPostStructuredData from "./blog-post-structured-data";
import BlogDetailPage from "./comp";
import { useSearchParams } from "next/navigation";
import MetaData from "./metadata";

export default function BlogPostPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <>
      <MetaData id={id || ""} />
      <BlogPostStructuredData id={id || ""} />
      <div className="flex min-h-screen flex-col">
        <BlogDetailPage />
      </div>
    </>
  );
}
