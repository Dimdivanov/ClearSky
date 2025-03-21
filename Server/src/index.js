const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const { authMiddleware } = require('./middleware/authMiddleware');
const routes = require('./routes');
const { MONGO_URI, PORT } = require('./config');
const errorHandler = require('./middleware/error');

const app = express();

//middleware
app.use(
    cors({
        origin: 'http://localhost:4200',
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(authMiddleware);

//mongoDB connection
mongoose.connect(MONGO_URI);
mongoose.connection.on('connected', () => console.log('Data base connected'));
mongoose.connection.on('error', (err) => console.log(err));

//routes
app.use(routes);
//error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
