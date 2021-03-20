import { Weather, WeatherLocation, Coordinates } from "../model/Weather";

const key: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;
if (key === undefined) {
  throw new Error(
    "No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY"
  );
}

const keyQuery = `appid=${key}`;
const server = "http://api.openweathermap.org/data/2.5";

export async function searchLocation(
  term: string
): Promise<WeatherLocation | undefined> {
  const result = await fetch(
    `${server}/weather?q=${term}&${keyQuery}&units=metric&limit=5`
  );

  if (result.status === 404) return undefined;
  if (result.status !== 200) throw new Error("Failed to read location data");

  return await result.json();
}

export async function getWeatherList(coord: Coordinates): Promise<Weather> {
  const list = await fetch(
    `${server}/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,minutely&${keyQuery}&units=metric`
  );

  if (list.status !== 200) throw new Error("Failed to read location data");

  return await list.json();
}

// export async function readWeather(locationId: number): Promise<Weather> {
//   const current = await fetch(`${server}/weather?id=${locationId}&${keyQuery}&units=metric`);

//   if (current.status !== 200) throw new Error('Failed to read location data');

//   return await current.json();
// }

// export async function readForecast(locationId: number): Promise<Weather[]> {
//   const forecast = await fetch(`${server}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=8`);

//   if (forecast.status !== 200) throw new Error('Failed to read location data');

//   return (await forecast.json()).list;
// }

export function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}.png`;
}

export async function getAirQuality(
  latitude: number,
  longitude: number
): Promise<string> {
  const airQuality = await fetch(
    `${server}/air_pollution/forecast?lat=${latitude}&lon=${longitude}&${keyQuery}`
  );

  if (airQuality.status !== 200)
    throw new Error("Failed to read location data");

  const listResult = (await airQuality.json()).list[0];
  const aqi = listResult.main.aqi;
  let result = "";
  switch (aqi) {
    case 1:
      result = "Good";
      break;
    case 2:
      result = "Fair";
      break;
    case 3:
      result = "Moderate"
      break;
    case 4:
      result = "Poor";
      break;

    default:
      result = "Very Poor";
      break;
  }

  return result;
}
