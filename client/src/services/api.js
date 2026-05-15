import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' ? 
    (window.location.port === '5173' || window.location.port === '3000' 
      ? `${window.location.protocol}//${window.location.hostname}:5000` 
      : window.location.origin) 
    : '')

const api = axios.create({
  baseURL: API_BASE + '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('jwt')
  if(token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
