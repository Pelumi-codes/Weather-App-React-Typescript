import React, { useEffect, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";
import { Box, Text } from "@chakra-ui/react";
import { WeatherSummary } from "./WeatherSummary";
import { Weather_ } from "../interface/weather";
import moment from "moment";

type Props = {
  daysForecast: Weather_[];
};

const WeatherChart: React.FC<Props> = ({ daysForecast }) => {
  const data = daysForecast.map((d) => {
    return { x: moment.unix(d.dt).format("DD/MMMM"), y: d.temp.day };
  });

  useEffect(() => {}, [daysForecast]);
  return (
    <Box
      height="256px"
      width="645px"
      color="green.200"
      bgColor="white"
      alignItems="right"
      px="5%"
    >
      <Text color="black" position="absolute" top="10%">
        Y-axis
      </Text>
      <Text color="black" position="absolute" top="37%" right="20%">
        X-axis
      </Text>
      <VictoryChart width={1000} height={400}>
        <VictoryLine
          data={data}
          style={{ data: { stroke: "green", strokeWidth: "2" } }}
        />
      </VictoryChart>
    </Box>
  );
};

export default WeatherChart;
