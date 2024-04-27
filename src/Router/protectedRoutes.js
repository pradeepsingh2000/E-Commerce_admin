import { Navigate, Outlet } from 'react-router-dom'
import { selectedLoggerInUser } from '../Redux/Auth/authSlice';
import { useSelector } from 'react-redux';
const PrivateRoutes = () => {
  const user = useSelector(selectedLoggerInUser);
console.log(user.token,'the user');
return (
    user.token !==null ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;
