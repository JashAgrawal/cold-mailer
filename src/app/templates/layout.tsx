"use client";
import Navbar from "@/components/common/navbar";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <>
      <Navbar />
      <SignedIn>
        <QueryClientProvider client={queryClient}>
          <div className="p-16">{children}</div>
        </QueryClientProvider>
      </SignedIn>
      <SignedOut>
        <div className="h-screen flex flex-col items-center justify-center gap-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Please sign in to view templates
          </h1>
          <SignInButton />
        </div>
      </SignedOut>
    </>
  );
};

export default MainLayout;
