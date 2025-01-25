export async function getServices() {
  const res = await fetch('https://bayt-admin.vercel.app/api/services', {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}
