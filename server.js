import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`App is running on http://localhost:${PORT}`);
});
