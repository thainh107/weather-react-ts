import React, { FC, useState } from "react";
import "./App.css";
import { LocationSearch } from "./components/LocationSearch";
import { WeatherLocation, Weather } from "./model/Weather";
import { searchLocation, getWeatherList } from "./services/WeatherService";
import { ErrorAlert } from "./components/Alerts";
import { WeatherSummary } from "./components/WeatherSummary";
import { WeatherEntry } from "./components/WeatherEntry";

const App: FC = () => {
  const [error, setError] = useState("");
  const [
    currentLocation,
    setCurrentLocation,
  ] = useState<WeatherLocation | null>(null);

  const [weatherList, setWeatherList] = useState<Weather | null>(null);
  const [maxTemp, setMaxTemp] = useState<number>(0);
  const [maxIcon, setMaxIcon] = useState<string>("");

  const resetAlerts = () => {
    setError("");
  };

  const addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(`No location found called '${term}'`);
    } else {
      setCurrentLocation(location);
      const weatherList = await getWeatherList(location.coord);
      setWeatherList(weatherList);
    }
  };

  function onSelectMaxTemp(maxTemp: number, icon: string) {
    if (maxTemp > 0) setMaxTemp(maxTemp);
    if (icon) setMaxIcon(icon);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <LocationSearch onSearch={addLocation} />
        <ErrorAlert message={error} />
        {currentLocation ? (
          <div className="wrapperResult">
            <WeatherEntry
              weatherLocation={currentLocation}
              newTemp={maxTemp}
              newIcon={maxIcon}
            />
            <WeatherSummary
              weatherList={weatherList}
              selectMaxTemp={onSelectMaxTemp}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
