"use strict";

const path = require('path');

// Basic express setup:

const PORT          = process.env.PORT || 5000;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
// Serve the `public` folder from the project root. Use an absolute path so this works when
// the app is required as a module (for example by Vercel serverless functions).
app.use(express.static(path.join(__dirname, '..', 'public')));

// The in-memory database of tweets. It's a basic object with an array in it.
const db = require("./lib/in-memory-db");

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

// Only start the server when this file is run directly (npm start / node server/index.js).
// When the app is imported (for example by a serverless platform like Vercel),
// we export the Express app instead of calling .listen()
if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
}

module.exports = app;
