const { MongoClient } = require("mongodb");

// URI de conexión a MongoDB Atlas
const uri = "mongodb+srv://haoranye:o6CsduIQKTddrSZt@cluster0.tgdaa.mongodb.net//";

const client = new MongoClient(uri); 

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
