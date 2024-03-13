import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // this is use for redirect

const SignUp = () => {

    const navigate = useNavigate();

    const auth = localStorage.getItem('userData');
    useEffect(() => {
        if(auth){ 
            navigate('/'); // if user login and register after than redirect to home other wise open this sign up page 
        }
    },[]);


    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const collectData = async () => {
        let result = await fetch('http://localhost:8000/register',{
            method  : 'POST',
            body    : JSON.stringify({name, email, password}),
            headers : {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        localStorage.setItem('userData',JSON.stringify( result ))
        if(result._id){
            navigate('/');
        }else{
            console.log('somthing went wrong');
        }
    }

    return (
        <div className="singup_container">
            <h1>Sign Up</h1>
            <div className="sign_up_form_div">
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                <input type="submit" onClick={collectData} name="submit" id="submit" />
            </div>
        </div>
    )
}

export default SignUp;

