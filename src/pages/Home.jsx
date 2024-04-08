/* eslint-disable no-unused-vars */

import Navbar from "../features/navbar/Navbar"
import Product from "../features/product/components/ProductList"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {fetchCartByUserIdAsync} from '../features/cart/CartSlice.js'
// import { selectLoggedInUser } from '../features/auth/authSlice.js'
import Footer  from "../features/common/components/Footer.jsx"
import { jwtDecode } from "jwt-decode"
import { setUser } from '../features/auth/authSlice.js'
const Home = () => {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(localStorage.getItem("token")){
      const {user} = jwtDecode(localStorage.getItem("token"));
      console.log("User in Home: ",user);
      const userProfile ={
        name:user.name,
        email:user.email,
        imageUrl: user.picture,
        googleId:user.googleId || null,
        addresses:user.addresses,
      }
      dispatch(fetchCartByUserIdAsync(userProfile.id));
      // save the user in the redux store
      dispatch(setUser(userProfile));
    }
  },[dispatch])
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
