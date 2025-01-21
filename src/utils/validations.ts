export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export function validateName(name: string): string | null {
  if (name.trim().split(' ').length < 2) {
    return 'O nome deve ter pelo menos 2 palavras.';
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  const regex = /^\d{10,11}$/;
  if (!regex.test(phone)) {
    return 'O telefone deve ter de 10 a 11 dígitos.';
  }
  return null;
}

export function validateBirthDate(birthDate: string): string | null {
  const today = new Date();
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!dateRegex.test(birthDate)) {
    return 'Data de nascimento inválida.';
  }

  const [dia, mes, ano] = birthDate.split('/').map(Number);
  const date = new Date(ano, mes - 1, dia);

  if (isNaN(date.getTime())) {
    return 'Data de nascimento inválida.';
  }
  if (date > today) {
    return 'A data de nascimento não pode ser no futuro.';
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return 'E-mail inválido.';
  }
  return null;
}

export function validateRole(role: UserRole): string | null {
  if (![UserRole.ADMIN, UserRole.USER].includes(role)) {
    return 'Permissão inválida.';
  }
  return null;
}
