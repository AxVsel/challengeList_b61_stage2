import express from "express";
import router from "./routes/post-route";

const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.listen(5000, () => {
  console.log("server is running");
});
