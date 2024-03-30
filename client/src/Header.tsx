import { Box } from "@mui/material";
import React from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as Profile } from "./assets/profile.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Tooltip = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        right: "-27px",

        transform: "translateY(74px)",
      }}
    >
      test
    </Box>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const selectedPageStyle = {
    color: "#FFF",
    fontFamily: "Azo Sans",
    fontSize: "20px",
    fontStyle: "italic",
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: "-0.28px",
    textDecorationLine: "underline",
    cursor: "pointer",
  };
  const normalPageStyle = {
    color: "#FFF",
    fontFamily: "Azo Sans",
    fontSize: "20px",
    fontStyle: "italic",
    fontWeight: 300,
    lineHeight: "normal",
    letterSpacing: "-0.28px",
    cursor: "pointer",
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "76px",
        paddingRight: "50px",
        boxSizing: "border-box",

        width: "100%",
        height: "80px",
        backgroundColor: "#0F0F12;",
      }}
    >
      <Logo
        style={{
          width: "118px",
          height: "26px",
          cursor: "pointer",
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "58px",

          color: "white",
        }}
      >
        <Box
          sx={path === "/invest" ? selectedPageStyle : normalPageStyle}
          onClick={() => navigate("/invest")}
        >
          Game Invest
        </Box>
        <Box
          sx={path === "/shopping" ? selectedPageStyle : normalPageStyle}
          onClick={() => navigate("/shopping")}
        >
          Random Box
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Profile
          style={{
            width: "36px",
            height: "36px",
            cursor: "pointer",
          }}
        />
        <Tooltip />
      </Box>
    </Box>
  );
};

export default Header;
