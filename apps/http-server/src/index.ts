import express from "express"
import { config } from "@repo/be-common/src/config/config";

const app = express();

app.use(express.json());

// all routes
import userRouter from "./routes/user.routes";
import roomRouter from "./routes/room.routes";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/room", roomRouter);


const port = config.port || 5154
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});