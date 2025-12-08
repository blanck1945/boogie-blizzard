# App.py
from dotenv import load_dotenv

load_dotenv()
import streamlit as st

st.set_page_config(page_title="IG Analytics", layout="centered")

st.title("📱 IG Analytics Dashboard")
st.write(
    """
Bienvenido al dashboard de estadísticas de Instagram.

Usá las páginas para:
- **📊 Estadísticas**: cargar datos del post y ver métricas numéricas.
- **📈 Gráficos**: visualizar interacciones y engagement.
"""
)

params = st.query_params
media_id = params.get("mediaId")

if media_id:
    # lo guardamos “global” para toda la app
    st.session_state["media_id"] = media_id

st.write("MediaId leído desde query params:", media_id)
st.write("MediaId en session_state:", st.session_state.get("media_id"))

st.divider()

st.subheader("Páginas")

# Links a otras páginas (Streamlit 1.10+)
st.page_link("pages/1_📊_Estadísticas.py", label="Ir a 📊 Estadísticas del post")
st.page_link("pages/2_📈_Gráficos.py", label="Ir a 📈 Gráficos del post")

st.info("También podés navegar desde el menú lateral izquierdo (sidebar).")
