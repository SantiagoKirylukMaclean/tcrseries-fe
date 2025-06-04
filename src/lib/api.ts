// Use environment variable for API URL in production, fallback to localhost for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface AuthenticationRequest {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export async function login(email: string, password: string): Promise<AuthenticationResponse> {
  // Credenciales hardcodeadas para desarrollo
  if (email === 'pepe' && password === 'pepe') {
    return {
      accessToken: 'fake-access-token-pepe',
      refreshToken: 'fake-refresh-token-pepe',
      userId: '123e4567-e89b-12d3-a456-426614174000',
      email: 'pepe@example.com',
      firstName: 'Pepe',
      lastName: 'Developer'
    };
  }

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password } as AuthenticationRequest),
  });

  if (!response.ok) {
    throw new Error('Error en la autenticación');
  }

  return response.json();
}

export async function logout(refreshToken: string): Promise<void> {
  // Si es el token fake, no hacer la llamada a la API
  if (refreshToken === 'fake-refresh-token-pepe') {
    return;
  }

  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  }
} 
