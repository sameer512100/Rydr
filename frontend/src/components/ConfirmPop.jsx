import React,{useState} from "react";
import {Link} from 'react-router-dom'

const ConfirmPop = (props) => {

  const [otp, setotp] = useState('')

  const submitHandler = (e)=>{
    e.preventDefault()

  }
  return (
    <div>
      {/* Slide Down Button */}
      <h5
        onClick={() => {
          props.setConfirmRidePopupPanel(false); // Close the popup
        }}
        className="p-1 text-center w-[92%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to start
      </h3>

      <div className="flex items-center justify-between mt-4 bg-yellow-200 p-3 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://imgv3.fotor.com/images/gallery/3D-male-character-portrait-made-by-Fotor-AI-face-generator.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">Joseph</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg  ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya Talab, Ahmedabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg  ri-map-pin-3-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya Talab, Ahmedabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹119.69</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <form></form>
        {/* Confirm Ride */}
        <div className="mt-6 w-full">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
            value={otp}
            onChange={(e)=>{
              setotp(e.target.value)
            }}
              type="text"
              className="bg-[#eee] px-6 py-4 text-lg font-mono rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />
            <Link
              to="/captain-path"
              className="w-full mt-5 bg-green-600 rounded-lg text-white font-semibold p-2 flex justify-center"
            >
              Confirm
            </Link>

            {/* Reject Ride */}
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
              }}
              className="w-full mt-1 bg-red-600 rounded-lg text-white font-semibold p-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPop;
