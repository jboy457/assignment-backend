require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const fileUpload = require('express-fileupload');

const { errorResponseMsg } = require("./utils/response");

// Routes
const userRoutes = require('./components/user');

const app = express();

app.use(cors());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve('./uploads')));
app.use(
  fileUpload({
    createParentPath: true
  })
);

app.use("/user", userRoutes);
app.use((req, res, next) => errorResponseMsg(res, 404, `Can't find ${req.originalUrl}`));

module.exports = app;
