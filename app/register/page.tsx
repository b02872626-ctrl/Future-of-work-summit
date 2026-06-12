import type { Metadata } from "next";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Register for 2026 · Future of Work Summit",
};

/**
 * Placeholder page for the 2026 registration form.
 * The actual form fields will be added later.
 */
export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-ink">
      <Nav />
    </main>
  );
}
