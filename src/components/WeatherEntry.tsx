import React, { FC, useEffect, useState } from "react";
import { WeatherLocation } from "../model/Weather";
import { getIconUrl } from "../services/WeatherService";
import {
  convertDaysOfWeekWithTime,
  degToCompass,
  speedConverter,
  temperatureConverter,
} from "../services/Utilities";
import { getAirQuality } from "../services/WeatherService";
import "./WeatherEntry.css";

interface WeatherEntryProps {
  weatherLocation: WeatherLocation | null;
  newTemp: number | 0;
  newIcon: string | "";
}

export const WeatherEntry: FC<WeatherEntryProps> = ({
  weatherLocation,
  newTemp,
  newIcon,
}) => {
  const [airQuality, setAirQuality] = useState<string>("");
  const [unit, setUnit] = useState<string>("C");
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [date, setDate] = useState<number>(0);
  const [icon, setIcon] = useState<string>("");
  const [newTemperature, setNewTemperature] = useState<number>(0);
  const [newMaxIcon, setNewMaxIcon] = useState<string>("");

  useEffect(() => {
    (async function () {
      if (weatherLocation) {
        setNewTemperature(newTemp);
        setNewMaxIcon(newIcon);

        setWindSpeed(weatherLocation.wind.speed);
        setTemperature(weatherLocation.main.temp);
        setIcon(weatherLocation.weather[0].icon);
        setDate(weatherLocation.dt)

        const latitude = weatherLocation.coord.lat;
        const longitude = weatherLocation.coord.lon;
        const airQualityString = await getAirQuality(latitude, longitude);
        setAirQuality(airQualityString || "");
      }
    })();
  }, [weatherLocation, newTemp, newIcon]);

  function changeUnits() {
    setWindSpeed(speedConverter(windSpeed, unit));
    setTemperature(temperatureConverter(temperature, unit));
    setUnit(unit === "C" ? "F" : "C");
  }

  if (!weatherLocation) return null;

  if (newTemperature > 0 && newMaxIcon) {
    setTemperature(newTemp);
    setIcon(newIcon);

    setNewMaxIcon("");
    setNewTemperature(0);

  }

  return (
    <div className="containerEntry">
      <div className="nameLocationEntry">
        <span>
          {weatherLocation.name}, {weatherLocation.sys.country}
        </span>
        <div className="currentTimeWeather">
          {convertDaysOfWeekWithTime(date, true)} •{" "}
          {weatherLocation.weather[0].main}
        </div>
      </div>
      <div className="wrapperEntry" onClick={changeUnits}>
        <div className="wrapperEntryItem entryLeft">
          <div className="tempWeatherIcon">
            <img
              className="iconWeather"
              src={getIconUrl(icon)}
              alt={weatherLocation.weather[0].main}
            />
            <div className="wrapperTemp">
              <span className="tempText">
                {temperature.toFixed(unit === "C" ? 0 : 2)}°
              </span>
              <div className="tempCharacterWrapper">
                <span>{unit}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapperEntryItem">
          <div className="containerDetails">
            <div className="detailsText">
              Humidity: {weatherLocation.main.humidity}%
            </div>
            <div className="detailsText">
              Wind: {windSpeed.toFixed(2)}{" "}
              {degToCompass(weatherLocation.wind.deg)}
            </div>
            <div className="detailsText">Air Quality: {airQuality}</div>
          </div>
        </div>
      </div>

      {/* {weather.weather.map(condition =>
      <div key={condition.id}>
        <img src={getIconUrl(condition.icon)} alt={condition.main}/> {condition.main} {condition.description}
      </div>)
    } */}
    </div>
  );
};
