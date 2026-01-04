import { urlBackend } from '../utils/baseUrl';

export async function getContacts() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${urlBackend}/api/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return res.json();
}

export async function createNewContact(formData: FormData) {
  const token = localStorage.getItem('token');
  const body = {
    fullName: formData.get('fullName'),
    username: formData.get('username'),
    email: formData.get('email'),
  };
  const response = await fetch(`${urlBackend}/api/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Failed to create contact' };
  }
  return response.json();
}

export async function updateContact(contactId: string, formData: FormData) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${urlBackend}/api/contacts/${contactId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Update contact failed' };
  }
  return response.json();
}

export async function deleteContact(contactId: string) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${urlBackend}/api/contacts/${contactId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Delete contact failed' };
  }
  return true;
}
