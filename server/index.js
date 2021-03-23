const express = require("express");
require("dotenv").config();

const app = new express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, `Express server listening on port ${PORT}`);
