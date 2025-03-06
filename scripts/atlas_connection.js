const { MongoClient } = require("mongodb");

// URI de conexión a MongoDB Atlas
const uri = "mongodb+srv://JoanRamon:joan1234@cluster0.tgdaa.mongodb.net/";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Conectado a MongoDB Atlas");
        const db = client.db("practica1"); 
        return db;
    } catch (error) {
        console.error("❌ Error de conexión:", error);
        process.exit(1); 
    }
}

module.exports = connectDB;
