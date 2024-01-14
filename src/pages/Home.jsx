import Navbar from "../features/navbar/Navbar"
import Product from "../features/product/components/ProductList"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCartByUserIdAsync} from '../features/cart/CartSlice.js'
import { selectGoogleUser, selectLoggedInUser } from '../features/auth/authSlice.js'
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const googleUser = useSelector(selectGoogleUser);
  
  useEffect(()=>{
    if(user){
      dispatch(fetchCartByUserIdAsync(user.id));
    }else if(googleUser){
      dispatch(fetchCartByUserIdAsync(googleUser.id));
    }
  },[user, dispatch, googleUser])
  
  return (
    <div>
      <Navbar>
        <Product/>
      </Navbar> 
     
    </div>
  )
}

export default Home
