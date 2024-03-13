import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('userData');
    useEffect(() => {
        if(auth){ 
            navigate('/'); // if user login and register after than redirect to home other wise open this sign up page 
        }
    },[]);

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');

    const loginCallback = async () => {
        if(email && password){
            let result = await fetch('http://localhost:8000/login',{
                method  : 'POST',
                body    : JSON.stringify({ email,password }),
                headers : {
                    "Content-Type": "application/json"
                }
            });
            result = await result.json();
            if(result.status == 200){
                localStorage.setItem('userData',JSON.stringify(result.data));
                navigate('/');
            }else{
                alert('somthing went wrong');
            }
        }else{
            alert('Required Fields');
        }

    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h1>Login Page</h1>
                    <div className="login_div">
                        <div className="form-group">
                            <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <input type="text" name="password" id="password" value={password} onChange={ (e) => setPassword(e.target.value) } placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <button className="login_btn" id="login_btn" name="login_btn" onClick={loginCallback} > Login </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;