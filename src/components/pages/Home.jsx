import React from 'react'
import QRCodeReader from '../QRCodeReader';
import MoistureSteaming from '../MoistureSteaming';
import InterfaceData from '../InterfaceData';


const Home = () => {
  return (
        <>
            <div className='bg-gray-300 font-custom'>
                <div className='container mx-auto px-4 bg-white'>
                    <div className='grid grid-cols-1 gap-1 m-1'>
                        <p className='text-center text-3xl font-bold'>Moisture Real time</p>
                    </div>
                    
                    <div className=''>
                        <QRCodeReader/>
                    </div>

                    <div className='mt-2'>
                        < MoistureSteaming/>
                    </div>
                    <div className=' justify-center'>
                        < InterfaceData/>
                    </div>

                </div>
            </div>
        </>
  )
}

export default Home
