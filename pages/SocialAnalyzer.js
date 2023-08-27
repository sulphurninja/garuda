import Link from 'next/link'
import React from 'react'
import Header from '../components/Header'
import UserNameAnalysis from '../components/UserNameAnalysis'
import { motion } from 'framer-motion'
import MobileNumberAnalysis from '../components/MobileNumberAnalysis'
import Head from 'next/head'

export default function SocialAnalyzer() {
  return (
    <div className="justify-center min-h-screen overflow-hidden  ">
      <Head>
        <title>Social Analyzer - Garuda</title>
      </Head>

      <div className='flex   justify-evenly space-x-16 md:space-x-44  '>
        <Link href='/Home'>
          <div
            className=" py-2 h-10 mt-12 bg-white px-2 rounded-2xl text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.0} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </div>
        </Link>
        <Header />
        <div className=''>
          <Link href='/'>
            <img src='/logo.png' className='md:h-32  h-20   ' />
          </Link>
        </div>

      </div>

      <div className=' justify-evenly flex'>

        <Link href='http://109.106.255.65:9797'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}>
            <UserNameAnalysis />
          </motion.div>
        </Link>
        <Link href='/Mobile'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}>
            <MobileNumberAnalysis />
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
