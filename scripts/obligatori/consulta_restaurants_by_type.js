const connectDB = require("../atlas_connection");

async function findRestaurantsByType() {
  try {
    const db = await connectDB();
    // Consulta: Buscar restaurantes donde el campo type_of_food sea "Chinese"
    const restaurants = await db
      .collection("restaurants")
      .find({ type_of_food: "Chinese" })
      .toArray();

    console.log("Restaurantes con comida 'Chinese':");
    console.log(restaurants);
  } catch (error) {
    console.error("Error al buscar restaurantes:", error);
  } finally {
    process.exit(0);
  }
}

findRestaurantsByType();
