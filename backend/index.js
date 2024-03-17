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
    if(result.length > 0){
        resp.send(result);
    }else{
        resp.send({result:"Data Not Found"});
    }
});

/**
 * delete
 */
app.delete('/product/:id', async (req,resp) =>{
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
});

/**
 * edit
 */
app.get('/product/:id', async (req,resp)=>{
    const result = await Product.findOne({_id : req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No Record Found"});
    }
});

/**
 * update
 */
app.put('/product/:id', async (req,resp) =>{
    const result = await Product.updateOne(
        { _id   : req.params.id },
        { $set  : req.body  }
    )
    resp.send(result);
});

/**
 * search
 */
app.get('/search/:key', async (req,resp) =>{
    var result = await Product.find({
        "$or" : [
            {name:{$regex: req.params.key}},
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
        ]
    });
    resp.send(result);
});

app.listen(8000); //run on localhost:8000