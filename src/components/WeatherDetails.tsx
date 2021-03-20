import React, { FC } from "react";
import { getIconUrl } from "../services/WeatherService";
import { WeatherDetail } from "../model/Weather";
import "./WeatherDetails.css";
import { convertDaysOfWeekWithTime } from "../services/Utilities";

interface WeatherDetailsProps {
  detail: WeatherDetail | null;
  onSelectTemp: (temp: number, icon: string, dt: number) => void;
}

export const WeatherDetails: FC<WeatherDetailsProps> = (
  { detail, onSelectTemp }
) => {
  if (!detail) return null;

  function selectWeather() {
    if (detail) {
      onSelectTemp(detail.temp.max, detail.weather[0].icon, detail.dt);
    }
  }
  return (
    <div className="containerDetail" onClick={selectWeather}>
      <div>{convertDaysOfWeekWithTime(detail.dt, false)}</div>
      <div>
        <img
          className="iconWeatherDetail"
          src={getIconUrl(detail.weather[0].icon)}
          alt={detail.weather[0].main}
        />
      </div>
      <div className="tempMax">{detail.temp.max.toFixed(0)}°</div>
      <div className="tempMin">{detail.temp.min.toFixed(0)}°</div>
    </div>
  );
};
