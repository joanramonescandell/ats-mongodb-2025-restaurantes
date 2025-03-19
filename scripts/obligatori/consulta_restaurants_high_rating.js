const connectDB = require("../atlas_connection");

async function findHighRatingRestaurants() {
  try {
    const db = await connectDB();
    // Consulta: Buscar restaurantes con rating mayor a 4
    const restaurants = await db
      .collection("restaurants")
      .find({ rating: { $gt: 4 } })
      .toArray();

    console.log("Restaurantes con calificación superior a 4:");
    console.log(restaurants);
  } catch (error) {
    console.error("Error al buscar restaurantes:", error);
  } finally {
    process.exit(0);
  }
}

findHighRatingRestaurants();
