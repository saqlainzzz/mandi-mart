const mongoose = require("mongoose");

const uri =
  "mongodb+srv://mandiadmin:MandiMart%40Basti@cluster0.khx2git.mongodb.net/mandimart?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("CONNECTED");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });