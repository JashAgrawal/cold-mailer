"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, User, ArrowLeft, Mail, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { blogPosts } from "../data";
import { SignUpButton } from "@clerk/nextjs";

export default function BlogDetailPage() {
  const searchParams = useSearchParams();
  const [blogPost, setBlogPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const post = blogPosts.find((post) => post.id === id);
      setBlogPost(post || null);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <main className="flex-1 max-w-3xl mx-auto py-12">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded mb-8"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-8"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-8"></div>
        </div>
      </main>
    );
  }

  if (!blogPost) {
    return (
      <main className="flex-1 max-w-3xl mx-auto py-12">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 py-12 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>

          <div className="space-y-2 mb-8">
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary inline-block">
              {blogPost.category}
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {blogPost.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <div className="mt-12 border-t pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Share this article</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              <div>
                <SignUpButton>
                  <Button className="gap-1">
                    Try MailMaster Free
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-muted rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {blogPosts
                .filter((post) => post.id !== blogPost.id)
                .slice(0, 2)
                .map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/detail?id=${post.id}`}
                    className="group rounded-md bg-background p-4 transition-all hover:shadow-md"
                  >
                    <h4 className="font-medium group-hover:text-primary">
                      {post.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {post.excerpt.substring(0, 100)}...
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
