import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import mongoose from './config/database.js';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import sessionsRouter from './routes/api/sessions.js';
import viewsRouter from './routes/views.js';
import path from 'path';

dotenv.config();

const app = express();

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', path.resolve('src/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
        secret: 'secretkey',
         resave: false,
         saveUninitialized: true,
         store: MongoStore.create({ mongoUrl: 'mongodb+srv://rainer:2025@cluster0.1fy9xjh.mongodb.net/desafio_5?retryWrites=true&w=majority&appName=Cluster0' }),
         // cookie: { maxAge: 180 * 60 * 1000 },
     }));

app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
