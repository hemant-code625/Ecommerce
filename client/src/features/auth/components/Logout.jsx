import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {
  deleteUserAsync,
  selectLoggedInUser,
} from '../authSlice';


const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  console.log(user.id);
  useEffect(() => {

    dispatch(deleteUserAsync(user.id)).then(()=> console.log("user deleted successfully") && navigate('/login'));
    
  }, [dispatch, navigate, user.id]);

  return <>
  </>
};

export default Logout;
