const express = require('express');
const routes = require('./routes');
require('./config/redis');

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, console.log('Application is runing port: 3333'));