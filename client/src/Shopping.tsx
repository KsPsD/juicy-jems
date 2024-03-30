import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ShoppingModal from "./ShoppingModal";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ReactComponent as RandomBox } from "./assets/random_box.svg";

interface ItemProps {
  name: string;
  src: string;
  openModal: () => void;
}

const Item = (props: ItemProps) => {
  const { name, openModal } = props;
  return (
    <Grid
      sx={{
        cursor: "pointer",
      }}
      onClick={openModal}
      item
      xs={6}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,

          padding: 2,
          maxWidth: 100,

          border: "1px solid black",
          borderRadius: 8,
        }}
      >
        <Box
          sx={{
            alignSelf: "flex-end",
            height: 20,
          }}
        >
          {`game: ${name}`}
        </Box>
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: "red",
          }}
        ></Box>
        <Box
          sx={{
            alignSelf: "flex-end",
            height: 20,
          }}
        >
          Buy
        </Box>
      </Box>
    </Grid>
  );
};

const Shopping = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { isConnected, address } = useAccount();

  useEffect(() => {
    console.log(isConnected, address);
  }, [isConnected, address]);

  return (
    <div>
      <Box
        sx={{
          padding: "0px",
          height: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RandomBox
          style={{
            cursor: "pointer",
          }}
          onClick={() => setModalOpened(true)}
        />
      </Box>
      <ShoppingModal open={modalOpened} onClose={() => setModalOpened(false)} />
    </div>
  );
};

export default Shopping;
