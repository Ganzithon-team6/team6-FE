const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

//로그인
export async function loginApi({ loginId, password, role }) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ loginId, password, role }),
  });

  if (!res.ok) {
    let message = '로그인에 실패했습니다.';
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch (e) {}
    throw new Error(message);
  }

  return res.json();
}

// 가게 회원가입
export async function signupMarket({
  loginId,
  password,
  name,
  address,
  description,
}) {
  const res = await fetch(`${BASE_URL}/api/auth/signup/market`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      loginId,
      password,
      name,
      address,
      description,
    }),
  });

  if (!res.ok) {
    let message = '가게 회원가입에 실패했습니다.';
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch (e) {}
    throw new Error(message);
  }

  return;
}

// 복지시설 회원가입
export async function signupCenter({
  loginId,
  password,
  name,
  address,
  description,
}) {
  const res = await fetch(`${BASE_URL}/api/auth/signup/center`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      loginId,
      password,
      name,
      address,
      description,
    }),
  });

  if (!res.ok) {
    let message = '복지시설 회원가입에 실패했습니다.';
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch (e) {}
    throw new Error(message);
  }

  return;
}
