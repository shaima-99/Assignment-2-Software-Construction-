// const { response } = require("express");
const express = require("express");
const functions = require("firebase-functions");
var cors = require('cors');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res, next)=> res.json({message: "Firebase service is working!"}));
// app.get("/todos", (req,res,next)=> res.json({ message: "Get a list of todos"}));
// Get Hello World
exports.helloWorld = functions.https.onRequest((request, response) => {
  // functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Get the Hi
exports.hi = functions.https.onRequest((request, response)=> {
  response.json({message: "Hi There!", sender: "Firebase Function"});
});


const storeRouter = require("./controllers/store_controller");
app.use("/store", storeRouter);

exports.api = functions.https.onRequest(app);

// To handle "Function Timeout" exception
exports.functionsTimeOut = functions.runWith({
  timeoutSeconds: 300,
});
exports.setupstore = functions.https.onRequest(require("./setup_store"));

