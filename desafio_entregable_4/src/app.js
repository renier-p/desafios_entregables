import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import productRoutes from "./routes/productRoutes.js";
import viewsRoutes from "./routes/viewsRoutes.js";
import socketProducts from "./listener/socketProducts.js";

const app = express();
const PORT = 8080;

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/api", productRoutes);
app.use("/", viewsRoutes);

const httpServer = app.listen(PORT, () => {
  try {
    console.log(`Server is runnning on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

const socketServer = new Server(httpServer);

socketProducts(socketServer);
