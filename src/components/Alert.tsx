import React from "react";
import { Box } from "@chakra-ui/react";
interface AlertProps {
  message: string;
}

export function alertComponent(): React.FC<AlertProps> {
  return ({ message }) =>
    message ? (
      <Box
        color="red.800"
        ml="5%"
        // textShadow="1px 1px red"
        fontWeight="600"
        fontSize="2xl"
        fontFamily="monospace"
      >
        {message}
      </Box>
    ) : null;
}

export const ErrorAlert = alertComponent();
export const WarningAlert = alertComponent();
