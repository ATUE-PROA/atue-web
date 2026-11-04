const FIRST_DIGIT_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const SECOND_DIGIT_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

export function normalizeCnpj(value: string): string {
  return value.replace(/\D/g, '').slice(0, 14)
}

export function formatCnpj(value: string): string {
  const digits = normalizeCnpj(value)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 5) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`
  }

  if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  }

  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

function calculateDigit(base: string, weights: number[]): number {
  const sum = weights.reduce((total, weight, index) => total + Number(base[index]) * weight, 0)
  const remainder = sum % 11

  return remainder < 2 ? 0 : 11 - remainder
}

export function isValidCnpj(value: string): boolean {
  const cnpj = normalizeCnpj(value)

  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return false
  }

  const firstDigit = calculateDigit(cnpj.slice(0, 12), FIRST_DIGIT_WEIGHTS)

  if (firstDigit !== Number(cnpj[12])) {
    return false
  }

  const secondDigit = calculateDigit(cnpj.slice(0, 13), SECOND_DIGIT_WEIGHTS)

  return secondDigit === Number(cnpj[13])
}
