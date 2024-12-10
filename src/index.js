const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const { router: authRoutes } = require('./routes/auth');



dotenv.config();

const app = express();

const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

app.use('/products', productRoutes);

app.get('/',(req,res)=>{
    res.send("welcome to route");
});


app.listen(PORT,()=>{
    console.log("Server is running on port : " + PORT);
});