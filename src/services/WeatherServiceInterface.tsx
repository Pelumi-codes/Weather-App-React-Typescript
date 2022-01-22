import {
  Weather,
  Weather_,
  WeatherLocation,
  Coordinates,
} from "../interface/weather";

//key declaration
const key: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;
if (key === undefined) {
  throw new Error(
    "No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY"
  );
}

const keyQuery = `appid=${key}`;
const server = "https://api.openweathermap.org/data/2.5";

//Weather Location details
export async function searchLocation(
  term: string
): Promise<WeatherLocation | undefined> {
  const result = await fetch(`${server}/weather?q=${term}&${keyQuery}`);

  if (result.status === 404) return undefined;
  if (result.status !== 200) throw new Error("Failed to read location data");

  return await result.json();
}

//fetch current Weather Location details by Id
export async function readWeather(locationId: number): Promise<Weather> {
  const current = await fetch(
    `${server}/weather?id=${locationId}&${keyQuery}&units=metric`
  );

  if (current.status !== 200) throw new Error("Failed to read location data");

  return await current.json();
}

//fetch forcast Weather Location details by Id
export async function readForecast(locationId: number): Promise<Weather[]> {
  const forecast = await fetch(
    `${server}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=4`
  );
  if (forecast.status !== 200) throw new Error("Failed to read location data");

  return (await forecast.json()).list;
}

export async function newForecast(
  locationCoord: Coordinates
): Promise<Weather_[]> {
  const predict = await fetch(
    `${server}/onecall?lat=${locationCoord.lat}&lon=${locationCoord.lon}&exclude=hourly,current,minutely,alerts&${keyQuery}&units=metric`
  );

  if (predict.status !== 200) throw new Error("Failed to read location data");
  let res = await predict.json();
  console.log(res);
  return res.daily;
}

export function getIconUrl(code: string): string {
  return `https://openweathermap.org/img/wn/${code}.png`;
}
