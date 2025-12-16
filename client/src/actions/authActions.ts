import { urlBackend } from '../utils/baseUrl';

export async function registerAction(prevState: unknown, formData: FormData) {
  const response = await fetch(`${urlBackend}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Register failed' };
  }
  return { success: true };
}

export async function loginAction(prevState: unknown, formData: FormData) {
  const response = await fetch(`${urlBackend}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Login failed' };
  }
  return { success: true };
}
