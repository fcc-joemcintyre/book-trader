import { isPassword } from '../src/isPassword.js';

describe ('isPassword', () => {
  it ('valid', () => {
    expect (isPassword ('abcdef')).toBe (null);
  });

  it ('invalid length', () => {
    expect (isPassword ('abc')).toBe ('length');
  });

  it ('invalid content', () => {
    expect (isPassword ('abc>def')).toBe ('format');
  });
});
