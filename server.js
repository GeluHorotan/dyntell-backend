const express = require("express");
const app = express();
const cors = require("cors");

// Initialize db connection pool

// Initialize CORS options
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/contact", require("./routes/api/contact"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT} `);
});
