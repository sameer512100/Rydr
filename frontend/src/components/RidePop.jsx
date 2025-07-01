import React from "react";

const RidePop = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
        className="p-1 text-center w-[92%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

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

        <div className="flex mt-6 w-full gap-4">
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="w-1/2 bg-gray-100 text-gray-800 font-semibold py-3 rounded-xl border hover:bg-gray-200 transition-all duration-200"
          >
            Reject
          </button>
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
              props.setConfirmRidePopupPanel(true);
            }}
            className="w-1/2 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-all duration-200"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePop;
