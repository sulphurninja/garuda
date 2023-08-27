import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DataContext } from '@/store/GlobalState';
import Cookie from 'js-cookie'
import { postData } from '@/utils/fetchData';

export default function Login() {
  const initialState = { userName: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { userName, password } = userData
  const { state = {}, dispatch } = useContext(DataContext)
  const { auth = {} } = state
  const router = useRouter()


  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await postData('auth/login', userData)

    if (res.error) {
      // If there is an error, do nothing and let the user try again
      return
    }

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user
      }
    })

    Cookie.set('refreshtoken', res.refresh_token, {
      path: '/api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', 'true')
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      
        router.push('/Home');
      
    }
  }, [auth, router]);
 
  return (
    <div className="flex justify-center items-center h-screen">
    <Head>
      <title>Login - Garuda</title>
    </Head>
      <div className=" p-8 bg-gray-100 rounded-lg shadow ">
        <div className='grid grid-cols-3'>
        <div></div>
        <div>
        <img src='logo.png' className='md:h-36 ' />
        </div>
        </div>
        <h1 className="md:text-2xl text-sm text-center  font-mono font-bold uppercase mb-4">Garuda Intelligence Console</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={userName}
              name='userName'
              onChange={handleChangeInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              name='password'
              onChange={handleChangeInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-[#00A79D]  text-white p-2 rounded-md">Login</button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <button onClick={() => router.push('/Register')} className="text-[#00A79D]">Register</button>
        </div>
      </div>
    </div>
  );
}
