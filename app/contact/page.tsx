import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact · Future of Work Summit",
};

/**
 * Placeholder Contact page — solid black canvas with Nav + Footer.
 * Real content lands here later.
 */
export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-ink flex flex-col">
      <Nav />
      <div className="flex-1" />
      <Footer />
    </main>
  );
}
