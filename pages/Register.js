import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DataContext } from '@/store/GlobalState';
import {postData} from '@/utils/fetchData';
import Link from 'next/link';

export default function Register() {
  const initialState = { userName: '', password: '', name: '', email: '' }
  const [userData, setUserData] = useState(initialState)
  const { userName, password, name, email } = userData
  const { state, dispatch } = useContext(DataContext)
  const { auth = {} } = state
  const router = useRouter();
  
  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const res = await postData('/auth/register', userData)
    console.log(res)
    router.push('/registration-pending')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Head>
        <title>Register - Garuda</title>
      </Head>
      <div className=" p-8 bg-gray-100 rounded-lg shadow ">
        <div className='grid grid-cols-3'>
          <div></div>
          <div>
            <img src='logo.png' className='md:h-36 ' />
          </div>
        </div>
        <h1 className="md:text-2xl text-sm text-center  font-mono font-bold uppercase mb-4">Garuda Intelligence Console</h1>
        <h2 className='font-mono text-center font-thin'>REGISTER</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              name='userName'
              onChange={handleChangeInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              name='name'
              value={name}
              onChange={handleChangeInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              name='email'
              value={email}
              onChange={handleChangeInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              name='password'
              onChange={handleChangeInput}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-[#00A79D] text-white p-2 rounded-md">Register</button>
          <Link href='/'>
          <p className='text-center mt-4'>Existing User? <span className='text-[#00A79D] '>Login Here</span></p>
          </Link>
        </form>
      </div>
    </div>
  );
}
