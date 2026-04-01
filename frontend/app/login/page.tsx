"use client";

import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";

function getLoginErrorMessage(data: any): string {
  return (data && data.detail) ? data.detail : "Login failed. Please try again.";
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setTokens = useAuthStore((s) => s.setTokens);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post<{
        access: string;
        refresh: string;
      }>(`${process.env.NEXT_PUBLIC_API_URL}/token/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTokens(response.data.access, response.data.refresh);
    } catch (err) {
      if (isAxiosError(err) && err.response?.data !== undefined) {
        setError(getLoginErrorMessage(err.response.data));
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <form
        className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md w-80 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Login</h2>
        {error ? (
          <p
            role="alert"
            className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded px-3 py-2"
          >
            {error}
          </p>
        ) : null}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError();
            }}
            className="border border-zinc-300 dark:border-zinc-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-700"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError();
            }}
            className="border border-zinc-300 dark:border-zinc-600 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-700"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:pointer-events-none text-white font-semibold py-2 rounded transition"
        >
          {isSubmitting ? "Signing in…" : "Log In"}
        </button>
      </form>
    </div>
  );
}
