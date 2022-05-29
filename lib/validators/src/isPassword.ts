type Result = 'format' | 'length' | null;

/**
 * Is valid password (minimum 4 characters, no spaces)
 * @param value String to validate
 * @returns Error string or null if valid
 */
export function isPassword (value: string): Result {
  if (value.length < 4) {
    return 'length';
  } else {
    return /^([A-Za-z0-9!@#$%^&*-+_=])+$/.test (value) ? null : 'format';
  }
}
