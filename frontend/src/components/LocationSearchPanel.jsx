import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "24A, near Kapoor's cafe",
    "24B, near sameer's cafe",
    "24C, near ok's cafe",
    "24D, near hm's cafe",
  ];

  return (
    <div>
      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setvehiclePanel(true);
              props.setpanelOpen(false);
            }}
            className="flex gap-4  border-2 p-3 border-gray-50 active:border-black rounded-xl  items-center justify-start my-2"
          >
            <h2 className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill text-xl"></i>
            </h2>
            <h4 className="text-lg font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
