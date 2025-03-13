const _config = {
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  wsServerUrl: process.env.NEXT_PUBLIC_WS_SERVER_URL
}

export const config = Object.freeze(_config);