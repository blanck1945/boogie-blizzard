# Remote Apps Monorepo

Este repositorio contiene dos aplicaciones independientes pero alojadas en el mismo monorepo:

- **remote-react** → Frontend en React.
- **remote-streamlit** → Aplicación en Streamlit para visualización, análisis y herramientas internas.

Ambas aplicaciones se desarrollan, ejecutan y deployan por separado.

---

## 📁 Estructura del proyecto

```txt
.
├─ remote-react/          # Aplicación React
│   ├─ src/
│   ├─ public/
│   ├─ package.json
│   └─ ...
│
└─ remote-streamlit/      # Aplicación Streamlit
    ├─ App.py             # Punto de entrada
    ├─ pages/             # Páginas adicionales
    ├─ requirements.txt   # Dependencias Python
    └─ ...
```
