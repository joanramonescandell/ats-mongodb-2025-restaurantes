const connectDB = require("./atlas_connection");

async function testConnection() {
    const db = await connectDB();
    if (db) {
        console.log("📌 Base de datos seleccionada: practica1");
        const collections = await db.listCollections().toArray();
        console.log("📂 Colecciones disponibles:", collections.map(col => col.name));
    }
}

testConnection();
