import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleP from "../components/VehicleP"
import ConfirmRide from "../components/ConfirmRide";
import Lookd from "../components/Lookd";
import WaitD from "../components/WaitD";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;


const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);

  const [searchType, setSearchType] = useState(null); // "pickup" or "destination"
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const panelRef = useRef(null);

  const panelCloseRef = useRef(null);

  const [vehiclePanel, setvehiclePanel] = useState(false);

  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [VehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);

  const vehiclePanelRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const watingForDriverRef = useRef(null);

  const [fares, setFares] = useState(null);
  const [fetchingFares, setFetchingFares] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // In Home.jsx
  const fetchFares = async () => {
    if (!pickup || !destination) {
      console.log("Pickup or destination missing");
      return;
    }
    setFetchingFares(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE}/rides/get-fares`,
        { pickup, destination },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFares(res.data);
    } catch (err) {
      setFares(null);
    }
    setFetchingFares(false);
  };

  function findTripClick() {
    setpanelOpen(false);
    setvehiclePanel(true);
    fetchFares(); // Fetch fares when opening vehicle panel
  }

  const submitHandler = (e) => {
    e.preventDefault();
  };


  // Fetch suggestions from backend
  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE}/maps/get-suggestions?input=${encodeURIComponent(input)}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuggestions(res.data.map((s) => s.description));
    } catch (err) {
      setSuggestions([]);
    }
    setLoadingSuggestions(false);
  };

  // Handle input changes
  const handleInputChange = (type, value) => {
    if (type === "pickup") setPickup(value);
    else setDestination(value);
    setSearchType(type);
    setpanelOpen(true);
    fetchSuggestions(value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (searchType === "pickup") setPickup(suggestion);
    else setDestination(suggestion);

    setSuggestions([]);
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
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

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(watingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(watingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
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
              onClick={() => {
                setpanelOpen(true);
                setSearchType("pickup");
                fetchSuggestions(pickup);
              }}
              value={pickup}
              onChange={(e) => handleInputChange("pickup", e.target.value)}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setpanelOpen(true);
                setSearchType("destination");
                fetchSuggestions(destination);
              }}
              value={destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTripClick}
            className="mt-2 w-full mx-auto block bg-black text-white py-2 px-8 rounded-lg text-base font-semibold hover:bg-gray-900 transition-colors duration-200"
          >
            Search
          </button>
        </div>
        <div ref={panelRef} className="bg-white">
          <LocationSearchPanel
            suggestions={suggestions}
            loading={loadingSuggestions}
            onSuggestionClick={handleSuggestionClick}
            setpanelOpen={setpanelOpen}
            setvehiclePanel={setvehiclePanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white py-10 px-3 pt-12"
      >
        <VehicleP
          setConfirmRidePanel={setConfirmRidePanel}
          setvehiclePanel={setvehiclePanel}
          fares={fares}
          fetchingFares={fetchingFares}
          setSelectedVehicle={setSelectedVehicle}
        />
      </div>

      <div
        ref={ConfirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white py-6 px-3 pt-12"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          selectedVehicle={selectedVehicle}
          fares={fares}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 bg-white py-6 px-3 pt-12"
      >
        <Lookd setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={watingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white py-6 px-3 pt-12"
      >
        <WaitD waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
