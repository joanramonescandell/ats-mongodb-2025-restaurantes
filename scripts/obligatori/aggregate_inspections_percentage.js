const connectDB = require("../atlas_connection");

async function aggregateInspectionsByResult() {
  try {
    const db = await connectDB();
    const pipeline = [
      {
        $group: {
          _id: "$result",
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          results: { $push: { result: "$_id", count: "$count" } },
          total: { $sum: "$count" }
        }
      },
      {
        $unwind: "$results"
      },
      {
        $project: {
          _id: 0,
          result: "$results.result",
          count: "$results.count",
          percentage: { $multiply: [ { $divide: [ "$results.count", "$total" ] }, 100 ] }
        }
      }
    ];

    const results = await db.collection("inspections").aggregate(pipeline).toArray();
    console.log("Número de inspecciones por resultado y porcentajes:");
    console.log(results);
  } catch (error) {
    console.error("Error en la agregación:", error);
  } finally {
    process.exit(0);
  }
}

aggregateInspectionsByResult();
