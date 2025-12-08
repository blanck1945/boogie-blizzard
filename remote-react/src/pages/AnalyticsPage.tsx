// src/pages/AnalyticsPage.tsx
import { useSearchParams } from "react-router-dom";

export const AnalyticsPage = () => {
  const [params] = useSearchParams();
  const mediaId = params.get("mediaId");

  const streamlitBaseUrl = "http://localhost:8501";

  const src = mediaId
    ? `${streamlitBaseUrl}?mediaId=${mediaId}`
    : streamlitBaseUrl;

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard de métricas</h1>
            <p className="text-xs text-slate-400">
              Visualización generada en Streamlit para el post seleccionado.
            </p>
          </div>
          {mediaId && (
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-mono text-slate-300">
              mediaId: {mediaId}
            </span>
          )}
        </div>

        {!mediaId && (
          <p className="text-sm text-red-400">
            Falta el parámetro <code>mediaId</code> en la URL. Volvé a la
            pantalla principal y seleccioná un post.
          </p>
        )}
      </div>

      <div className="flex-1">
        <iframe
          src={src}
          title="Blizzard IG Analytics"
          className="h-[calc(100vh-7.5rem)] w-full border-t border-slate-800"
        />
      </div>
    </main>
  );
};
