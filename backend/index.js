// index.js
const cors = require("cors")
const express = require("express");
const app = express();
const port = 5000;
const connectToMongoDB = require("./db");
app.use(express.json());
(async () => {
    try {
        await connectToMongoDB();

        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        // app.use(cors())

        app.options("*", (req, res) => {
            res.status(200).send(); // Send HTTP OK status
        });

        app.get("/", (req, res) => {
            res.send("I luv");
        });

        app.use("/api", require("./routes/createUser"));
        app.use("/api", require("./routes/displayData"));
        app.use("/api", require("./routes/OrderData"));

        app.listen(port, () => {
            console.log("Server is running on port: " + port);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1); // Exit process with failure
    }
})();
