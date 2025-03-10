import { WebSocketServer } from 'ws';
import { verifyJwtToken } from "@repo/be-common/src/lib";
import { config } from "@repo/be-common/src/config/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, req) {
  console.log("A client connected to websocket"); 
  ws.on('error', console.error);
  
  const url = req.url;
  const searchParams = new URLSearchParams(url);
  const accessToken = searchParams.get("accessToken");
  
  if (!accessToken || !config.accessTokenSecret) {
    ws.close();
    return;
  }

  const decodedToken = verifyJwtToken(accessToken);
  
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

});