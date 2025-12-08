# components/charts.py
import streamlit as st
import pandas as pd
import altair as alt


def interactions_bar_chart(likes: int, comments: int, saves: int, shares: int):
    """Gráfico de barras con los distintos tipos de interacción."""
    data = pd.DataFrame(
        {
            "Tipo": ["Likes", "Comentarios", "Guardados", "Compartidos"],
            "Cantidad": [likes, comments, saves, shares],
        }
    )

    chart = (
        alt.Chart(data)
        .mark_bar()
        .encode(
            x=alt.X("Tipo:N", title="Tipo de interacción"),
            y=alt.Y("Cantidad:Q", title="Cantidad"),
            tooltip=["Tipo", "Cantidad"],
        )
    )

    st.subheader("Interacciones por tipo")
    st.altair_chart(chart, use_container_width=True)


def engagement_comparison_chart(eng_reach: float, eng_followers: float):
    """Gráfico comparando las dos métricas de engagement."""
    data = pd.DataFrame(
        {
            "Métrica": [
                "Engagement / Reach",
                "Engagement / Seguidores",
            ],
            "Valor (%)": [eng_reach, eng_followers],
        }
    )

    chart = (
        alt.Chart(data)
        .mark_bar()
        .encode(
            x=alt.X("Métrica:N", title="Métrica"),
            y=alt.Y("Valor (%):Q", title="Porcentaje"),
            tooltip=["Métrica", "Valor (%)"],
        )
    )

    st.subheader("Comparación de métricas de engagement")
    st.altair_chart(chart, use_container_width=True)
