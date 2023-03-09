const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect( 'mongodb://localhost:27017/productWebSiteBD',{ family: 4 });

app.use(express.json());

const userRouter = require('./routes/user.route');

app.use("/", userRouter);

app.listen(5000, () =>{
    // eslint-disable-next-line no-console
    console.log(`App listen 5000 `);
});
