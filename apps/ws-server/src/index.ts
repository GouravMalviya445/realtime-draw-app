import { WebSocketServer } from 'ws';
import { decodeJwt } from "@repo/be-common/src/lib/decodeJwt";
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

  const decodedToken = decodeJwt(accessToken, config.accessTokenSecret);
  
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

});