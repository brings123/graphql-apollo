const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://books:chakib@cluster0.tpwe3.mongodb.net/books?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  function (err, res) {
    console.log("Connected successfully to mongoDb");
  }
);

require("dotenv").config();

const app = express();
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
