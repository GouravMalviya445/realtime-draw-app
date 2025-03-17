import RoomCanvas from "@/components/RoomCanvas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CanvasPage({ params }: {
  params: Promise<{
    roomId: string
  }>
}) {
  const roomId = (await params).roomId;
  const parsedRoomId = parseInt(roomId);
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    redirect("/");
  }

  // if room id is not valid then show error
  if (isNaN(parsedRoomId)) {
    return (
      <div className="text-red-500 grid h-screen w-screen place-content-center">Invalid Room Id</div>
    )
  }

  return (
    <RoomCanvas roomId={parsedRoomId} token={accessToken} />
  )
}