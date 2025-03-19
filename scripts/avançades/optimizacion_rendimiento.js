const connectDB = require("../atlas_connection");

async function optimizacionRendimiento() {
  try {
    const db = await connectDB();
    const restaurantsCollection = db.collection("restaurants");
    const inspectionsCollection = db.collection("inspections");

    // ============================================================
    // CONSULTA FRECUENTE 1: Buscar restaurantes por tipo de comida "Chinese"
    // ============================================================
    console.log("=== Restaurantes (tipo 'Chinese') SIN índice ===");
    let explainRestaurants = await restaurantsCollection
      .find({ type_of_food: "Chinese" })
      .explain("executionStats");
    console.log(JSON.stringify(explainRestaurants, null, 2));

    // Crear índice en restaurants sobre type_of_food
    console.log("\nCreando índice en 'restaurants' sobre { type_of_food: 1 }...");
    await restaurantsCollection.createIndex({ type_of_food: 1 });

    console.log("=== Restaurantes (tipo 'Chinese') CON índice ===");
    explainRestaurants = await restaurantsCollection
      .find({ type_of_food: "Chinese" })
      .explain("executionStats");
    console.log(JSON.stringify(explainRestaurants, null, 2));

    // ============================================================
    // CONSULTA FRECUENTE 2: Buscar inspecciones con resultado "Fail" ordenadas por fecha
    // ============================================================
    console.log("\n=== Inspecciones (result 'Fail') SIN índice ===");
    let explainInspections = await inspectionsCollection
      .find({ result: "Fail" })
      .sort({ date: 1 })
      .explain("executionStats");
    console.log(JSON.stringify(explainInspections, null, 2));

    // Crear índice compuesto en inspections sobre { result: 1, date: 1 }
    console.log("\nCreando índice en 'inspections' sobre { result: 1, date: 1 }...");
    await inspectionsCollection.createIndex({ result: 1, date: 1 });

    console.log("=== Inspecciones (result 'Fail') CON índice ===");
    explainInspections = await inspectionsCollection
      .find({ result: "Fail" })
      .sort({ date: 1 })
      .explain("executionStats");
    console.log(JSON.stringify(explainInspections, null, 2));
    
  } catch (error) {
    console.error("Error en la optimización de rendimiento:", error);
  } finally {
    process.exit(0);
  }
}

optimizacionRendimiento();
