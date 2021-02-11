export function isPassword (value) {
  if (value.length < 4) {
    return 'length';
  } else {
    return /([A-Za-z0-9!@#$%^&*-+_=])+/.test (value) ? null : 'format';
  }
}
