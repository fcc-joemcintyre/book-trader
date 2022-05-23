import crypto from 'crypto';

export type Hash = {
  hash: string,
  salt: string,
};

/**
 * Following recommendations of NIST for PBDKF2 implementation
 * http://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
 *  - salt length of 128 bits, SHA-512 algorithm, 512 bit keylen
 */

/**
 * Create a hash and salt for a provided password
 * @param password Password to generate hash from
 * @returns Hash object
 */
export function createHash (password: string): Hash {
  const salt = crypto.randomBytes (16).toString ('hex');
  const hash = crypto.pbkdf2Sync (password, salt, 2000, 64, 'sha512').toString ('hex');
  return { salt, hash };
}

/**
 * Compare provided password with previously generated hash
 * @param password Password to compare with
 * @param hash Previously generated hash
 * @param salt Previously generated salt
 * @returns Compare result
 */
export function compareHash (password: string, hash: string, salt: string) {
  const key = crypto.pbkdf2Sync (password, salt, 2000, 64, 'sha512').toString ('hex');
  return hash === key;
}
