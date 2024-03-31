import WalletConnect from "./walletConnect";

import { Box } from "@mui/material";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <WalletConnect />
    </Box>
  );
};
