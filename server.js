const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import cors

const app = express();
const PORT = 3000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Serve static files
app.use(express.static(path.join(__dirname, "script")));

// Endpoint to save stats
app.post("/saveStats", (req, res) => {
  const stats = req.body;

  fs.writeFile("stats.json", JSON.stringify(stats, null, 2), (err) => {
    if (err) {
      console.error("Error saving stats:", err);
      res.status(500).send("Failed to save stats");
    } else {
      res.status(200).send("Stats saved successfully");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});