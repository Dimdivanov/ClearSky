const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const { MONGO_URI, PORT } = require('./config');
const errorHandler = require('./middleware/error');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mongoDB connection
mongoose.connect(MONGO_URI);
mongoose.connection.on('connected', () => console.log('data base connected'));
mongoose.connection.on('error', (err) => console.log(err));

//routes
app.use(routes);
//error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
