"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { login as apiLogin, logout as apiLogout } from "@/lib/api"

interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Verificar si hay tokens guardados al cargar la página
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const userData = localStorage.getItem('user')
    
    if (accessToken && refreshToken && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password)
      
      // Guardar tokens y datos del usuario
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      localStorage.setItem('user', JSON.stringify({
        userId: response.userId,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
      }))
      
      setUser({
        userId: response.userId,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
      })
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Error durante el login:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        await apiLogout(refreshToken)
      }
    } catch (error) {
      console.error('Error durante el logout:', error)
    } finally {
      // Limpiar datos independientemente del resultado de la llamada a la API
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 