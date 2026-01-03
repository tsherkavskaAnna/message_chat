import { urlBackend } from '../utils/baseUrl';

export async function getContacts() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${urlBackend}/api/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return res.json();
}

export async function createNewContact(formData: FormData) {
  const body = {
    fullName: formData.get('fullName'),
    username: formData.get('username'),
    email: formData.get('email'),
  };
  const response = await fetch(`${urlBackend}/api/contacts`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Failed to create contact' };
  }
  return response.json();
}

export async function updateContact(contactId: string, formData: FormData) {
  const response = await fetch(`${urlBackend}/api/contacts/${contactId}`, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Update contact failed' };
  }
  return response.json();
}

export async function deleteContact(contactId: string) {
  const response = await fetch(`${urlBackend}/api/contacts/${contactId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Delete contact failed' };
  }
  return true;
}
