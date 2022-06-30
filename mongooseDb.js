const mongoose = require('mongoose');
let config = process.env;
mongoose.connect(config.DB_URL);