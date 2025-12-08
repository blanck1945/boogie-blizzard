FROM python:3.10-slim

WORKDIR /app

# Copiar dependencias
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

# Exponer puerto (Railway asigna dinámicamente)
EXPOSE 8501

# Streamlit debe leer $PORT que Railway define
ENV PORT 8501

CMD ["streamlit", "run", "App.py", "--server.port=$PORT", "--server.address=0.0.0.0"]
