import { apiClient } from "@/lib/apiClient";

type Chat = {
  id: number;
  userId: string;
  message: string;
  roomId: number;
}

export async function getExistingShapes(roomId: number) {
  try {
    const res = await apiClient(`/rooms/chat/${roomId}`);
    if (res.data.success) {
      const parsedMessage = res.data.data.chats.map((chat: Chat) => JSON.parse(chat.message));
      return parsedMessage;
    }
  } catch (err) {
    console.log("Error in getting existing shapes", err);
  }
}