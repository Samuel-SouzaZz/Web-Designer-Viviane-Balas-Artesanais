const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function getApiBase(): string {
  return API_BASE.replace(/\/$/, '')
}

export function getImageUrl(path: string | null): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`
}

export function getAuthToken(): string | null {
  return localStorage.getItem('admin_token')
}

export function setAuthToken(token: string): void {
  localStorage.setItem('admin_token', token)
}

export function clearAuthToken(): void {
  localStorage.removeItem('admin_token')
}
