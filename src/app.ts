import express from "express";
import { errorHandler } from "../src/middlewares/shop-validate";
import router from "./routes/shop-route";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/v1", router);

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running in PORT ${PORT}`);
});
