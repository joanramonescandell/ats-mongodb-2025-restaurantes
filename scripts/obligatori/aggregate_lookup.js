const connectDB = require("../atlas_connection");
const { ObjectId } = require("mongodb");

async function aggregateLookup() {
  try {
    const db = await connectDB();
    const pipeline = [
      {
        $lookup: {
          from: "inspections",
          let: { restaurantId: { $toObjectId: "$_id" } }, // Convertir _id a ObjectId
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [{ $toObjectId: "$restaurant_id" }, "$$restaurantId"] 
                }
              }
            }
          ],
          as: "inspection_history"
        }
      }
    ];

    const results = await db.collection("restaurants").aggregate(pipeline).toArray();
    console.log("Restaurantes con sus inspecciones (usando $lookup con conversión a ObjectId):");
    console.log(JSON.stringify(results, null, 2)); 
  } catch (error) {
    console.error("Error en la agregación con $lookup:", error);
  } finally {
    process.exit(0);
  }
}

aggregateLookup();
