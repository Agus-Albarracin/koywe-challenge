// utils/authValidations.ts
import { toast } from 'react-toastify';

export const validateAuthForm = (
  login: string,
  password: string,
  email: string | undefined,
  isRegistering: boolean
): boolean => {
  // Trim para evitar espacios al inicio/final
  login = login.trim();
  password = password.trim();
  email = email?.trim();

  // Validación: Login
  if (!login || login.length < 3 || /\s/.test(login)) {
    toast.error('El usuario debe tener al menos 3 caracteres y no contener espacios');
    return false;
  }

  // Validación: Email (solo si se está registrando)
  if (isRegistering) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error('Debes ingresar un correo electrónico válido');
      return false;
    }
  }

  // Validación: Contraseña (letras y números, mínimo 6, sin espacios)
  const passwordRegex = /^[A-Za-z0-9]{6,}$/;
  if (!password || !passwordRegex.test(password)) {
    toast.error('La contraseña debe tener al menos 6 caracteres, solo letras y números, y sin espacios');
    return false;
  }

  return true;
};
