import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleP from "../components/vehicleP";
import ConfirmRide from "../components/ConfirmRide";
import Lookd from '../components/Lookd'

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);

  const panelRef = useRef(null);

  const panelCloseRef = useRef(null);

  const [vehiclePanel, setvehiclePanel] = useState(false);

  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [VehicleFound, setVehicleFound] = useState(false)

  const vehiclePanelRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (VehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [VehicleFound]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );



  useGSAP(
    function () {
      if (ConfirmRidePanel) {
        gsap.to(ConfirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ConfirmRidePanel]
  );



  return (
    
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"
        alt=""
      />

      <div
        onClick={() => {
          setvehiclePanel(false);
        }}
        className="h-screen w-screen"
      >
        {/*image for temporary use*/}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setpanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => setpanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setpanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white  h-0 ">
          <LocationSearchPanel
            setpanelOpen={setpanelOpen}
            setvehiclePanel={setvehiclePanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed  w-full z-10 bottom-0 translate-y-full bg-white py-10 px-3 pt-12"
      >
        <VehicleP
          setConfirmRidePanel={setConfirmRidePanel}
          setvehiclePanel={setvehiclePanel}
        />
      </div>

      <div
        ref={ConfirmRidePanelRef}
        className="fixed  w-full z-10 bottom-0 translate-y-full bg-white py-6 px-3 pt-12"
      >
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed  w-full z-10 bottom-0 translate-y-full bg-white py-6 px-3 pt-12"
      >
        <Lookd/>
      </div>
    </div>
  );
};

export default Home;
