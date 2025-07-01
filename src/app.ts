import express from "express";
import router from "./routes/shop-route";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log("server is running");
});
