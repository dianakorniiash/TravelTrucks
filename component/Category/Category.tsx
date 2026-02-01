"use client";

import AC from "@/public/AC.svg";
import Alcove from "@/public/Alcove.svg";
import Automatick from "@/public/Automatic.svg";
import Bathroom from "@/public/Bathroom.svg";
import Fully from "@/public/Fully.svg";
import Gas from "@/public/hugeicons_gas-stove.svg";
import Water from "@/public/ion_water-outline.svg";
import Kitchen from "@/public/Kitchen.svg";
import microwave from "@/public/lucide_microwave.svg";
import refrigerator from "@/public/solar_fridge-outline.svg";
import TV from "@/public/TV.svg";
import radio from "@/public/ui-radios.svg";
import Van from "@/public/Van.svg";
import { useTrucksStore } from "@/store/campers";
import Image from "next/image";
import { useState } from "react";
import "./Category.css";

export default function Filters() {
  const setFilters = useTrucksStore((s) => s.setFilters);

  const [localFilters, setLocalFilters] = useState({
    location: "",


    AC: false,
    automatic: false,
    kitchen: false,
    TV: false,
    bathroom: false,
    water: false,
    gas: false,
    radio: false,
    refrigerator: false,
    microwave: false,


    form: "" as "" | "panelTruck" | "fullyIntegrated" | "alcove",
  });

  const toggle = (key: keyof typeof localFilters) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const apply = () => {
  const filters: Record<string, string | boolean> = {};

  if (localFilters.location) filters.location = localFilters.location;

  // equipment
  Object.entries(localFilters).forEach(([key, value]) => {
    if (typeof value === "boolean" && value === true) filters[key] = true;
  });


  if (localFilters.form) filters.form = localFilters.form;

  setFilters(filters);
};


  return (
    <div className="wrapper">
      <div className="block">
        <p className="label">Location</p>

        <input
          className="location"
          placeholder="Ukraine, Kyiv"
          value={localFilters.location}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, location: e.target.value })
          }
        />
      </div>

      <div className="block">
        <h4 className="title">Filters</h4>

        <p className="sub">Vehicle equipment</p>
        <div className="line-category"></div>
        <div className="grid">

          <button
            className={`checkbox ${localFilters.AC ? "active" : ""}`}
            onClick={() => toggle("AC")}
          >
            <Image src={AC} className="iconcategoryPanel" alt="AC" width={20} height={20} />
            AC
          </button>

          <button
            className={`checkbox ${localFilters.automatic ? "active" : ""}`}
            onClick={() => toggle("automatic")}
          >
            <Image src={Automatick} className="iconcategoryPanel" alt="AC" width={20} height={20} />
            Automatic
          </button>

          <button
            className={`checkbox ${localFilters.kitchen ? "active" : ""}`}
            onClick={() => toggle("kitchen")}
          >
            <Image src={Kitchen} className="iconcategoryPanel" alt="Kitchen" width={20} height={20} />
            Kitchen
          </button>

          <button
            className={`checkbox ${localFilters.TV ? "active" : ""}`}
            onClick={() => toggle("TV")}
          >
            <Image src={TV} className="iconcategoryPanel" alt="TV" width={20} height={20} />
            TV
          </button>

          <button
            className={`checkbox ${localFilters.bathroom ? "active" : ""}`}
            onClick={() => toggle("bathroom")}
          >
            <Image src={Bathroom} className="iconcategoryPanel" alt="Bathroom" width={20} height={20} />
            Bathroom
          </button>

          <button
            className={`checkbox ${localFilters.water ? "active" : ""}`}
            onClick={() => toggle("water")}
          >
            <Image src={Water} className="iconcategoryPanel" alt="Water" width={20} height={20} />
            Water
          </button>
          <button
            className={`checkbox ${localFilters.gas ? "active" : ""}`}
            onClick={() => toggle("gas")}
          >
            <Image src={Gas} className="iconcategoryPanel" alt="Gas" width={20} height={20} />
            Gas
          </button>

          <button
            className={`checkbox ${localFilters.radio ? "active" : ""}`}
            onClick={() => toggle("radio")}
          >
            <Image src={radio} className="iconcategoryPanel" alt="Radio" width={20} height={20} />
            Radio
          </button>

          <button
            className={`checkbox ${localFilters.microwave ? "active" : ""}`}
            onClick={() => toggle("microwave")}
          >
            <Image src={microwave} className="iconcategoryPanel" alt="Radio" width={20} height={20} />
            Microwave
          </button>

          <button
            className={`checkbox ${localFilters.refrigerator ? "active" : ""}`}
            onClick={() => toggle("refrigerator")}
          >
            <Image src={refrigerator} className="iconcategoryPanel" alt="Radio" width={20} height={20} />
            Refrigerator
          </button>

        </div>

        <p className="sub">Vehicle type</p>
          <div className="line-category"></div>
        <div className="grid">
          <button
  className={`checkbox ${localFilters.form === "panelTruck" ? "active" : ""}`}
  onClick={() => setLocalFilters(prev => ({
    ...prev,
    form: prev.form === "panelTruck" ? "" : "panelTruck"
  }))}>
  <Image src={Van} className="iconcategoryPanel" alt="panel Truck" width={20} height={20} />
  panel Truck
</button>

<button
  className={`checkbox ${localFilters.form === "fullyIntegrated" ? "active" : ""}`}
  onClick={() => setLocalFilters(prev => ({
    ...prev,
    form: prev.form === "fullyIntegrated" ? "" : "fullyIntegrated"
  }))}>
  <Image src={Fully} className="iconcategoryPanel" alt="Fully Integrated" width={20} height={20} />
  Fully Integrated
</button>

<button
  className={`checkbox ${localFilters.form === "alcove" ? "active" : ""}`}
  onClick={() => setLocalFilters(prev => ({
    ...prev,
    form: prev.form === "alcove" ? "" : "alcove"
  }))}>
  <Image src={Alcove} className="iconcategoryPanel" alt="Alcove" width={20} height={20} />
  Alcove
</button>
        </div>
      </div>

      <button className="apply" onClick={apply}>
        Search
      </button>
    </div>
  );
}
