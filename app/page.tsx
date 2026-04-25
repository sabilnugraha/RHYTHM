"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openLogin = () => {
    setIsLoginOpen(true);
    setError("");
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Login gagal");
      }

      const data = await res.json();
      console.log("LOGIN SUCCESS:", data);

      setIsLoginOpen(false);
    } catch (err: any) {
      setError("Username atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F1E8] text-[#151515]">
      <section className="relative min-h-screen overflow-hidden px-6 py-6 md:px-10">

        <div className="relative z-10 mx-auto max-w-7xl">

          <nav className="flex items-center justify-between border-2 border-black bg-[#FFFDF8] px-5 py-4 shadow-[6px_6px_0px_#000]">
            <div className="text-xl font-black">RHYTHM</div>

            <button
              onClick={openLogin}
              className="border-2 border-black bg-[#FFFDF8] px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_#000]"
            >
              Enter RHYTHM
            </button>
          </nav>

          <div className="mt-20">
            <h1 className="text-5xl font-black">
              Your Business Has A Rhythm.
            </h1>

            <button
              onClick={openLogin}
              className="mt-6 border-2 border-black bg-[#A7C7FF] px-5 py-3 font-black shadow-[4px_4px_0px_#000]"
            >
              Enter RHYTHM →
            </button>
          </div>
        </div>

        {isLoginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md border-2 border-black bg-[#FFFDF8] p-6 shadow-[8px_8px_0px_#000]">

              <h2 className="text-2xl font-black mb-4">
                Enter RHYTHM
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">

                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-2 border-black p-3"
                />

                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-black p-3"
                />

                {error && (
                  <div className="bg-red-200 border-2 border-black p-2 font-bold">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border-2 border-black bg-[#18A999] text-white p-3 font-black"
                >
                  {loading ? "Loading..." : "Login"}
                </button>

              </form>

              <button
                onClick={() => setIsLoginOpen(false)}
                className="mt-4 text-sm underline"
              >
                Close
              </button>

            </div>
          </div>
        )}

      </section>
    </main>
  );
}
