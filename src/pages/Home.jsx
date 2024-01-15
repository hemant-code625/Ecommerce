import Navbar from "../features/navbar/Navbar"
import Product from "../features/product/components/ProductList"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCartByUserIdAsync} from '../features/cart/CartSlice.js'
import { selectLoggedInUser } from '../features/auth/authSlice.js'
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  
  useEffect(()=>{
    if(user){
      dispatch(fetchCartByUserIdAsync(user.id));
      
    }
  },[user,dispatch])
  
  return (
    <div>
      <Navbar>
        <Product/>
      </Navbar> 
     
    </div>
  )
}

export default Home
