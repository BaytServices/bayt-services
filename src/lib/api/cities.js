// lib/api/cities.js
export async function getCities() {
  const res = await fetch('https://bayt-admin.vercel.app/api/cities');
  if (!res.ok) throw new Error('Failed to fetch cities');
  return res.json();
}