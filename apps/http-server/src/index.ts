import express from "express"
import { config } from "@repo/be-common/src/config/config";

const app = express();

const baseApiRoute = "/api/v1";

app.post(`${baseApiRoute}/signup`, (req, res) => {

});

app.post(`${baseApiRoute}/signin`, (req, res) => {

});

app.post(`${baseApiRoute}/add`, (req, res) => {

});

const port = config.port || 5154
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});