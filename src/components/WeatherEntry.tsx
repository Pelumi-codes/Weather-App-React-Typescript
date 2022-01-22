import React from "react";
import { Weather } from "../interface/weather";
import { getIconUrl } from "../services/WeatherServiceInterface";
import { convertUnixTimeToDate } from "../services/TimeUtilis";
import { Box, Text, Image, Flex } from "@chakra-ui/react";

interface WeatherEntryProps {
  weather: Weather;
}

export const WeatherEntry: React.FC<WeatherEntryProps> = ({ weather }) => {
  return (
    <Flex bgColor="green.300" w="100%">
      <Box mr="5%" ml="5%">
        <Text fontWeight="700">Time & Date</Text>
        <Text fontSize="sm">
          {convertUnixTimeToDate(weather.dt).toLocaleTimeString()}
          <Text>{new Date().toLocaleDateString()}</Text>
        </Text>
      </Box>
      <Box mx="3%">
        <Text fontWeight="700">Temperature</Text>
        <Text fontSize="sm">{weather.main.temp}°C</Text>
        <Image
          src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt="Weather"
        />
      </Box>
      <Box mx="5%">
        <Text fontWeight="700">Humidity</Text>
        <Text fontSize="sm">{weather.main.humidity}%</Text>
      </Box>
      <Box mx="3%">
        <Text fontWeight="700">Wind Speed </Text>
        <Text fontSize="sm">{weather.wind.speed}km/h</Text>
      </Box>

      <Box ml="3%">
        <Text fontWeight="700">Weather condition</Text>

        {weather.weather.map((condition) => (
          <Box key={condition.id}>
            <Flex>
              <Image
                src={getIconUrl(condition.icon)}
                alt={condition.main}
                height="50px"
              />
              <Text fontSize="md" mt="5%">
                {condition.description}
              </Text>
            </Flex>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};
