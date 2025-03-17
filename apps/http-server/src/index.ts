import express from "express"
import { config } from "@repo/be-common/src/config/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors({
    origin: [config.corsOrigin as string, "http://localhost:3000", "http://localhost:5173"],
    methods: ["POST", "PUT", "DELETE", "UPDATE", "PATCH", "GET"],
    credentials: true // PASS THIS IF YOU ARE USING COOKIES FOR AUTHENTICATION
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// all routes
import userRouter from "./routes/user.routes";
import roomRouter from "./routes/room.routes";
import errorHandler from "./middlewares/error.middleware";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);


// global error handler
app.use(errorHandler);

const port = config.port || 5154
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});