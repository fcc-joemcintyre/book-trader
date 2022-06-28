import { isEmail } from '../src/isEmail.js';

describe ('isEmail', () => {
  it ('valid', () => {
    expect (isEmail ('john@example.com')).toBe (null);
  });

  it ('invalid', () => {
    expect (isEmail ('john@example.c')).toBe ('format');
  });
});
