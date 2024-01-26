/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate} from 'react-router-dom'

const ProtectedAdmin = ({children}) => {
    const user = useSelector(selectLoggedInUser)

    if(!user){
        return <Navigate to='/login' replace={true} />
    }else if(user.role !== 'admin'){
        return <Navigate to='/login' replace={true} />
    }
  return (
    <>
    {children}
    </>
  )
}

export default ProtectedAdmin
