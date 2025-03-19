const connectDB = require("../atlas_connection");

async function aggregateAverageRatingByFoodType() {
  try {
    const db = await connectDB();
    const pipeline = [
      {
        $group: {
          _id: "$type_of_food",
          averageRating: { $avg: "$rating" }
        }
      },
      {
        $sort: { averageRating: -1 }
      }
    ];

    const results = await db.collection("restaurants").aggregate(pipeline).toArray();
    console.log("Calificación promedio por tipo de comida:");
    console.log(results);
  } catch (error) {
    console.error("Error en la agregación:", error);
  } finally {
    process.exit(0);
  }
}

aggregateAverageRatingByFoodType();
