import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Register for 2026 · Future of Work Summit",
};

/**
 * Placeholder page for the 2026 registration form.
 * The actual form fields will be added later.
 */
export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-ink flex flex-col">
      <Nav />
      <div className="flex-1" />
      <Footer />
    </main>
  );
}
