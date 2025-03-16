import { apiClient } from "@/lib/apiClient";


async function getRoomId(slug: string) {
  if (!slug) return;
  try {
    const res = await apiClient.get(`/rooms/${slug}`);
    if (res.data.success) {
      return res.data.data.room.id;
    }
  } catch (err) {
    return null
  }
}

export default async function Room(
  { params }: { params: Promise<{ slug: string }> }
) { 
  const slug = (await params).slug
  const roomId = await getRoomId(slug);
  
  return (
    <div>{slug}</div> // TODO: replace with canvas
  )  
}