"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 px-6 py-16">
      <h1 className="text-base font-semibold">Sign in</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs flex-col gap-3"
      >
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-ink"
        />
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-ink"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
