export async function get (path) {
  try {
    const res = await fetch (`${window.location.origin}${path}`, {
      method: 'get',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    });
    const data = await res.json ();
    return ({ ok: res.ok, status: res.status, data });
  } catch (err) {
    return ({ ok: false, status: 500, data: { message: 'Network error' } });
  }
}

export async function post (path, body) {
  try {
    const res = await fetch (`${window.location.origin}${path}`, {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (body),
    });
    const data = await res.json ();
    return ({ ok: res.ok, status: res.status, data });
  } catch (err) {
    return ({ ok: false, status: 500, data: { message: 'Network error' } });
  }
}

export async function postForm (path, body) {
  try {
    const res = await fetch (`${window.location.origin}${path}`, {
      method: 'post',
      headers: {
        accept: 'application/json',
      },
      credentials: 'same-origin',
      body,
    });
    const data = await res.json ();
    return ({ ok: res.ok, status: res.status, data });
  } catch (err) {
    return ({ ok: false, status: 500, data: { message: 'Network error' } });
  }
}

export async function put (path, body) {
  try {
    const res = await fetch (`${window.location.origin}${path}`, {
      method: 'put',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (body),
    });
    const data = await res.json ();
    return ({ ok: res.ok, status: res.status, data });
  } catch (err) {
    return ({ ok: false, status: 500, data: { message: 'Network error' } });
  }
}

export async function remove (path) {
  try {
    const res = await fetch (`${window.location.origin}${path}`, {
      method: 'delete',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    });
    const data = await res.json ();
    return ({ ok: res.ok, status: res.status, data });
  } catch (err) {
    return ({ ok: false, status: 500, data: { message: 'Network error' } });
  }
}
