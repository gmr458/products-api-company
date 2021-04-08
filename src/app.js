import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes";
import homeRouter from "./routes/home.routes";
import productRouter from "./routes/product.routes";
import userRouter from "./routes/user.routes";
import { env } from "process";

const app = express();

app.set("PORT", env.PORT || 3000);

app.use(morgan("dev"))
	.use(express.json());

app.use(homeRouter)
	.use("/api/auth", authRouter)
	.use("/api/product", productRouter)
	.use("/api/user", userRouter);

export default app;
