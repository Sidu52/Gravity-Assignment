require('dotenv').config();
const express = require('express');
const db = require('./config/mysql');
const createTable = require('./createTable/createTable');
const cors = require('cors');
const dotenve = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
const corsOptions = {
    origin: [process.env.CORS_URL, process.env.CORS_URL1],  // Allow only requests from this domain
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set routes
app.use('/user', require('./routes/userRoutes'));
app.use('/product', require('./routes/productRoutes'));

//Set Server
app.listen(port, (err) => {
    if (err) {
        console.log('Error in server run:', err);
        return;
    }
    console.log('Server run successful for port', port);
});