import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products,setProducts] = useState([]);

    useEffect(() =>{
        getProduct();
    },[]);
    
    const getProduct = async () => {
        var result = await fetch('http://localhost:8000/get-products');
        result = await result.json();
        setProducts(result);
    }

    /**
     * display data in table
     */
    const data = products.map((item)=>
                                <tr key={item._id}>
                                    <th>{ item._id }</th>
                                    <td>{ item.name }</td>
                                    <td>{ item.price }</td>
                                    <td>{ item.category }</td>
                                    <td>{ item.company }</td>
                                    <td><button className="delete_btn" onClick={() => deleteProduct(item._id)}>Delete</button></td>
                                    <td><Link to={"/update/"+item._id}>Edit</Link></td>
                                </tr>
                                )
    
                                
    const deleteProduct = async (id) =>{
        if (window.confirm("Delete the item?")) {
            var result = await fetch(`http://localhost:8000/product/${id}`,{
                method : 'Delete'
            });
            result = await result.json();
            if(result){
                getProduct();
                alert('Delete successfully');
            }else{
                alert('Somthing went wrong');
            }
        }

    }

    /**
     * search
     */
    const searchProduct = async (val) =>{
        if(val){
            var result = await fetch(`http://localhost:8000/search/${val}`);
            result = await result.json();
            setProducts(result);
        }else{
            getProduct();
        }
    }

    return (
        <>
            <div className="product_list_div">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> <input type="text" name="search" id="search" placeholder="Search..." onChange={ (e) => searchProduct(e.target.value) } className="search_input"/> </th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th colSpan={3}>Opration</th>
                        </tr>
                    </thead>
                    <tbody>

                        { data }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductList;