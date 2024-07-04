import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.log("Error al conectar a MongoDB:", error);
    }
};

export default connectToDB;
