import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactToPrint from 'react-to-print'; // Import ReactToPrint
import PrintableContent from '../components/PrintableComponent'


export default function Mobile() {
  const [phone, setPhone] = useState('');
  const [verificationResults, setVerificationResults] = useState(null); // Initialize with null
  const [result, setResult] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [email, setEmail] = useState('');
  const printableComponentRef = useRef(); // Create a ref for the printable component




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/mobile?phone=${phone}`);
      handleVerify();
      setTimeout(setResult(response.data), 3000
      )

    } catch (error) {
      console.error(error);
      setResult({ error: 'An error occurred while fetching data from the API' });
    }
  };

  console.log(phone);


  function generateApiEndpoints(phone) {
    const phoneProviders = ['paytm', 'axl', 'ybl', 'okaxis', 'okicici'];
    return phoneProviders.map(provider => `${phone}@${provider}`);
  }

  const handleVerify = async () => {
    try {
      const apiEndpoints = generateApiEndpoints(phone);
      const verificationResults = await Promise.all(
        apiEndpoints.map(async endpoint => {
          try {
            const response = await axios.post(`/api/upifind?vpa=${endpoint}`);
            return response.data;
          } catch (error) {
            console.error(error);
            return { error: `Error with ${endpoint}` };
          }
        })
      );
      console.log(verificationResults);
      setVerificationResults(verificationResults);
      // Do something with the verification results
    } catch (error) {
      console.error(error);
    }
  };

  console.log(result);


  useEffect(() => {
    // Assuming you have the 'result' containing the user data, and it also has 'result.data[0].internetAddresses'
    if (result && result.data && result.data[0].internetAddresses) {
      // Find the internet address with service type 'email'
      const emailInternetAddress = result.data[0].internetAddresses.find(
        (address) => address.service === 'email'
      );

      if (emailInternetAddress) {
        setEmail(emailInternetAddress.id);
      }
    }
  }, [result]);



  return (
    <div className="justify-center min-w-screen  ">
      <div className='flex  justify-evenly space-x-16 md:space-x-44  '>
        <Link href='/SocialAnalyzer'>
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
      <div className='md:flex justify-evenly '>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className=''
        >
          <form onSubmit={handleSubmit} className='justify-evenly  space-x-4 flex md:ml-18 mx-16 mt-20'>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Mobile Number"
              className='bg-white  text-black font-mono border-4 border-gray-400 rounded-xl px-2 py-2 '
            />
            <button className='bg-white -400  font-bold font-mono hover:bg-green-200 -700 text-black   px-4 rounded-xl ' type="submit">Submit</button>
           
          </form>

        </motion.div>

  

        {/* {verificationResults?.map((result, index) => (
          <div className='text-white' key={index}>
            {result.result && result.result.account_exists === 'YES' && (
              <div>
                <p>VPA: {result.result.vpa}</p>
                <p>Name at Bank: {result.result.name_at_bank}</p>
              </div>
            )}
          </div>
        ))} */}

        {/* TO be exported as a pdf */}
        {result && result.status && (
          
          <div className='flex space-x-4'>
          <div className=' justify-center mt-4'>
              <ReactToPrint
                trigger={() => <button className='bg-red-400 mt-16 font-bold font-mono py-2 hover:bg-green-700 text-white px-6 rounded-xl'>Export as PDF</button>}
                content={() => printableComponentRef.current} // Use the current property of the ref
              />
            </div>
            <PrintableContent result={result} verificationResults={verificationResults} ref={printableComponentRef} />
           
          </div>
        )}
      </div>

      <div>

      </div>

      {/* Updated Export as PDF button */}
      {/* Print button */}


    </div>
  );
}



