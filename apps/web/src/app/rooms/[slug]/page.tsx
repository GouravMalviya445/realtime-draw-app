import { apiClient } from "@/lib/apiClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


async function getRoomId(slug: string) {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) return null;
  
  if (!slug) return;
  try {
    const res = await apiClient.get(`/rooms/${slug}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Cookie": `accessToken=${accessToken}`
      }
    });
    console.log(res.data)
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
  
  if (roomId) {
    redirect(`/canvas/${roomId}`)
  } else {
    return (
      <div className="text-red-500 grid h-screen w-screen place-content-center">Room not found</div>
    )
  }
}