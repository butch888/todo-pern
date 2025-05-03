import React from 'react'
import Title from './Title'
import { Outlet } from 'react-router-dom'
import { AppContainer } from '../AppStyled'
import useAuth from './useAuth'

const Layout = () => {

  const {signOut} = useAuth()
  
  const handleLogOut = () => {
    signOut()
    window.location.reload()
  }

  const user = localStorage.getItem('user')

  return (
    <AppContainer>
      {user && <button onClick={handleLogOut}>Sign out</button>}
      <Title user={user}/>
      <Outlet />
    </AppContainer>
  )
}

export default Layout
