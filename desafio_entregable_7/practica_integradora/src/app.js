// import express from "express";
// import { __dirname } from "./utils.js";
// import handlebars from "express-handlebars";
// import { Server } from "socket.io";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import passport from "passport";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";

// // Cargar variables de entorno
// dotenv.config(); 

// import productRoutes from "./routes/productRoutes.js";
// import cartRouter from "./routes/cartRoutes.js";
// import viewsRoutes from "./routes/viewsRoutes.js";
// import sessionsRouter from "./routes/sessions.js";

// import initializePassport from "./config/passport.config.js";
// import connectToDB from "./config/configServer.js";

// import socketProducts from "./listener/socketProducts.js";
// import socketChat from "./listener/socketChat.js";

// const app = express();
// const PORT = process.env.PORT || 3000;


// app.use(session({
//     secret: 'secretkey',
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
// }));

// initializePassport();
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(__dirname + "/public"));

// // handlebars
// app.engine("handlebars", handlebars.engine());
// app.set("views", __dirname + "/views");
// app.set("view engine", "handlebars");

// // rutas
// app.use("/api", productRoutes);
// app.use("/api/carts", cartRouter);
// app.use('/', viewsRoutes);
// app.use('/api/sessions', sessionsRouter);

// const httpServer = app.listen(PORT, () => {
//     try {
//         console.log(`Server running in port: ${PORT}`);
//     } catch (err) {
//         console.log(err);
//     }
// });

// connectToDB();
// const socketServer = new Server(httpServer);

// socketProducts(socketServer);
// socketChat(socketServer);

import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config(); 

import productRoutes from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import viewsRoutes from "./routes/viewsRoutes.js";
import sessionsRouter from "./routes/sessions.js";

import initializePassport from "./config/passport.config.js";
import connectToDB from "./config/configServer.js";

import socketProducts from "./listener/socketProducts.js";
import socketChat from "./listener/socketChat.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la sesión
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
}));

// Inicializar Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Middleware para parsear cuerpos de solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Rutas
app.use('/', viewsRoutes); // Asegúrate de que las rutas de vistas están primero si no tienen prefijo
app.use("/api/products", productRoutes); // Asegúrate de usar un prefijo adecuado para las rutas de productos
app.use("/api/carts", cartRouter);
app.use('/api/sessions', sessionsRouter);

// Iniciar el servidor
const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Server running in port: ${PORT}`);
    } catch (err) {
        console.log(err);
    }
});

// Conectar a la base de datos
connectToDB();

// Configuración de Socket.io
const socketServer = new Server(httpServer);
socketProducts(socketServer);
socketChat(socketServer);

