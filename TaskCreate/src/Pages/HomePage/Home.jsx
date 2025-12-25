import React from 'react'
import SignUp from '../../components/LoginSignUp/SignUp'
import Login from '../../components/LoginSignUp/Login'

const Home = () => {
  return (
    <div className='h-full w-full bg-purple-500 text-white flex'>
      <SignUp/>
      <Login/>
    </div>
  )
}

export default Home
