const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect( 'mongodb://localhost:27017',{ family: 4 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', console.log(true));


app.listen(5000, () =>{
    // eslint-disable-next-line no-console
    console.log(`App listen 5000 `);
});