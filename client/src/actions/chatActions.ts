import { urlBackend } from '../utils/baseUrl';

export async function getAllMessages() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${urlBackend}/chat/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch messages');
  }
  return res.json();
}

export async function getMessagesByContact(contactId: string) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${urlBackend}/api/chat/messages/${contactId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch messages');
  }
  return res.json();
}

export async function sendMessage(contactId: string, formData: FormData) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${urlBackend}/api/chat/send/${contactId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to send message');
  }
  return res.json().then((response) => response.data);
}

//PATCH
export async function updateMessage(messageId: string, formData: FormData) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${urlBackend}/api/chat/messages/${messageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to update message');
  }
  return res.json();
}
//DELETE
export async function deleteMessage(messageId: string) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${urlBackend}/api/chat/messages/${messageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Delete message failed' };
  }
  return true;
}
