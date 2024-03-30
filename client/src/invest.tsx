// Invest.tsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Modal,
  Box,
  LinearProgress,
  Button,
} from "@mui/material";
import { LinearProgressProps } from "@mui/material/LinearProgress";
import { useAccount } from "wagmi";
import { getInvestItems } from "./utils/localStorage";

export interface InvestItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  now: number;
  goal: number;
}

enum GameTabType {
  MMORPG = "MMORPG",
  RTS = "RTS",
  FPS = "FPS",
}

const GameTab = (props: { selectedTab: GameTabType }) => {
  const { selectedTab } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "32px",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "45px",
        }}
      >
        {[GameTabType.MMORPG, GameTabType.RTS, GameTabType.FPS].map((tab) => {
          const selected = tab === selectedTab;
          const style = selected
            ? {
                color: "#FBFF3D",
                fontFamily: "Azo Sans",
                fontSize: "28px",
                fontStyle: "italic",
                fontWeight: 700,
                lineHeight: "normal",
              }
            : {
                color: "#66666D",
                fontFamily: "Azo Sans",
                fontSize: "28px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "normal",
                letterSpacing: "-0.28px",
              };
          return (
            <Box>
              <Box sx={style}>{tab}</Box>
              {selected && (
                <Box
                  sx={{
                    position: "relative",
                    height: "4px",
                    backgroundColor: "#FBFF3D",
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          height: "1px",
          backgroundColor: "#646464",
          transform: "translateY(-2px)",
        }}
      />
    </Box>
  );
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Invest: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InvestItem | null>(null);

  const { isConnected, address } = useAccount();
  const Items = getInvestItems();

  useEffect(() => {
    console.log(isConnected, address);
  }, [isConnected, address]);

  const handleOpen = (item: (typeof Items)[0]) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        margin: "0 auto",
        maxWidth: "1130px",
      }}
    >
      <GameTab selectedTab={GameTabType.MMORPG} />
      <Grid container spacing={2}>
        {Items.map((item, index) => (
          <Grid item xs={4} gap={"25px"} key={item.id}>
            <Paper
              elevation={3}
              sx={{
                padding: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "2em",
                borderRadius: "16px",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: "50%", alignSelf: "center" }}
              />
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body1">{item.description}</Typography>
              <LinearProgressWithLabel value={(item.now / item.goal) * 100} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen(item)}
                sx={{
                  marginLeft: "auto",
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                }}
              >
                Fund
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {selectedItem?.title}
          </Typography>
          <Typography variant="body1">{selectedItem?.description}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Invest;
