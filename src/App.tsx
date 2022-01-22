import React, { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import "./App.css";
import { LocationSearch } from "./components/LocationFind";
import { LocationTable } from "./components/LocationTable";
import { WeatherLocation, Weather_ } from "./interface/weather";
import { searchLocation } from "./services/WeatherServiceInterface";
import { ErrorAlert, WarningAlert } from "./components/Alert";
import { WeatherSummary } from "./components/WeatherSummary";
import WeatherChart from "./components/WeatherChart";

const App: React.FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<WeatherLocation | null>(null);

  const resetAlerts = () => {
    setError("");
    setWarning("");
  };

  let addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(` There is no location found called '${term}'`);
    } else if (locations.find((item) => item.id === location.id)) {
      setWarning(` Location '${term}' is already in the search history.`);
    } else {
      console.log(location);
      setLocations([location, ...locations]);
    }
  };

  return (
    <Box
      bgColor="green.700"
      borderRadius="5px"
      pt="1%"
      minH="820px"
      overflow="auto"
      className="no-scroll-bar"
    >
      <Text
        fontFamily="Arial"
        fontWeight="800"
        color="white"
        fontSize="30px"
        textAlign="left"
        mb="2%"
        textShadow="2px 2px 2px #cccccc"
        py="1%"
        borderRadius="5px"
        w="80%"
        ml="5%"
      >
        Weather Forecast App
      </Text>

      <LocationSearch onSearch={addLocation} />
      <ErrorAlert message={error} />
      <WarningAlert message={warning} />
      <Flex justifyContent="space-between">
        <LocationTable
          locations={locations}
          current={currentLocation}
          onSelect={(location) => setCurrentLocation(location)}
        />

        <WeatherSummary location={currentLocation} />
      </Flex>
    </Box>
  );
};

export default App;
