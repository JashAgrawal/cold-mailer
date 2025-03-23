"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { googleProvider,auth } from "@/config/firebase";

const SignInButton = () => {

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful");
    } catch (err) {
      toast.error("Login failed");
      console.error("Google sign-in failed:", err);
    }
  };

  if (auth.currentUser) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost">
            <Avatar>
              <AvatarImage src={auth.currentUser.photoURL ?? ""} />
              <AvatarFallback>
                {auth.currentUser.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{auth.currentUser.displayName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => auth.signOut()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <Button onClick={handleGoogleLogin}>Get Started</Button>;
};

export default SignInButton;
