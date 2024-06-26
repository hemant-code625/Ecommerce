/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {selectLoggedInUser } from "../authSlice";

function Protected({children}) {
    const user = useSelector(selectLoggedInUser)

    // here !user is true and !googleUser is false then it's false and whon't redirect to login
    // here !user is true (user does not exists) and !googleUser is true then it's true and will be redirect to login 
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
}

export default Protected;