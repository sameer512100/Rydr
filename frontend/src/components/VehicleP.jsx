import React from 'react'

const VehicleP = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
        props.setvehiclePanel(false)
        }} className='p-1 text-center w-[92%] absolute top-0'><i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
          <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹199.23</h2>
        </div>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Moto<span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable motorcycle ride</p>
          </div>
          <h2 className='text-lg font-semibold'>₹99.23</h2>
        </div>
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
          <img className='h-12' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberAuto<span><i className="ri-user-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable Auto ride</p>
          </div>
          <h2 className='text-lg font-semibold'>₹109.23</h2>
      </div>
    </div>
  )
}


export default VehicleP
