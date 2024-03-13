import React, { useEffect, useState } from "react";

const ProductList = () => {
    const [productList,setProductList] = useState([]);
    useEffect(() =>{
        getProduct();
    },[]);
    const getProduct = async () => {
        var result = await fetch('http://localhost:8000/get-products');
        result = await result.json();
        setProductList(result);
    }
    console.log(productList);
    return (
        <>
            <div className="product_list_div">
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productList.map((item,index)=>
                            <tr>
                                <th scope="row">{ index+1 }</th>
                                <td>{ item.name }</td>
                                <td>{ item.price }</td>
                                <td>{ item.category }</td>
                                <td>{ item.company }</td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductList;