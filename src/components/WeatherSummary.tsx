import React, { FC } from "react";
import { WeatherDetails } from "./WeatherDetails";
import { Weather } from "../model/Weather";
import "./WeatherSummary.css";

interface WeatherSummaryProps {
  weatherList: Weather | null;
  selectMaxTemp: (temp: number, icon: string) => void;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ weatherList, selectMaxTemp }) => {
  function onSelectMaxTemp(maxTemp: number, icon: string) {
    selectMaxTemp(maxTemp, icon);
  };
  if (!weatherList) return null;

  return (
    <div className="wrapperDetails">
      {weatherList.daily.map((item) => (
        <WeatherDetails key={item.dt} detail={item} onSelectTemp={onSelectMaxTemp} />
      ))}
    </div>
  );
};
