import React from "react";

const Lookd = ({
  setVehicleFound,
  pickup,
  destination,
  fare,
  paymentType = "Cash",
}) => {
  return (
    <div>
      <h5
        onClick={() => {
          setVehicleFound(false);
        }}
        className="p-1 text-center w-[92%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className="flex gap-2 flex-col justify-between items-center">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg  ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {pickup || "Pickup location"}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg  ri-map-pin-3-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                {destination || "Destination"}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                ₹{fare !== undefined ? fare.toFixed(2) : "--"}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">{paymentType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lookd;
