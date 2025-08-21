// Centraliza variables de entorno del frontend (Vite)
// Usa prefijo VITE_ y provee fallback útil en dev

export const API_URL = import.meta.env.VITE_URL_BASE || 'http://localhost:5000'
