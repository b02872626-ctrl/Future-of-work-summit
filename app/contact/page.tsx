import type { Metadata } from "next";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Contact · Future of Work Summit",
};

/**
 * Placeholder Contact page — solid black canvas with the menu Nav.
 * Real content lands here later.
 */
export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-ink">
      <Nav />
    </main>
  );
}
