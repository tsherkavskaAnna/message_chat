import { urlBackend } from '../utils/baseUrl';

export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token');
  }
  const res = await fetch(`${urlBackend}/api/auth/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function logout() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${urlBackend}/api/auth/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
  });
  if (!res.ok) return null;
  localStorage.removeItem('token');
  return res.json();
}

export async function updateCurrentUser(formData: FormData) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${urlBackend}/api/auth/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Update user failed' };
  }
  return response.json().then((response) => response.data);
}
