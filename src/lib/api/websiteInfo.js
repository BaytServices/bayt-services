export async function getWebsiteInfo() {
  const res = await fetch('https://bayt-admin.vercel.app/api/website-info', {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch website info');
  return res.json();
}
