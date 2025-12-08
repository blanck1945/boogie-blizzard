// src/components/Sidebar.tsx
import React from "react";

interface SidebarProps {
  postUrl: string;
  setPostUrl: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
  loading: boolean;
  preview: any;
  view: "preview" | "streamlit";
  setView: (v: "preview" | "streamlit") => void;
}

const Sidebar = ({
  postUrl,
  setPostUrl,
  handleSubmit,
  error,
  loading,
  preview,
  view,
  setView,
}: SidebarProps) => {
  return (
    <aside
      className="
        w-96 shrink-0 space-y-8
        px-5 py-8 h-full
        border-r border-zinc-700/40
        bg-zinc-900/70 backdrop-blur-xl
        shadow-[inset_-1px_0_0_rgba(255,255,255,0.04)]
      "
    >
      {/* Título */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-zinc-50 tracking-tight">
          Blizzard <span className="text-indigo-400">IG</span>
        </h1>
        <p className="text-sm text-zinc-400">
          Pegá la URL de un post para analizarlo.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent"></div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Post URL
          </label>
          <input
            type="url"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            placeholder="https://www.instagram.com/p/C9xyzAABBCC/"
            className="
              w-full rounded-lg
              border border-zinc-700 bg-zinc-800/80
              px-3 py-2 text-sm text-zinc-100
              placeholder:text-zinc-500
              focus-border-indigo-400 focus:ring-1 focus:ring-indigo-400
              transition
            "
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full rounded-lg
            bg-indigo-500/90 text-zinc-950
            px-4 py-2 text-sm font-medium
            shadow-md shadow-indigo-500/20
            hover:bg-indigo-400 transition
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? "Cargando..." : "Buscar post"}
        </button>

        <p className="text-[11px] text-zinc-500">
          Ej: https://www.instagram.com/p/C9xyzAABBCC/
        </p>
      </form>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent"></div>

      {/* Selector de vista */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wide text-zinc-500">
          Vista
        </label>

        <div className="flex gap-2">
          {/* Botón Preview */}
          <button
            onClick={() => setView("preview")}
            className={`
              flex-1 rounded-lg px-3 py-2 text-sm transition
              ${
                view === "preview"
                  ? "bg-indigo-500 text-zinc-950 shadow-inner shadow-indigo-400/40"
                  : "bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700/70"
              }
            `}
          >
            Previsualización
          </button>

          {/* Botón Streamlit */}
          <button
            disabled={!preview}
            onClick={() => setView("streamlit")}
            className={`
              flex-1 rounded-lg px-3 py-2 text-sm transition
              ${
                view === "streamlit"
                  ? "bg-indigo-500 text-zinc-950 shadow-inner shadow-indigo-400/40"
                  : "bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700/70"
              }
              ${!preview ? "opacity-40 cursor-not-allowed" : ""}
            `}
          >
            Streamlit
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
