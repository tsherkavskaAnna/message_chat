import { urlBackend } from '../utils/baseUrl';

export async function registerAction(_prevState: unknown, formData: FormData) {
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
  return {
    success: true,
    message:
      'User registered successfully. Check your email box or spam to verify.',
  };
}

export async function loginAction(_prevState: unknown, formData: FormData) {
  try {
    const response = await fetch(`${urlBackend}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Login failed',
      };
    }
    localStorage.setItem('token', data.token);
    return {
      success: true,
      message: data.message || 'Login successful',
      user: data.user,
    };
  } catch {
    return {
      success: false,
      error: 'Network error with login',
    };
  }
}

export async function forgotPasswordAction(
  _prevState: unknown,
  formData: FormData
) {
  const email = formData.get('email');
  const response = await fetch(`${urlBackend}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Failed sending of email' };
  }
  return { success: true, message: 'Email sent' };
}

export async function resetPasswordAction(
  _prevState: unknown,
  formData: FormData,
  token: string
) {
  const password = formData.get('password');
  const response = await fetch(
    `${urlBackend}/api/auth/reset-password/${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Failed password reset' };
  }
  return { success: true, message: 'Password reset with success' };
}
export async function verifyEmailAction(
  _prevState: unknown,
  _formData: FormData,
  veryficationCode: string
) {
  const response = await fetch(
    `${urlBackend}/api/auth/verify/${veryficationCode}`
  );

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Email verification failed' };
  }

  const data = await response.json();
  return { success: true, message: data.message };
}
