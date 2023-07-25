// Express Application
import express from "express";

// configuration
const cfg = {
    port: process.env.PORT || 3000
};

// initiation
const app = express();

// home page route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// start server
app.listen(cfg.port, () => {
    console.log(`Example app listening at http://localhost:${cfg.port}`);
})


