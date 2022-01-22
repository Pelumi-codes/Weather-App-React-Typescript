import React, { useState } from "react";
import { WeatherLocation } from "../interface/weather";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";

interface LocationTableProps {
  locations: WeatherLocation[];
  current: WeatherLocation | null;
  onSelect: (location: WeatherLocation) => void;
}

export const LocationTable: React.FC<LocationTableProps> = ({
  locations,
  onSelect,
  current,
}) => (
  <Box width="30%" ml="3%">
    <Text
      textAlign="left"
      fontFamily="sans-serif"
      fontWeight="600"
      color="green.400"
      fontSize="30px"
      my="4%"
      py="1%"
      //   bgColor="green.600"
      letterSpacing="wider"
      borderRadius="25px"
    >
      Locations
    </Text>
    <Table w="310px">
      <Thead>
        <Tr>
          <Th
            fontWeight="600"
            color="#ccc"
            fontSize="15px"
            fontFamily="heading"
          >
            Your Search Shows here
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {locations.map((location) => (
          <Tr key={location.id} onClick={() => onSelect(location)}>
            <Td fontWeight="600" color="#ccc" fontSize="15px" cursor="pointer">
              <Flex>
                <Text fontWeight="800" mr="2%">
                  Click: {""}
                </Text>
                {location.name}
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);
