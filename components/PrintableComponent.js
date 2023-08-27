import React from 'react';

class PrintableComponent extends React.Component {
  render() {
    const { result } = this.props;
    const { verificationResults } = this.props;

    return (
      <div className=' bg-black mt-4 md:mt-0 printable-content space-y-6   rounded-xl border-2 border-white text-white font-mono    '>

        <div className='flex'>

          <img src='/logo.png' className='garuda md:h-12  h-12  flex' />

          <h1 className='mx-2 headd pt-2 namee '>Garuda Analysis Report for {result.data[0].phones[0].e164Format}</h1>
        </div>
        {/* Display name */}
        <p className='text-center namee pt-2 font-bold md:text-2xl font-mono'>{result.data[0].name}</p>

        {/* Display image if available */}
        {result.data[0].image && (
          <img
            src={result.data[0].image}
            className='profile md:w-44 w-24 ml-32 mt-4 rounded-xl border-2 border-white'
            alt="User's profile"
          />
        )}
        {/* {profilePictureURL && (
          <img
            src={profilePictureURL}
            className='profile md:w-44 w-24 ml-32 mt-4 rounded-xl border-2 border-white'
            alt="User's profile"
          />
        )} */}
        {/* Display internetAddresses */}

        <ul className='mt-4 inter  text-sm md:text-lg mx-4'>
          {result.data[0].internetAddresses.map((address) => (
            <li className='font-bold' key={address.id}><span className='uppercase'>{address.service}</span>: {address.id}</li>
          ))}
        </ul>

        {/* Display carrier */}
        <p className=' carrier font-bold mx-4'><span className='underline  font-bold'>Carrier</span>: {result.data[0].phones[0].carrier}</p>
        <p className='phoneno font-bold mx-4' ><span className='underline  font-bold'>Phone No:</span>: {result.data[0].phones[0].e164Format}</p>
        <ul className='address  mx-4'>
          {result.data[0].addresses.map((addresses) => (
            <li className='font-bold' key={addresses.id}><span className=' underline  font-bold'>Address</span>: {addresses.address}</li>
          ))}
        </ul>
        <div>
        <h1 className='mx-4 font-mono font-bold underline'>UPI Handles</h1>

          {verificationResults.map((result, index) => (
            <div className='font-bold font-mono mx-4 py-2 gap-y-8 meow  text-white rounded-2xl px-4' key={index}>
              {result.result && result.result.account_exists === 'YES' && (
                <div className=''>
                  <p>UPI: {result.result.vpa}</p>
                  <p>Name at Bank: {result.result.name_at_bank}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default PrintableComponent