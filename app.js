const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect( 'mongodb://localhost:27017/PetProject_1_ProductWebsiteBD',{ family: 4 });

app.use(express.json());

app.get('/', function (req, res) {
    res.send(req.body)
});

app.listen(5000, () =>{
    // eslint-disable-next-line no-console
    console.log(`App listen 5000 `);
});