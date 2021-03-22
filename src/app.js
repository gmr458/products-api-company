import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes";
import homeRouter from "./routes/home.routes";
import productRouter from "./routes/product.routes";
import userRouter from "./routes/user.routes";

const app = express();

app.set("PORT", process.env.PORT || 3000);

app
  .use(morgan("dev"))
  .use(express.json());

app
  .use("/auth", authRouter)
  .use(homeRouter)
  .use("/product", productRouter)
  .use("/user", userRouter);

export default app;
