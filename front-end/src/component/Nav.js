import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {

    const navigate = useNavigate();
    const auth = localStorage.getItem('userData');
    const logout = () => {
        localStorage.clear();
        navigate('/sign-up');
    }

    const getUserData = auth ? JSON.parse(auth) : '';

    return (
        <div className="nav_main_div">
            <div className="logo">
                <img src="http://srinfotechno.in/img/logo.png"/>
            </div>
            <ul className="nav_menu">
                <li className={ auth ? 'show' : 'hide' }> <Link to="/" > Product </Link> </li>
                <li className={ auth ? 'show' : 'hide' }> <Link to="/add" > Add Product </Link> </li>
                <li className={ auth ? 'show' : 'hide' }> <Link to="/update" > Update Product </Link> </li>
                <li className={ auth ? 'show' : 'hide' }> <Link to="/profile" > Profile </Link> </li>
                {
                    auth ?  <>
                                <li><Link onClick={logout} to="/sign-up" > Logout </Link></li>
                                <li className="text-capitalize"> User Name : { getUserData.name } </li>
                            </>
                        :   <>
                                <li><Link to="/sign-up" > Sign Up </Link></li>
                                <li><Link to="/login"> Login </Link></li>
                            </>
                }
            </ul>
        </div>
    )
}

export default Nav;