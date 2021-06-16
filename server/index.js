const express = require('express');
const app = express();
const photoRoute = require('./Routes/photo.controller');

app.use(express.json());

app.use(express.static('public'));

app.use('/photo', photoRoute);

app.listen(3000, () => console.log('server is listening on http://localhost:3000'));