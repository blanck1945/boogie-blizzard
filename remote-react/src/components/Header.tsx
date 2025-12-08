// src/components/Header.tsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HOST_URL = import.meta.env.VITE_HOST_URL; // opcional

export const Header = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (HOST_URL) {
      window.location.href = HOST_URL;
    } else {
      navigate("/"); // fallback: home de esta app
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Back to host */}
        <button
          onClick={handleBackClick}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to host</span>
        </button>

        {/* Logo Blizzard */}
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
            IG Analytics
          </span>
          <span className="text-xl font-semibold leading-tight">
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Blizzard
            </span>
          </span>
        </div>
      </div>
    </header>
  );
};
