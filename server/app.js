import express from "express";
import fileUpload from "express-fileupload";
import router from "./routes/user.routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(fileUpload({ useTempFiles: true, tempFileDir: "./upload" }));

app.use(router);

export default app;
