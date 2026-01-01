import { urlBackend } from '../utils/baseUrl';

export async function getCurrentUser(token: string) {
  const res = await fetch(`${urlBackend}/api/auth/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) return null;
  return res.json();
}

export async function logout() {
  const res = await fetch(`${urlBackend}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function updateCurrentUser(formData: FormData) {
  const response = await fetch(`${urlBackend}/api/auth/current`, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Update user failed' };
  }
  return response.json().then((response) => response.data);
}
