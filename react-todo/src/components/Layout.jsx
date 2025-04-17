import React from 'react'
import Title from './Title'
import { Outlet } from 'react-router-dom'
import { AppContainer } from '../AppStyled'

const Layout = () => {
  return (
    <AppContainer>
      <Title />
      <Outlet />
    </AppContainer>
  )
}

export default Layout
