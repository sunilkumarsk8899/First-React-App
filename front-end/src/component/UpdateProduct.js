import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [name,setName] = useState([]);
    const [price,setPrice] = useState([]);
    const [category,setCategory] = useState([]);
    const [company,setCompany] = useState([]);
    const [error,setError] = useState(false);
    const params = useParams(); // url params
    const navigate = useNavigate();

    const getPoductDetails = async () => {
        var result = await fetch(`http://localhost:8000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    useEffect(()=>{
        getPoductDetails();
    }, []);

    const updateGetProductData = async () => {
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        console.log(name,price,category,company);
        var result = await fetch(`http://localhost:8000/product/${params.id}`,{
            method  : 'Put',
            body    : JSON.stringify({name,price,category,company}),
            headers : {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        if(result){
            navigate('/');
        }

    }

    const cancal = () =>{
        navigate('/');
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="add_product">
                            <h1>Add Product</h1>
                            <div className="input-group">
                                <input type="text" value={name} onChange={ (e) => setName(e.target.value) }  placeholder="Enter product name" />
                            </div>
                            <div className="error_div">
                                { error && !name ? <span>Name Field Is Required</span> : '' }
                            </div>
                            
                            <div className="input-group">
                                <input type="text" value={price} onChange={ (e) => setPrice(e.target.value) } placeholder="Enter product price" />
                            </div>
                            <div className="error_div">
                                { error && !price ? <span>Price Field Is Required</span> : '' }
                            </div>
                            
                            <div className="input-group">
                                <input type="text" value={category} onChange={ (e) => setCategory(e.target.value) } placeholder="Enter product category" />
                            </div>
                            <div className="error_div">
                                { error && !category ? <span>category Field Is Required</span> : '' }
                            </div>
                            
                            <div className="input-group">
                                <input type="text" value={company} onChange={ (e) => setCompany(e.target.value) } placeholder="Enter product company" />
                            </div>
                            <div className="error_div">
                                { error && !company ? <span>Company Field Is Required</span> : '' }
                            </div>
                            
                            <div className="input-group">   
                                <button className="add_btn" onClick={updateGetProductData}>Update</button>
                                <button className="cancal_btn" onClick={cancal}>Cancal</button>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </>
    )
}

export default AddProduct;