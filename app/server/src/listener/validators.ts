import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';

const ajv = new Ajv ();
const dir = dirname (fileURLToPath (import.meta.url));

export const validateLogin = compile ('../schema/login.json');
export const validateRegister = compile ('../schema/register.json');

/**
 * Compile JSON schema
 * @param schema Input schema
 * @returns Schema processing interface
 */
function compile (schema: string) {
  const json = readFileSync (resolve (dir, schema), 'utf8');
  const t = JSON.parse (json);
  return ajv.compile (t);
}
