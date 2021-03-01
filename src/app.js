import express from "express";
import morgan from "morgan";

const app = express();

app.set("PORT", process.env.PORT || 3000);

app.use(morgan("dev"));

app.get("/", (_, res) => res.send("Welcome"));

export default app;

