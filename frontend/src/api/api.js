import axios from 'axios'
import { API_URL } from '../config/env'

// Instancia central de axios
const api = axios.create({ // Crea una instancia aislada de axios para la app
  baseURL: API_URL, // URL base tomada de variables de entorno centralizadas
  headers: { // Encabezados por defecto para todas las peticiones
    'Content-Type': 'application/json' // Indicamos que enviamos JSON al servidor
  } // Cierre del objeto headers
}) // Cierre de la creación de la instancia

// Interceptor para inyectar token si existe
api.interceptors.request.use((config) => { // Intercepta cada request antes de enviarse
  try { // Bloque para capturar errores de acceso a localStorage
    const token = localStorage.getItem('token') // Recupera el token persistido si existe
    if (token) { // Verifica que se obtuvo un token no nulo
      config.headers.Authorization = `Bearer ${token}` // Adjunta cabecera Authorization con esquema Bearer
    } // Fin condición token
  } catch (e) { // Si ocurre error (p.ej. modo SSR o bloqueo de storage)
    // Acceso a localStorage falló (posible restricción); ignoramos en producción
    if (process.env.NODE_ENV !== 'production') console.error('Token retrieval error', e) // Log sólo en desarrollo
  } // Fin try/catch
  return config // Devuelve la config (modificada o intacta) para continuar la cadena
}) // Fin del interceptor de request

export default api // Exporta instancia para reutilizar en toda la aplicación
