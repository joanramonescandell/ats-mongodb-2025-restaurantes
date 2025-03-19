const connectDB = require("../atlas_connection");

async function listInspectionsViolations() {
  try {
    const db = await connectDB();
    
    const inspections = await db.collection("inspections").aggregate([
      { "$match": { "result": "Fail" } },
      { 
        "$addFields": { 
          "converted_date": { 
            "$dateFromString": { "dateString": "$date", "format": "%b %d %Y" } 
          } 
        } 
      },
      { "$sort": { "converted_date": 1 } } // Orden ascendente por fecha
    ]).toArray();

    console.log("Inspecciones con violaciones (ordenadas por fecha):");
    console.log(inspections);
  } catch (error) {
    console.error("Error al listar inspecciones:", error);
  } finally {
    process.exit(0);
  }
}

listInspectionsViolations();
