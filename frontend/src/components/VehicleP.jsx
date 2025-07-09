import React from "react";

const VehicleP = (props) => {
  const {
    fares,
    fetchingFares,
    setConfirmRidePanel,
    setvehiclePanel,
    setSelectedVehicle,
  } = props;

  const handleVehicleClick = (vehicleType) => {
    setSelectedVehicle(vehicleType);
    setConfirmRidePanel(true);
  };

  return (
    <div>
      <h5
        onClick={() => {
          setvehiclePanel(false);
        }}
        className="p-1 text-center w-[92%] absolute top-0 cursor-pointer"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      {fetchingFares && <div>Loading fares...</div>}
      {!fetchingFares && fares && (
        <>
          <div
            onClick={() => handleVehicleClick("car")}
            className="flex border-2 hover:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer transition hover:shadow-lg"
          >
            <img
              className="h-12"
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt="UberGo"
            />
            <div className="w-1/2">
              <h4 className="font-medium text-base">
                UberGo{" "}
                <span>
                  <i className="ri-user-fill"></i>4
                </span>
              </h4>
              <h5 className="font-medium text-sm">2 mins away</h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable, compact rides
              </p>
            </div>
            <h2 className="text-lg font-semibold">
              ₹{fares.car?.toFixed(2) ?? "--"}
            </h2>
          </div>
          <div
            onClick={() => handleVehicleClick("motorcycle")}
            className="flex border-2 hover:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer transition hover:shadow-lg"
          >
            <img
              className="h-12"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              alt="Moto"
            />
            <div className="ml-2 w-1/2">
              <h4 className="font-medium text-base">
                Moto
                <span>
                  <i className="ri-user-fill"></i>1
                </span>
              </h4>
              <h5 className="font-medium text-sm">3 mins away</h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable motorcycle ride
              </p>
            </div>
            <h2 className="text-lg font-semibold">
              ₹{fares.motorcycle?.toFixed(2) ?? "--"}
            </h2>
          </div>
          <div
            onClick={() => handleVehicleClick("auto")}
            className="flex border-2 hover:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer transition hover:shadow-lg"
          >
            <img
              className="h-12"
              src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
              alt="UberAuto"
            />
            <div className="ml-2 w-1/2">
              <h4 className="font-medium text-base">
                UberAuto
                <span>
                  <i className="ri-user-fill"></i>3
                </span>
              </h4>
              <h5 className="font-medium text-sm">3 mins away</h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable Auto ride
              </p>
            </div>
            <h2 className="text-lg font-semibold">
              ₹{fares.auto?.toFixed(2) ?? "--"}
            </h2>
          </div>
        </>
      )}
      {!fetchingFares && !fares && <div>Enter locations to see fares.</div>}
    </div>
  );
};

export default VehicleP;
