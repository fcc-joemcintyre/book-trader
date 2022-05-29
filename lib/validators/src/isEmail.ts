type Result = 'format' | null;

/**
 * Is valid email address
 * @param value String to validate
 * @returns Error (format) or null if valid
 */
export function isEmail (value: string): Result {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test (value) ? null : 'format';
}
