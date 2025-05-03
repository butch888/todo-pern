import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "./useAuth"

export default function PrivateRoute() {

  const location = useLocation()
  
  let {user, userId} = useAuth()

  if(user) {
    localStorage.setItem('user', user)
    localStorage.setItem('user_id', userId)
  } else {
      user = localStorage.getItem('user')
  }

  return (
    user ? <Outlet/> : <Navigate to='/auth' state={{from: location}}/>
  )
}
