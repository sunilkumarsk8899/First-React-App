const express = require('express');
// const mongoose = require('mongoose');
require('./db/config');
const app = express();

/*const connectDB = async () => {

    mongoose.connect('mongodb://localhost:27017/e-comm');
    const productSchema = new mongoose.Schema({}); // schmea
    const product = mongoose.model('product',productSchema);
    const data = await product.find();
    console.log(data);

}
connectDB();*/

const User = require('./db/User');
const Product = require('./db/AddProduct');

const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get("/", (req,resp) => {
    resp.send('App Is Working Now...');
});

/**
 * register
 */
app.post('/register', async (req,resp) => {
    const user = new User(req.body);
    var check_exist = await User.findOne(req.body).select('-password'); // get data if chack exist or not
    if(check_exist){
        resp.send('This email already exist');
    }else{
        var result = await user.save();
        result = result.toObject();
        delete result.password;
        resp.send(result);
    }
});

/**
 * login
 */
app.post('/login', async (req,resp) => {
    if(req.body.email && req.body.password){
        const user = await User.findOne(req.body).select('-password'); // all fields get but password field not get
        if(user){
            resp.send( { message : 'User Found', data : user, status : 200 } ); // user found
        }else{
            resp.send( { message : 'User Not Found', status : 404 } ); // user not found
        }
    }else{
        resp.send( { message : 'Somthing went wrong', status : 404 } ); // email & password in any single field empty than show this error
    }
});


/**
 * add product
 */
app.post('/add-product', async (req,resp) => {
    const product = new Product(req.body);
    var result = await product.save();
    resp.send(result);
});

/**
 * get all products
 */
app.get('/get-products', async (req,resp) => {
    var result = await Product.find();
    resp.send(result);
});


app.listen(8000); //run on localhost:8000