// Invest.tsx
import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Modal, Box, Button } from "@mui/material";
import { useAccount } from "wagmi";
import { getInvestItems ,localStorageUtil} from "./utils/localStorage";
import { ReactComponent as Progress100 } from "./assets/progress_bar_100.svg";
import { ReactComponent as Progress91 } from "./assets/progress_bar_91_100.svg";
import { ReactComponent as Progress71 } from "./assets/progress_bar_71_90.svg";
import { ReactComponent as Progress50 } from "./assets/progress_bar_50_70.svg";
import { ReactComponent as TwoArrows } from "./assets/two_arrows.svg";
import DepositWithdrawService from './DepositWithdrawService';

export interface InvestItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  now: number;
  goal: number;

}
interface InvestProps {
  userBalance: number;
  setBalance: (balance: number) => void;
}

enum GameTabType {
  MMORPG = "MMORPG",
  RTS = "RTS",
  FPS = "FPS",
}

const service = new DepositWithdrawService();

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

const ProgressBar = (props: { percentage: number }) => {
  const { percentage } = props;
  const style = {
    // width: "218px",
    height: "18px",
  };
  if (percentage >= 100) {
    return <Progress100 style={style} />;
  } else if (percentage >= 91) {
    return <Progress91 style={style} />;
  } else if (percentage >= 71) {
    return <Progress71 style={style} />;
  } else {
    return <Progress50 style={style} />;
  }
};

const ExchangeItem = (props: { nftName: string; value: number }) => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "240px",
        height: "120px",
        padding: "17px",
        justifyContent: "space-between",
        alignItems: "center",

        borderRadius: "14px",
        border: "1px dashed #646464",
        background: "#353535",
      }}
    >
      <Box
        sx={{
          color: "#FFF",
          fontFamily: "Poppins",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 300,
          lineHeight: "normal",
        }}
      >
        {props.nftName}
      </Box>
      <Box
        sx={{
          color: "#FFF",
          textAlign: "center",

          fontFamily: "Azo Sans",
          fontSize: "40px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "normal",
          letterSpacing: "-0.28px",
        }}
      >
        {props.value}
      </Box>
    </Box>
  );
};

const Invest: React.FC<InvestProps> = ({userBalance,setBalance}) => {
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
    service.depositTransaction(4).then((result) => {
      setBalance(userBalance + 40);
     let prevItem = JSON.parse(localStorageUtil.get('investItems'))[1]
      console.log(prevItem)
      localStorageUtil.editInvestItems({ id: 2,
        title: 'game 1',
        description: 'Description of game 1',
        imageUrl: 'https://picsum.photos/200/300?random=1',
        now: userBalance + 40,
        goal: 600})
      setOpen(false);

    }).catch((error) => {
      console.error('Error:', error);
    });
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
        {Items.map((item, index) => {
          const percentage = (item.now / item.goal) * 100;
          return (
            <Grid item xs={4} gap={"25px"} key={item.id}>
              {item.now>= item.goal && <img  src='/sold_out.svg' style={{position:"relative" , zIndex:2 ,top:"40%", left:"12%"}}></img>}
              <Paper 
                elevation={3}
                sx={{
                  width: "360px",
                  padding: "22px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "16px",
                  boxSizing: "border-box",
                  backgroundColor: "#333",
                  filter: item.now>= item.goal? "blur(3px) grayscale(1)": "blur(0)",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    height: "170px",
                    borderRadius: "14px",
                    marginBottom: "14px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <Box
                    sx={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    {item.title}
                  </Box>
                  <Box
                    sx={{
                      color: "white",
                      textAlign: "right",
                      fontFamily: "Poppins",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 300,
                      lineHeight: "normal",
                    }}
                  >
                    {`${Math.round(percentage)}%`}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <ProgressBar percentage={percentage} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(item)}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "86px",
                      height: "23px",
                      borderRadius: "14px",
                      backgroundColor: "#FBFF3D",
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",

                      color: "#333",
                      textAlign: "center",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                    }}
                  >
                    FUND
                  </Button>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            width: "672px",
            height: "314px",
            padding: "46px 39px 52px 39px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",

            borderRadius: "20px",
            border: "1px solid var(--gray0, #FFF)",
            background: "#333",
            boxShadow: "0px 0px 60px 0px #333",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <ExchangeItem nftName={"NPT"} value={10} />
            <TwoArrows />
            <ExchangeItem nftName={"stNPT"} value={40} />
          </Box>
          <Button
            sx={{
              width: "272px",
              height: "49px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              background: "#FBFF3D",
              boxShadow: "0px 4.348px 8.696px 0px rgba(0, 0, 0, 0.25)",

              color: "#333",
              textAlign: "center",
              fontFamily: "Poppins",
              fontSize: "30px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "150%",

              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            FUND GAME
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Invest;
