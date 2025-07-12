import express from "express";
import authRoute from "./routes/auth";

const app = express();
app.use(express.json());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 2200;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
