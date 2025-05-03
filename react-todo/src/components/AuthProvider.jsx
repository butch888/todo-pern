import { createContext, useState } from "react"

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null)

  const signIn = (newUser, cb) => {
    setUser(newUser.user_name)
    setUserId(newUser.user_id)
    cb()
  }
  const signOut = () => {
    setUser(null)
    setUserId(null)
    localStorage.removeItem('user')
    localStorage.removeItem('user_id')
    window.location.reload()
  }

  const value = {user, userId, signIn, signOut}
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
