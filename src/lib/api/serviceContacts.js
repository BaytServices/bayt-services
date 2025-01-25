export async function getServiceContacts({ cityId, serviceId, page = 1, limit = 10 }) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(cityId && { city: cityId }),
    ...(serviceId && { service: serviceId })
  });
  
  const res = await fetch(`https://bayt-admin.vercel.app/api/service-contacts?${params}`);
  if (!res.ok) throw new Error('Failed to fetch service contacts');
  return res.json();
}