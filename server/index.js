const express = require("express");
const { graphqlHTTP } = require("express-graphql");

require("dotenv").config();

const app = express();

app.use("/graphql", graphqlHTTP({}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
