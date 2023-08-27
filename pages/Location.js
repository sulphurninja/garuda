import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import shortenURL from './api/shorten';
import Coordinates from '../components/Coordinates';
import Head from 'next/head';

export default function Location() {
  const [originalURL, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedURL] = useState('');
  const [suspects, setSuspects] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/get-suspects');
        const data = await response.json();
        if (response.ok) {
          setSuspects(data.data);
        } else {
          console.error('Failed to fetch suspects');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogPosts();
  }, []);


  const handleSubmit = async () => {
    event.preventDefault();
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalURL }),
      });

      const data = await response.json();
      console.log('Shortened URL:', data);
      // Do something with the shortened URL response, e.g., update state, display it on the page

      setShortenedURL(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log(shortenedUrl, "WOWOWOWOWOW")

  return (
    <div className="justify-center min-h-screen overflow-hidden  ">
      <Head>
        <title>Location - Garuda</title>
      </Head>

      <div className='flex   justify-evenly space-x-8 md:space-x-44  '>
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

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className='mt-12 flex justify-evenly text-center'
      >


        {/* <img src='/rto.png' className='h-full w-full md:block hidden rounded-3xl' /> */}
        <form className='mt-4 space-x-5' onSubmit={handleSubmit}>
          <h1 className='text-white  text-sm font-mono font-bold '>Copy the following link into the shortner: <br></br>
            https://garudacdr.vercel.app/Attack</h1>
          <input
            type="text"
            value={originalURL}
            onChange={(e) => setOriginalUrl(e.target.value)}

            className='bg-white py-2 px-4 text-black font-mono border-4 border-green-400  rounded-xl  '
          />
          <button className='bg-blue-400 font-bold font-mono hover:bg-blue-700 text-white  mt-4 py-2  rounded-xl  md:p-4  px-4' type="submit">Submit</button>
        </form>
        <div className='bg-blue-400 w-64 h-64 overflow-hidden  text-center text-white rounded-2xl '>
        <div className='overflow-y-scroll '>
          <h1 className='text-white text-2xl'>Suspects:</h1>

          {suspects.map((suspect) => (
            <div className='text-black  bg-white'>
              <ul>
                <li className='border-b-2 border-black'> {suspect.timestamp} <br></br><span className='text-green-500'> Latitude:     {suspect.latitude} Longitude: {suspect.longitude}</span></li>


              </ul>
            </div>
          ))}
          </div>
        </div>
        {shortenedUrl && (
          <div className='absolute text-white   leading-10  font-mono font-bold md:text-2xl text-sm'>
            {shortenedUrl.error ? (
              <p className='text-red-600 font-bold animate-pulse'>⚠️ Error Occurred!!!</p>
            ) : (
              <div className='text-sm grid text-white  grid-cols-2 gap-x-4'>
                {shortenedUrl.result_url}
              </div>
            )}
          </div>
        )}

      </motion.div>




    </div>
  );
}


