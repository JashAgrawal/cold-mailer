"use client";
import Navbar from "@/components/common/navbar";
import React, { useEffect } from "react";
import SignInButton from "@/components/common/signInButton";
import { auth } from "@/config/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry:1
        }
    }
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthReady, setIsAuthReady] = React.useState(false);

  useEffect(() => {
    const x = async () => {
      await auth.authStateReady();
      setIsAuthReady(true);
    };
    x();
  }, [auth.authStateReady]);

  if (!isAuthReady) {
    return <div>Loading...</div>;
  }

  if (!auth.currentUser) {
    return (
      <>
        <div className="flex flex-col min-h-screen justify-center items-center gap-4">
          <h1 className="text-2xl font-bold">Please sign in</h1>
          <SignInButton />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <div className="container p-16">
          {children}
        </div>
      </QueryClientProvider>
    </>
  );
};

export default MainLayout;
