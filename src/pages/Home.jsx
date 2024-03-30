/* eslint-disable no-unused-vars */

import Navbar from "../features/navbar/Navbar"
import Product from "../features/product/components/ProductList"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {fetchCartByUserIdAsync} from '../features/cart/CartSlice.js'
// import { selectLoggedInUser } from '../features/auth/authSlice.js'
import Footer  from "../features/common/components/Footer.jsx"
const Home = () => {
  // const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);
  
  // useEffect(()=>{
  //   if(user){
  //     dispatch(fetchCartByUserIdAsync(user.id));
      
  //   }
  // },[user,dispatch])
  
  return (
    <>
    {/* create a new customized Navbar */}
      <Navbar>
        <Product/>
      </Navbar> 
     <Footer/>
    </>
  )
}

export default Home
