import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://rainer:2025@cluster0.1fy9xjh.mongodb.net/desafio_6?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;