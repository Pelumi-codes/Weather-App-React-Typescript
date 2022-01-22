import React, { useState } from "react";
import { Box, Input, Button, Flex } from "@chakra-ui/react";

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch }) => {
  const [locationSearch, setLocationSearch] = useState("");
  const disableSearch = locationSearch.trim() === "";

  //function to add searched location to table list
  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch("");
  };

  return (
    <Box width="60%">
      <Flex mx="auto">
        <Input
          ml="3%"
          type="text"
          width="50%"
          color="green.400"
          fontSize="18px"
          value={locationSearch}
          border="1px dashed black"
          placeholder="Search location...."
          outlineColor="black"
          _hover={{ border: "1px dashed black" }}
          onChange={(e) => setLocationSearch(e.target.value)}
        />
      </Flex>
      {/* <Button></Button> */}
      <Button
        className="btn btn-primary"
        onClick={addLocation}
        disabled={disableSearch}
        bgColor="#FFF"
        w="9%"
        ml="22%"
        py="1%"
        mt="18px"
        border="5px"
        color="#fff.800"
        fontSize="sm"
      >
        Search
      </Button>
    </Box>
  );
};

export default LocationSearch;
