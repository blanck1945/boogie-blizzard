# pages/1_📊_Estadísticas.py
import streamlit as st
import requests
import os

st.set_page_config(page_title="Blizzard IG - Estadísticas", layout="wide")

st.title("📊 Estadísticas del post")

# 1) Recuperar mediaId
#  - Primero desde session_state (lo ideal)
#  - Si no está, lo intentamos leer de los query params
media_id = st.session_state.get("media_id")

if not media_id:
    params = st.query_params
    media_id = params.get("mediaId")
    if media_id:
        st.session_state["media_id"] = media_id

st.sidebar.markdown("### Debug")
st.sidebar.write("media_id:", media_id)

if not media_id:
    st.warning(
        "No se recibió mediaId. Abrí la app desde Blizzard (React) o agrega ?mediaId=XXX en la URL."
    )
    st.stop()

# 2) Llamar al backend para obtener stats dummy
backend_base_url = os.getenv("APPLICATION_MICROSERVICE_URL", "http://localhost:3000")

stats_from_backend = None
error_backend = None

try:
    res = requests.get(f"{backend_base_url}/instagram/stats/{media_id}")
    res.raise_for_status()
    stats_from_backend = res.json()
except Exception as e:
    error_backend = str(e)

if error_backend:
    st.error(
        f"No se pudieron cargar automáticamente los datos para mediaId={media_id}.\n\nError: {error_backend}"
    )
    st.info("Podés igualmente completar los campos a mano.")
else:
    st.success("Datos cargados automáticamente desde el backend.")

st.write(f"**mediaId actual:** `{media_id}`")

st.write(
    "Ingresá (o ajustá) los datos que ves en las estadísticas del post de Instagram:"
)


def v(key: str, fallback: int = 0) -> int:
    """
    Helper para obtener un valor inicial desde stats_from_backend
    o usar un fallback.
    """
    if stats_from_backend and key in stats_from_backend:
        try:
            return int(stats_from_backend[key] or 0)
        except Exception:
            return fallback
    return fallback


col1, col2 = st.columns(2)

with col1:
    likes = st.number_input("Likes", min_value=0, step=1, value=v("likeCount", 0))
    comments = st.number_input(
        "Comentarios", min_value=0, step=1, value=v("commentsCount", 0)
    )
    saves = st.number_input("Guardados", min_value=0, step=1, value=v("saves", 0))

with col2:
    shares = st.number_input("Compartidos", min_value=0, step=1, value=v("shares", 0))
    reach = st.number_input("Alcance (reach)", min_value=0, step=1, value=v("reach", 0))
    followers = st.number_input(
        "Seguidores del perfil", min_value=0, step=1, value=v("followers", 15000)
    )

st.divider()

# 3) Cálculos
total_interactions = likes + comments + saves + shares

engagement_by_reach = total_interactions / reach * 100 if reach > 0 else 0
engagement_by_followers = total_interactions / followers * 100 if followers > 0 else 0

st.subheader("Resultados numéricos")

m1, m2, m3 = st.columns(3)
m1.metric("Interacciones totales", total_interactions)
m2.metric("Engagement sobre reach (%)", round(engagement_by_reach, 2))
m3.metric("Engagement sobre seguidores (%)", round(engagement_by_followers, 2))

# 4) Guardar en session_state para que la página de gráficos use estos datos
st.session_state["ig_stats"] = {
    "media_id": media_id,
    "likes": int(likes),
    "comments": int(comments),
    "saves": int(saves),
    "shares": int(shares),
    "reach": int(reach),
    "followers": int(followers),
    "total_interactions": int(total_interactions),
    "engagement_by_reach": float(engagement_by_reach),
    "engagement_by_followers": float(engagement_by_followers),
}

st.success(
    "Estadísticas guardadas. Podés ir a la página 📈 Gráficos para ver las visualizaciones."
)
