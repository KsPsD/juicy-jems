import { Box } from "@mui/material";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as ProfileIcon } from "./assets/profile.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as ProfileTooltip } from "./assets/profile_tooltip.svg";
import { useEffect, useRef, useState } from "react";

const Profile = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Click Outside Handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        console.log("hello"); // Action to be performed on outside click
        setShowTooltip(false); // Optionally hide the tooltip
      }
    }

    // Adding click event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Removing click event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef]);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <ProfileIcon
        style={{
          width: "36px",
          height: "36px",
          cursor: "pointer",
        }}
        onMouseDown={(event) => {
          event.stopPropagation();
          setShowTooltip(!showTooltip);
        }}
      />
      {showTooltip && (
        <Box
          ref={tooltipRef}
          sx={{
            position: "absolute",
            top: "0px",
            // right: "-27px",
            right: "0px",

            transform: "translateY(36px)",
          }}
        >
          <ProfileTooltip />
        </Box>
      )}
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
      <Profile />
    </Box>
  );
};

export default Header;
