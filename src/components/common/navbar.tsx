"use client";
import React from "react";
import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex gap-2 items-center text-xl font-bold">
          <Mail className="h-6 w-6 text-primary" />
          <span>MailMaster</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between gap-8">
          {isHomePage ? (
            <nav className="flex items-center space-x-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                FAQ
              </Link>
              <Link
                href="/blog"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.includes("/blog")
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/guides"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.includes("/guides")
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                Guides
              </Link>
            </nav>
          ) : (
            <nav className="flex items-center space-x-6">
              <Link
                href="/templates"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.includes("/templates")
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                Templates
              </Link>
              <Link
                href="/blog"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.includes("/blog")
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/guides"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.includes("/guides")
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                Guides
              </Link>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t py-4">
          <div className="container flex flex-col space-y-4">
            {isHomePage ? (
              <>
                <Link
                  href="#features"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#faq"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/templates"
                  className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                    pathname.includes("/templates")
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Templates
                </Link>
                <Link
                  href="/blog"
                  className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                    pathname.includes("/blog")
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/guides"
                  className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                    pathname.includes("/guides")
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Guides
                </Link>
              </>
            )}
            <div className="pt-4 border-t">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Account</span>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
