import chalk from "chalk";
import express from "express";
import { port } from "./config/index.js";
import loader from "./loaders/index.js";

const app = express();
loader(app);
console.log("hello");

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }

  console.log(chalk.bgGreen(`Server is running on ${port}`));
});

export default app;
