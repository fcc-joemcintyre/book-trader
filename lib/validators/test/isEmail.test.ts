import { expect } from 'earljs';
import { isEmail } from '../src/isEmail.js';

describe ('isEmail', () => {
  it ('valid', () => {
    expect (isEmail ('john@example.com')).toEqual (null);
  });

  it ('invalid', () => {
    expect (isEmail ('john@example.c')).toEqual ('format');
  });
});
