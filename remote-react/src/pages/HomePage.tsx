// src/pages/HomePage.tsx
import type { FormEvent } from "react";
import { useState } from "react";
import axios from "axios";
// import { useYourIdAuth } from "../sdk/useYourIDAuth";
import Sidebar from "../components/Sidebar";

export const HomePage = () => {
  // useYourIdAuth({
  //   applicationBaseUrl: import.meta.env.VITE_APPLICATION_MICROSERVICE_URL,
  //   yourIdLoginUrl: import.meta.env.VITE_YOUR_ID_LOGIN_URL,
  //   env: import.meta.env.VITE_ENV,
  // });

  const [postUrl, setPostUrl] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"preview" | "streamlit">("preview");

  const streamlitUrl =
    import.meta.env.VITE_STREAMLIT_URL ?? "http://localhost:8501";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setPreview(null);
    setView("preview");

    if (!postUrl.trim()) {
      setError("Pegá la URL del post de Instagram.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_APPLICATION_MICROSERVICE_URL
        }/instagram/preview`,
        { postUrl },
        { withCredentials: true }
      );
      setPreview(res.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "No se pudo obtener la información del post."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-stretch">
      <Sidebar
        postUrl={postUrl}
        setPostUrl={setPostUrl}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
        preview={preview}
        view={view}
        setView={setView}
      />

      {/* PANEL DERECHO */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        {view === "preview" && (
          <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
            {!preview && (
              <div className="flex h-64 items-center justify-center text-slate-500">
                No hay previsualización aún.
              </div>
            )}

            {preview && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    ID: {preview.id}
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 border border-slate-300">
                    {preview.mediaType}
                  </div>
                </div>

                {/* Imagen cuadrada más chica */}
                <div className="relative w-full max-w-[400px] mx-auto aspect-square overflow-hidden rounded-xl border border-slate-300">
                  <img
                    src={preview.imageUrl}
                    alt="Post"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <p className="text-sm text-slate-800">
                  {preview.caption || (
                    <span className="text-slate-400">(Sin caption)</span>
                  )}
                </p>

                <div className="flex gap-4 text-xs text-slate-600">
                  <span>❤️ {preview.likeCount}</span>
                  <span>💬 {preview.commentsCount}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {view === "streamlit" && (
          <div className="h-[85vh] overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
            <iframe
              src={`${streamlitUrl}?mediaId=${preview?.id ?? ""}`}
              className="h-full w-full"
              style={{ border: "none" }}
              title="Streamlit Dashboard"
            />
          </div>
        )}
      </main>
    </div>
  );
};
