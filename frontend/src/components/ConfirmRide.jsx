import React from "react";

const ConfirmRide = (props) => {
  const {
    setConfirmRidePanel,
    setVehicleFound,
    pickup,
    destination,
    selectedVehicle,
    fares,
    createRide, // Function to handle ride creation
  } = props;

  // Fallbacks if data is missing
  const pickupDisplay = pickup || "Pickup location";
  const destinationDisplay = destination || "Destination";
  const fareAmount =
    fares && selectedVehicle && fares[selectedVehicle]
      ? fares[selectedVehicle].toFixed(2)
      : "--";

  const handleConfirm = () => {
    // Call createRide with the selected vehicle type
    createRide(selectedVehicle);
    setVehicleFound(true);
    setConfirmRidePanel(false);
  };

  return (
    <div>
      <h5
        onClick={() => {
          setConfirmRidePanel(false);
        }}
        className="p-1 text-center w-[92%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Confirm your ride</h3>

      <div className="flex gap-2 flex-col justify-between items-center">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt="Vehicle"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{pickupDisplay}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {/* Optionally show more pickup details here */}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-3-line"></i>
            <div>
              <h3 className="text-lg font-medium">{destinationDisplay}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {/* Optionally show more destination details here */}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{fareAmount}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleConfirm}
          className="w-full mt-5 bg-green-600 rounded-lg text-white font-semibold p-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
