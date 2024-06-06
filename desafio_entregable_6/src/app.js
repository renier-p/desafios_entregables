import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import mongoose from './config/database.js';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import sessionsRouter from './routes/api/sessions.js';
import viewsRouter from './routes/views.js';
import path from 'path';

dotenv.config();

const app = express();

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.resolve('src/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://rainer:2025@cluster0.1fy9xjh.mongodb.net/desafio_6?retryWrites=true&w=majority&appName=Cluster0" }),
}));

app.use(passport.initialize());
app.use(passport.session());

initializePassport();

app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

const PORT =  8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

