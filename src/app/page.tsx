"use client";
import { HeroSection } from "@/components/home/hero";
import { Github } from "lucide-react";

function HeroSectionDemo() {
  return (
    <HeroSection
      badge={{
        text: "Introducing our new components",
        action: {
          text: "Learn more",
          href: "/templates",
        },
      }}
      title="Build faster with beautiful components"
      description="Premium UI components built with React and Tailwind CSS. Save time and ship your next project faster with our ready-to-use components."
      actions={[
        {
          text: "Get Started",
          href: "/templates",
          variant: "default",
        },
        {
          text: "GitHub",
          href: "https://github.com/your-repo",
          variant: "glow",
          icon: <Github className="h-5 w-5" />,
        },
      ]}
      image={"/test.png"}
    />
  )
}

export default HeroSectionDemo

