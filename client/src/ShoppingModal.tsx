import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { Grid, Divider, Typography } from "@mui/material";
import { ReactComponent as GameIcon } from "./assets/game.svg";
import { ReactComponent as DrawListIcon } from "./assets/ic_draw_list.svg";
import { ReactComponent as PriceIcon } from "./assets/ic_price.svg";

interface ShoppingModalProps {
  open: boolean;
  onClose: () => void;
}

const ItemProbability = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      <Box>갑옷</Box>
      <Box>10%</Box>
    </Box>
  );
};

const ItemProbabilities = () => {
  return (
    <Box>
      <h3>뽑기 List</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: "1px solid black",
        }}
      >
        {[1, 2, 3, 4].map((_, index) => (
          <ItemProbability key={`item-probability-${index}`} />
        ))}
      </Box>
    </Box>
  );
};

const Prices = () => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <h3>Prices</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          gap: "5px",
        }}
      >
        <Box
          sx={{
            padding: 1,
            border: "1px solid black",
          }}
        >
          USDT 3
        </Box>
        <Box
          sx={{
            padding: 1,
            border: "1px solid black",
          }}
        >
          stNLT 3
        </Box>
      </Box>
    </Box>
  );
};

const ProbabilityDetail = (props: { onClose: () => void }) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        <ItemProbabilities />
        <Prices />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Button onClick={props.onClose}>확인</Button>
      </Box>
    </div>
  );
};

interface GameInfo {
  id: number;
  title: string;
  itmes: {
    name: string;
    probability: number;
  }[];
  USDT: number;
  stNPT: number;
}

const GameList = (props: {
  selectedGame: GameInfo | undefined;
  setSelectedGame: (gameInfo: GameInfo) => void;
}) => {
  const { selectedGame, setSelectedGame } = props;
  const gameInfos: GameInfo[] = [
    {
      id: 0,
      title: "Dungeon & Fighter",
      itmes: [
        { name: "+12 강화권", probability: 10 },
        { name: "에픽 무기", probability: 20 },
        { name: "레어 아바타", probability: 30 },
      ],
      USDT: 3,
      stNPT: 5,
    },
    {
      id: 1,
      title: "Cyphers",
      itmes: [
        { name: "멋진 캐릭터 스킨", probability: 10 },
        { name: "파워 건틀릿", probability: 20 },
        { name: "귀금속", probability: 30 },
      ],
      USDT: 2,
      stNPT: 4,
    },
    {
      id: 3,
      title: "DNF Duel",
      itmes: [
        { name: "슈퍼아머", probability: 10 },
        { name: "슈퍼방장", probability: 20 },
        { name: "레벨업", probability: 30 },
      ],
      USDT: 5,
      stNPT: 10,
    },
  ];
  return (
    <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {gameInfos.map((game, index) => {
        const gameId = game.id;
        return (
          <Box
            sx={{
              display: "inline-flex",
              padding: "12px 24px",
              maxHeight: "30px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor:
                selectedGame?.id === gameId ? "#0C0D11" : "#333333CC",
              color:
                selectedGame?.id === gameId ? "#FBFF3D" : "var(--gray0, #FFF)",
              fontFamily: "Poppins",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "300",
              lineHeight: "normal",
              borderRadius: "10px",
              border: "1px solid var(--gray6, #646464)",
            }}
            onClick={() => props.setSelectedGame(game)}
          >
            {game.title}
          </Box>
        );
      })}
    </Box>
  );
};

type Currency = "USDT" | "stNPT";

const ShoppingModalBody = (props: { onClose: () => void }) => {
  const [selectedGame, setSelectedGame] = React.useState<GameInfo | undefined>(
    undefined
  );

  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency>("stNPT");
  return (
    <Box
      sx={{
        position: "absolute",
        width: "900px",
        top: "50%",
        left: "50%",
        display: "flex",
        flexDirection: "column",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: "20px",
        border: "1px solid var(--gray0, #FFF)",
        background: "rgba(51, 51, 51, 0.80)",
        backdropFilter: "blur(30px)",
        flexShrink: "0",
        justifyContent: "center",

        padding: "35px 45px",
      }}
    >
      <Divider
        sx={{ background: "var(--gray6, #646464)", marginBottom: "15px" }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
          marginBottom: "32px",
        }}
      >
        <GameIcon />
        <h2
          style={{
            color: "var(--gray0, #FFF)",
            fontFamily: "Poppins",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "normal",
          }}
        >
          Game List
        </h2>
      </Box>
      <GameList selectedGame={selectedGame} setSelectedGame={setSelectedGame} />
      {selectedGame && <ProbabilityDetail onClose={props.onClose} /> && (
        <>
          <Divider
            sx={{
              background: "var(--gray6, #646464)",
              marginTop: "26px",
              marginBottom: "21px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: "12px",
            }}
          >
            <Box sx={{ display: "flex", gap: "16px", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <DrawListIcon />
                <h2
                  style={{
                    color: "var(--gray0, #FFF)",
                    fontFamily: "Poppins",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}
                >
                  Draw List
                </h2>
              </Box>
              <Box
                sx={{
                  width: "436px",
                  height: "192px",
                  backgroundColor: "#333333CC",
                  alignContent: "center",
                  gap: "10px",
                  borderRadius: " 20px",
                  border: "1px solid var(--gray6, #646464)",
                  background: "var(--gray7, #353535)",
                  alignSelf: "center",
                }}
              >
                {selectedGame.itmes.map((item, index) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        minWidth: "100px",
                        padding: "12px 24px",
                        maxHeight: "30px",
                        alignItems: "center",
                        backgroundColor: "#333333CC",
                        color: "#FFF",
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "300",
                        lineHeight: "normal",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography style={{ margin: "0 28px" }}>
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "20px",
                          fontStyle: "normal",
                          fontWeight: "300",
                          lineHeight: "normal",
                        }}
                      >
                        {`${item.probability}%`}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Divider
              sx={{ background: "var(--gray6, #646464)" }}
              orientation="vertical"
            />
            <Box sx={{ display: "flex", gap: "16px", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <PriceIcon />
                <h2
                  style={{
                    color: "var(--gray0, #FFF)",
                    fontFamily: "Poppins",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}
                >
                  Price
                </h2>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "436px",
                  height: "192px",
                  backgroundColor: "#333333CC",
                  alignContent: "center",
                  borderRadius: " 20px",
                  border: "1px solid var(--gray6, #646464)",
                  background: "var(--gray7, #353535)",
                  justifyContent: "center",
                  gap: "23px",
                }}
              >
                {["USDT", "stNPT"].map((currency, index) => {
                  const selected = selectedCurrency === currency;
                  return (
                    <Box
                      sx={{
                        width: "180px",
                        height: "121px",
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        borderRadius: "14px",
                        border: selected
                          ? "1px solid var(--gray0, #FFF)"
                          : "1px dashed var(--gray6, #646464)",
                        background: "var(--gray7, #353535)",
                        backgroundColor: selected ? "#0C0D11" : "#333333CC",
                        color: selected ? "#FBFF3D" : "var(--gray0, #FFF)",
                      }}
                      onClick={() => setSelectedCurrency(currency as Currency)}
                    >
                      <Typography
                        sx={{
                          fontFamily: "poppins",
                          fontSize: "20px",
                          fontStyle: "normal",
                          fontWeight: "300",
                          lineHeight: "normal",
                        }}
                      >
                        {currency}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Azo Sans",
                          fontSize: "40px",
                          fontStyle: "normal",
                          fontWeight: "700",
                          lineHeight: "normal",
                          letterSpacing: "-0.28px",
                        }}
                      >
                        {selectedGame[currency as Currency]}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </>
      )}
      {selectedGame && (
        <Button
          sx={{
            marginTop: "40px",
            alignSelf: "center",

            width: "186px",
            height: "50px",
            borderRadius: "30px",
            background: "#FBFF3D",
            boxShadow: "0px 4.348px 8.696px 0px rgba(0, 0, 0, 0.25)",

            color: "#333",
            textAlign: "center",
            fontFamily: "Poppins",
            fontSize: "30px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
          onClick={props.onClose}
        >
          BUY
        </Button>
      )}
    </Box>
  );
};

export default function ShoppingModal(props: ShoppingModalProps) {
  const { open, onClose } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ShoppingModalBody onClose={onClose} />
    </Modal>
  );
}
