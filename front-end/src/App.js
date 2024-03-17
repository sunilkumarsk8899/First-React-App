import './App.css'
import Nav from './component/Nav'
import Footer from './component/Footer'
import SignUp from './component/SignUp';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateProduct from './component/UpdateProduct';
// import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>

          <Route element={<PrivateComponent/>}> {/* this is check user login , register or not  */} 
            <Route path='/' element={ <ProductList/> } />
            <Route path='/add' element={ <AddProduct/> } />
            <Route path='/update/:id' element={ <UpdateProduct/> } />
            <Route path='/logout' element={ <h1>logout Product Page</h1> } />
            <Route path='/profile' element={ <h1>Profile Product Page</h1> } />
          </Route>

          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={ <Login/> } />

        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
