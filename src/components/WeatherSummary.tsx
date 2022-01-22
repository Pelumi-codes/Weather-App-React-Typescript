import React, { useEffect, useState } from "react";
import { WeatherEntry } from "./WeatherEntry";
import { Weather, Weather_, WeatherLocation } from "../interface/weather";
import {
  readForecast,
  readWeather,
  newForecast,
} from "../services/WeatherServiceInterface";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { getIconUrl } from "../services/WeatherServiceInterface";
import moment from "moment";
import WeatherChart from "./WeatherChart";

interface WeatherSummaryProps {
  location: WeatherLocation | null;
}

export const WeatherSummary: React.FC<WeatherSummaryProps> = ({ location }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);
  const [daysForecast, setDaysForecast] = useState<Weather_[] | null>(null);

  useEffect(() => {
    const callApi = async function (location: WeatherLocation) {
      const [weather, forecast, daysFore] = await Promise.all([
        readWeather(location.id),
        readForecast(location.id),
        newForecast(location.coord),
      ]);
      setWeather(weather);
      setForecast(forecast);
      setDaysForecast(daysFore);
    };
    if (location) {
      callApi(location);
    }
  }, [location]);

  if (!location || !weather || !forecast || !daysForecast) return null;

  return (
    <Box ml="12%" mt="-10%" mr="5%" w="100%">
      <Flex ml="10%" mb="1%">
        <WeatherChart daysForecast={daysForecast} />
      </Flex>
      <Text ml="10%" fontWeight="500" color="#ccc" fontSize="15px">
        Seven days Forecast graph (Temperature - X axis against Date - Y axis)
      </Text>

      <Text fontWeight="700" color="#ccc" fontSize="25px" mt="3%">
        {location.name} weather Result
      </Text>
      <Box bgColor="green.600" width="906px">
        <Text
          fontWeight="600"
          fontSize="xl"
          color="black"
          textAlign="center"
          mt="1px"
        >
          Current Weather Result
        </Text>
        <WeatherEntry weather={weather} />
      </Box>

      {/* <Flex ml="10%" mb="3%">
        <WeatherChart daysForecast={daysForecast} />
      </Flex> */}
      <Box>
        <Text fontWeight="700" color="#ccc" fontSize="20px" mt="2%" ml="1%">
          Seven days Table Forecast
        </Text>
      </Box>
      <Flex>
        {daysForecast.map((weather) => {
          let dateSeven = moment.unix(weather.dt).format("DD/MMMM");
          return (
            <Box
              key={weather.dt}
              bgColor="green.300"
              // pt="2%"
              ml="1"
              pl="2%"
              height="210px"
              w="60%"
            >
              <Box pt="5%">
                <Text fontSize="sm" fontWeight="600">
                  {dateSeven}
                </Text>
              </Box>
              <Box fontSize="sm" mt="6%">
                <Text fontSize="sm" fontWeight="600">
                  Temp: {weather.temp.day}°C
                </Text>
              </Box>
              <Box>
                <Image
                  src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="Weather"
                />
              </Box>
              <Text fontSize="sm" mx="3%" fontWeight="600">
                Humidity: {weather.humidity}%
              </Text>
              <Text fontSize="sm" mt="3%" mx="3%" fontWeight="600">
                Windspeed: {weather.wind_speed}km/h
              </Text>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
