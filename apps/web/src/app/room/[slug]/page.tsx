import { apiClient } from "@/lib/apiClient";


async function getRoomId(slug: string) {
  if (!slug) return;
  try {
    const res = await apiClient.get(`/rooms/${slug}`);
    if (res.data.status === 200) {
      return res.data.data.room.id
    }
  } catch (err) {
    
  }
}

export default async function Room(
  { params }: { params: Promise<{ slug: string }> }
) { 
  const slug = (await params).slug
  const roomId = await getRoomId(slug);
  console.log(roomId);
  
  return (
    <div>{slug}</div>
  )  
}