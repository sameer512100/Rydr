import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainPath = () => {
  const [finishRidePanel, setfinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      y: finishRidePanel ? 0 : "100%",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [finishRidePanel]);

  return (
    <div className="h-screen flex flex-col">
      {/* Banner Image with Overlay */}
      <div className="relative h-4/5 w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber Animation"
        />

        {/* Logo and Exit Button Overlay */}
        <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between z-10">
          <img
            className="w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
            alt="Uber Logo"
          />
          <Link
            to="/captain-home"
            className="h-10 w-10 bg-black/50 flex items-center justify-center rounded-full hover:bg-black/70 transition"
          >
            <i className="text-white text-xl font-bold ri-logout-box-line"></i>
          </Link>
        </div>
      </div>

      {/* Captain Info Section */}
      <div
        className="h-1/5 p-6 bg-yellow-400 flex flex-col justify-between relative cursor-pointer"
        onClick={() => {
          setfinishRidePanel(true);
        }}
      >
        {/* Arrow */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <i className="text-3xl text-white ri-arrow-up-wide-line"></i>
        </div>

        {/* Distance and Button */}
        <div className="flex items-center justify-between mt-auto">
          <h5 className="text-xl font-semibold text-black">4 KM away</h5>
          <button className="w-1/2 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-all duration-200">
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-t-2xl shadow-2xl"
      >
        <FinishRide setfinishRidePanel={setfinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainPath;
