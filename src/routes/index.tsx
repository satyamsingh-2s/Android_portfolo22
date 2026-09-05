import { createFileRoute } from "@tanstack/react-router";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Hero } from "@/components/sections/Hero";
import { Omega } from "@/components/sections/Omega";
import { OtherProjects } from "@/components/sections/OtherProjects";
import { TechnicalSkills } from "@/components/sections/TechnicalSkills";
import { DesignUX } from "@/components/sections/DesignUX";
import { Education } from "@/components/sections/Education";
import { Leadership } from "@/components/sections/Leadership";
import { Athletics } from "@/components/sections/Athletics";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Satyam Singh — Android Developer" },
      {
        name: "description",
        content:
          "Portfolio of Satyam Singh, an Android Developer building AI-assisted productivity tools with Kotlin and Jetpack Compose.",
      },
      { property: "og:title", content: "Satyam Singh — Android Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Satyam Singh, an Android Developer building AI-assisted productivity tools with Kotlin and Jetpack Compose.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-bg-primary text-text-primary">
      <BackgroundPattern />
      <Nav />
      <ThemeToggle />
      <Hero />
      <Omega />
      <OtherProjects />
      <TechnicalSkills />
      <DesignUX />
      <Education />
      <Leadership />
      <Athletics />
      <Contact />
      <footer className="border-t border-border-subtle px-6 py-8 text-center text-sm text-text-tertiary">
        © {new Date().getFullYear()} Satyam Singh. Built with restraint.
      </footer>
    </main>
  );
}
