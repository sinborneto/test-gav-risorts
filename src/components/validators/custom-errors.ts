export const CUSTOM_ERRORS: any[] = [
  {
    error: 'invalidEmail',
    format: invalidEmail,
  },
  {
    error: 'invalidPhone',
    format: invalidPhone,
  },
  {
    error: 'invalidDisplayName',
    format: invalidDisplayName,
  },
  {
    error: 'invalidNumberName',
    format: invalidNumberName,
  },
];

export function invalidDisplayName(label: string): string {
  return `${label} inválido.`;
}

export function invalidEmail(): string {
  return `E-mail inválido.`;
}

export function invalidPhone(): string {
  return `Telefone inválido.`;
}

export function invalidNumberName(): string {
  return `Id inválido.`;
}