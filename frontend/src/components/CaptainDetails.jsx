import React,{useContext} from 'react'
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        {/* Profile Section */}
        <div className="flex items-center gap-4 ">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="https://www.vhv.rs/dpng/f/10-101667_person-icon-png.png"
            alt="Captain"
          />
          <div>
            <h4 className="text-lg font-semibold">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
          </div>
        </div>

        {/* Earnings */}
        <div className="text-right">
          <h4 className="text-2xl font-bold text-green-600">₹99.69</h4>
          <p className="text-sm text-gray-600">Today's Earnings</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid p-3 grid-cols-3 gap-4 bg-stone-100">
        <div className="text-center">
          <i className="text-2xl ri-timer-line text-blue-500"></i>
          <h5 className="text-lg font-semibold">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-2xl ri-speed-up-fill text-purple-500"></i>
          <h5 className="text-lg font-semibold">4.8</h5>
          <p className="text-sm text-gray-600">Avg Speed Rating</p>
        </div>

        <div className="text-center">
          <i className="text-2xl ri-check-line text-orange-500"></i>
          <h5 className="text-lg font-semibold">16</h5>
          <p className="text-sm text-gray-600">Rides Completed</p>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails