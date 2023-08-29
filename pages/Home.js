import CDRAnalysis from '../components/CDRAnalysis'
import IPDRAnalysis from '../components/IPDRAnalysis'
import DUMPAnalysis from '../components/DUMPAnalysis'
import Location from '../components/Location'
import Header from '../components/Header'
import React, { useContext, useEffect, useState } from 'react'
import SocialAnalyzer from '../components/SocialAnalyzer'
import UPIFinder from '../components/UPIFinder'
import Vehicle from '../components/Vehicle'
import CourtCheck from '../components/CourtCheck'
import { motion } from 'framer-motion'
import Fastag from '../components/Fastag'
import GPRSCDRAnalysis from '../components/GPRSCDRAnalysis'
import SDRAnalysis from '../components/SDRAnalysis'
import GasConnection from '../components/GasConnection'
import TimeConvertor from '../components/TimeConvertor'
import IMEIInfo from '../components/IMEIInfo'
import CellIDTracker from '../components/CellIDTracker'
import CyberSecurityUpdates from '../components/CyberSecurityUpdates'
import Link from 'next/link'
import DomainTrace from '../components/Domain'
import FaceDetection from '../components/FaceDetection'
import ImageForensics from '../components/ImageForensics'
import CyberThreat from '../components/CyberThreat'
import YoutubeDelete from '../components/YoutubeDelete'
import UrlUnshorten from '../components/UrlUnshorten'
import Head from 'next/head'
import { DataContext } from '@/store/GlobalState'
import { FiLogOut } from 'react-icons/fi'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

export default function Home() {

  const [showModal, setShowModal] = useState(false);




  const { state = {}, dispatch } = useContext(DataContext)
  const { auth = {} } = state
  const [userName, setUserName] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (auth && auth.user && auth.user.userName) {
      setUserName(auth.user.userName);
    }

    // Set isApproved based on auth.user.approved
    if (auth && auth.user && auth.user.approved) {
      setIsApproved(true);
    }

    console.log(userName, "this is my user ", auth.user);
  }, [auth]);

 

  const handleLogout = () => {
    Cookie.remove('refreshtoken', { path: '/api/auth/refreshToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    router.push('/')
  }
  const handleLogoutClick = () => {
    setShowModal(false);
    handleLogout();
  };
  const modalclose = () => {
    setShowModal(false);

  };

  const handleCloseClick = () => {
    setShowModal(true);
  };

  const [userIp, setUserIp] = useState('');

  useEffect(() => {
    async function fetchIp() {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setUserIp(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    }

    fetchIp();
  }, []);
  

  return (
    <>
    {auth.user && auth.user.approved ? ( // Check if user is approved

    <div className="justify-center min-h-screen overflow-hidden  ">
      <Head>
        <title>Home - Garuda</title>
      </Head>
      <div className='grid md:grid-cols-3 grid-cols-2 justify-evenly gap-16 '>

        <div className='flex space-x-4'>
          <Link href='/'>
            <img src='/logo.png' className='md:h-32  h-20   ' />
          </Link>
          <div className='my-auto hidden md:block'>
            <h1 className='my-auto font-mono text-[#FDD923] uppercase font-bold'>User:<span className='text-[#FDD923]'> {userName}</span></h1>
            <h1 className='my-auto font-mono text-[#BDFF00]  font-bold'>ip: {userIp}</h1>
          </div>
        </div>
        <div className='-ml-24 md:ml-0'>
          <Header />
        </div>
        <div className='text-white  hidden md:flex md:ml-64 cursor-pointer font-bold font-mono md:text-lg md:space-x-4 hover:text-red-500 my-auto'>
          <h1 className=''>Logout</h1>
          <FiLogOut onClick={handleCloseClick} className='my-auto  md:text-4xl cursor-pointer ' />
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white w-80 rounded-lg shadow-lg">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Logout</h2>
                <p className="text-gray-700">
                  Are you sure you want to logout {userName} ?
                </p>
              </div>
              <div className="p-4 space-x-24 bg-gray-100 rounded-b-lg">
                <button
                  className=" hover:text-blue-600 text-black font-bold py-2 px-4 rounded"
                  onClick={modalclose}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     
      <div className='grid  grid-cols-4 lg:grid-cols-4 mt-8 md:pl-10  lg:pl-24 mx-2 md:mx-0    gap-2  '>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}>
          <CDRAnalysis />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <IPDRAnalysis />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <DUMPAnalysis />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <GPRSCDRAnalysis />
        </motion.div>

      </div>
    
      <div className='lg:flex mt-8  lg:mx-0 justify-evenly'>
        <div className='grid grid-cols-3 md:grid-cols-3 mx-4 md:mx-0 lg:mx-0  lg:grid-cols-1 mt-10 lg:mt-4 md:pl-12 lg:pl-0  gap-4    '>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 3.2, ease: 'easeInOut' }}>
            <DomainTrace />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 3.8, ease: 'easeInOut' }}>
            <ImageForensics />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 4.2, ease: 'easeInOut' }}>
            <FaceDetection />
          </motion.div>

        </div>
        <div className='grid lg:grid-cols-1 grid-cols-3 md:pl-12 mx-4 md:mx-0 lg:mx-0  gap-4 lg:mt-4 mt-10  '>
          <Link href='/IMEInfo'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 4.6, ease: 'easeInOut' }}>
              <IMEIInfo />
            </motion.div>
          </Link>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 5.0, ease: 'easeInOut' }}>
            <CellIDTracker />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 5.6, ease: 'easeInOut' }}>
            <CyberSecurityUpdates />
          </motion.div>

        </div>
        <div className='grid grid-cols-2 lg:grid-cols-3 ml-12  lg:ml-0 md:pl-12    lg:gap-10 gap-6 lg:mt-4 mt-10  '>
          <Link href='/SocialAnalyzer'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.01, ease: 'easeInOut' }}>
              <SocialAnalyzer />
            </motion.div>
          </Link>
          <Link href='/Location'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}>
              <Location />
            </motion.div>
          </Link>
          <Link href='/UPIFinder'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}>
              <UPIFinder />
            </motion.div>
          </Link>
          <Link href='/VehicleSearch'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 2.1, ease: 'easeInOut' }}>
              <Vehicle />
            </motion.div>
          </Link>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}>
            <CourtCheck />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}>
            <Fastag />
          </motion.div>
        </div>

        <div className='grid grid-cols-3 lg:grid-cols-1 mx-4 md:mx-0 lg:mx-0 mt-10 lg:mt-4  md:pl-12  gap-4    '>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 3.2, ease: 'easeInOut' }}>
            <SDRAnalysis />
          </motion.div>

          <Link href='/TimeConvertor'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 3.8, ease: 'easeInOut' }}>
              <TimeConvertor />
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 4.2, ease: 'easeInOut' }}>
            <GasConnection />
          </motion.div>

        </div>
        <div className='grid grid-cols-3 lg:grid-cols-1 mx-4 md:mx-0 lg:mx-0 mt-10 lg:mt-4 md:pl-12   gap-4    '>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 3.2, ease: 'easeInOut' }}>
            <CyberThreat />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 3.8, ease: 'easeInOut' }}>
            <YoutubeDelete />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 4.2, ease: 'easeInOut' }}>
            <UrlUnshorten />
          </motion.div>

        </div>
        
      </div>
      
      <div className='text-center mt-16 hidden md:block lg:text-xl font-mono'>
        <h1 className='text-white'>© Garuda Intelligence Software - A3M NextGen Pvt.Ltd</h1>
      </div>
      {/* */}
    </div>
    ) : (
      <>
      <div className="justify-center min-h-screen overflow-hidden  ">
      <Head>
        <title>Home - Garuda</title>
      </Head>
      <div className='grid md:grid-cols-3 grid-cols-2 justify-evenly gap-16 '>

        <div className='flex space-x-4'>
          <Link href='/'>
            <img src='/logo.png' className='md:h-32  h-20   ' />
          </Link>
          <div className='my-auto hidden md:block'>
            <h1 className='my-auto font-mono text-[#FDD923] uppercase font-bold'>User:<span className='text-[#FDD923]'> {userName}</span></h1>
            <h1 className='my-auto font-mono text-[#BDFF00]  font-bold'>ip: {userIp}</h1>
          </div>
        </div>
        <div className='-ml-24 md:ml-0'>
          <Header />
        </div>
        <div className='text-white  hidden md:flex md:ml-64 cursor-pointer font-bold font-mono md:text-lg md:space-x-4 hover:text-red-500 my-auto'>
          <h1 className=''>Logout</h1>
          <FiLogOut onClick={handleCloseClick} className='my-auto  md:text-4xl cursor-pointer ' />
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white w-80 rounded-lg shadow-lg">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Logout</h2>
                <p className="text-gray-700">
                  Are you sure you want to logout {userName} ?
                </p>
              </div>
              <div className="p-4 space-x-24 bg-gray-100 rounded-b-lg">
                <button
                  className=" hover:text-blue-600 text-black font-bold py-2 px-4 rounded"
                  onClick={modalclose}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     </div>
     
          <div className="flex items-center mt-[-250%]  md:mt-[-45%] justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                Access Denied!
              </h2>
              <p className="text-white -700">
                Your account has not been approved for access.
              </p>
              <button
                className="bg-blue-500 md:hidden block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          </>
        )}
      </>
  )
}
