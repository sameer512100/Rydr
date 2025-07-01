import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePop from "../components/RidePop";
import ConfirmPop from "../components/ConfirmPop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmPopupPanelRef = useRef(null);

  // Slide RidePop
  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.4,
    });
  }, [ridePopupPanel]);

  // Slide ConfirmPop
  useGSAP(() => {
    gsap.to(confirmPopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.4,
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      {/* Top Navbar */}
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-bold ri-logout-box-line"></i>
        </Link>
      </div>

      {/* Banner Image */}
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber Animation"
        />
      </div>

      {/* Captain Info */}
      <div className="h-2/5 p-6 bg-white rounded-t-3xl shadow-lg">
        <CaptainDetails />
      </div>

      {/* RidePop Panel */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 -translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePop
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      {/* ConfirmPop Panel */}
      <div
        ref={confirmPopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 -translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmPop
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
