# pages/2_📈_Gráficos.py
import streamlit as st
import pandas as pd

st.set_page_config(page_title="Blizzard IG - Gráficos", layout="wide")

st.title("📈 Gráficos del post")

# 1) Verificar que haya datos en session_state
if "ig_stats" not in st.session_state:
    st.warning(
        "Todavía no hay estadísticas cargadas. "
        "Primero completá la pestaña '📊 Estadísticas'."
    )
    st.stop()

stats = st.session_state["ig_stats"]
media_id = stats.get("media_id")

st.sidebar.markdown("### Debug")
st.sidebar.write("media_id:", media_id)
st.sidebar.write("ig_stats:", stats)

st.subheader("Resumen del post")

col1, col2, col3 = st.columns(3)
col1.metric("Interacciones totales", stats["total_interactions"])
col2.metric("Engagement / reach (%)", round(stats["engagement_by_reach"], 2))
col3.metric(
    "Engagement / seguidores (%)",
    round(stats["engagement_by_followers"], 2),
)

st.caption(f"mediaId: `{media_id}`")

st.divider()

# 2) Gráfico de barras de interacciones
st.subheader("Interacciones por tipo")

interactions_df = pd.DataFrame(
    {
        "Tipo": ["Likes", "Comentarios", "Guardados", "Compartidos"],
        "Cantidad": [
            stats["likes"],
            stats["comments"],
            stats["saves"],
            stats["shares"],
        ],
    }
).set_index("Tipo")

st.bar_chart(interactions_df)

# 3) Tabla de composición (porcentajes)
st.subheader("Distribución de interacciones")

total = stats["total_interactions"] or 1
composition_df = interactions_df.copy()
composition_df["%"] = composition_df["Cantidad"] / total * 100

st.dataframe(composition_df.reset_index().style.format({"%": "{:.2f} %"}))

# 4) Gráfico de barras para engagement
st.subheader("Comparación de métricas de engagement")

engagement_df = pd.DataFrame(
    {
        "Métrica": ["Engagement / reach", "Engagement / seguidores"],
        "Valor (%)": [
            stats["engagement_by_reach"],
            stats["engagement_by_followers"],
        ],
    }
).set_index("Métrica")

st.bar_chart(engagement_df)
