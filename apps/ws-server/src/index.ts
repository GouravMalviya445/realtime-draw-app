import WebSocket, { WebSocketServer } from 'ws';
import { verifyJwtToken } from "@repo/be-common/src/lib";
import { prisma } from '@repo/db/prisma';

interface IUser {
  ws: WebSocket,
  rooms: string[]
  userId: string;
}

const users: IUser[] = [];

const wss = new WebSocketServer({ port: 8080 });

function checkUserAuthenticated(token: string): string | null {
  if (!token) return null;

  const decodedToken = verifyJwtToken(token);
  if (!decodedToken || typeof decodedToken === "string") {
    return null;
  }
  
  if (!decodedToken?.id) {
    return null;
  }

  return decodedToken?.id;
}

wss.on('connection', function connection(ws, req) {
  prisma
    .$connect()
    .then(() => console.log("Connected to DB"))
    .catch((err: any) => console.log("Error while connecting to DB", err));

  console.log("A client connected to websocket"); 
  ws.on('error', (err) => {
    console.log("Error in WS: ", err);
  });
  
  const url = req.url;
  const searchParams = new URLSearchParams(url?.split("?")[1]);
  const accessToken = searchParams.get("accessToken");
  
  const userId = checkUserAuthenticated(accessToken as string);
  if (!userId) {
    ws.close();
    prisma
      .$disconnect()
      .then(() => console.log("Disconnected from DB"))
      .catch((err: any) => console.log("Error while disconnecting from DB", err));
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws
  });
  
  // receive message event 
  ws.on('message', async function message(data) {
    let parsedData = null;
    try {
      parsedData = JSON.parse(data.toString()); // data = {type: "join-room", roomId: 1, message: "hello"
    } catch (error) {
      console.log("Error while parsing the data", error);
    }
    
    
    // if user wants to join the room push roomId in the global state
    if (parsedData?.type === "join-room") {
      const user = users.find(user => user.ws === ws);

      const room = await prisma.room.findUnique({
        where: { id: parsedData.roomId }
      });
      if (!room || !user) {
        ws.close();
        return;
      }
      user.rooms.push(parsedData.roomId);
    }


    // if user wants to leave the room remove roomId from users.rooms
    if (parsedData?.type === "leave-room") {
      const user = users.find(user => user.ws === ws);
      if (!user) return;
      user.rooms = user.rooms.filter(room => room !== parsedData.roomId)
    }


    // if user wants to send a message to the room
    if (parsedData?.type === "chat") {
      const chatData = {
        type: parsedData.type,
        message: parsedData.message,
        roomId: parsedData.roomId
      }

      const chat = await prisma.chat.create({
        data: {
          message: chatData.message,
          roomId: chatData.roomId,
          userId: userId  // user id of the user who sent the message
        }
      });
      
      users.forEach(user => {
        if (user.rooms.includes(chatData.roomId)) {
          user.ws.send(JSON.stringify(chatData))
        }
      })
    }
  });

});