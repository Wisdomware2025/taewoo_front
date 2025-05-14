import { API } from '../config';

export async function fetchUserInfo(userId: string) {
  const res = await fetch(API.USER_INFO(userId));
  if (!res.ok) throw new Error('유저 정보 요청 실패');
  return res.json();
}

export async function translateMessage(message: string) {
  const res = await fetch(API.TRANSLATE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('번역 요청 실패');
  return res.json();
}
