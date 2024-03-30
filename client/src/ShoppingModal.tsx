import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/base";
import { Grid } from "@mui/material";

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

type NeopleGame =
  | "game1"
  | "game2"
  | "game3"
  | "game4"
  | "game5"
  | "game6"
  | "game7"
  | "game8";

const ShoppingModalBody = (props: { onClose: () => void }) => {
  const [selectedGame, setSelectedGame] = React.useState<
    NeopleGame | undefined
  >(undefined);
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",

        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Grid container spacing={2}>
        {[
          "game1",
          "game2",
          "game3",
          "game4",
          "game5",
          "game6",
          "game7",
          "game8",
        ].map((game) => {
          return (
            <Grid item xs={3} key={game}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: selectedGame === game ? "gray" : "white",
                }}
                onClick={() => setSelectedGame(game as NeopleGame)}
              >
                {game}
              </Box>
            </Grid>
          );
        })}
      </Grid>
      {selectedGame && <ProbabilityDetail onClose={props.onClose} />}
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
