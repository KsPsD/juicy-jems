import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ShoppingModal from "./ShoppingModal";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";


const ShoppingHeader = () => {
  return <div>header</div>;
};

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

const ItemList = (props: { openModal: () => void }) => {
  const { openModal } = props;
  const items = [
    {
      name: "item1",
      src: "",
    },
    {
      name: "item2",
      src: "",
    },
    {
      name: "item3",
      src: "",
    },
    {
      name: "item4",
      src: "",
    },
  ];
  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxWidth: "300px",
      }}
    >
      {items.map((item, index) => (
        <Item key={`item-${index}`} openModal={openModal} {...item} />
      ))}
    </Grid>
  );
};

const Shopping = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { isConnected, address } = useAccount();

  useEffect(() => {

    console.log(isConnected, address);
  }, [isConnected, address,]);

  return (
    <div>
      <ShoppingHeader />
      <ItemList openModal={() => setModalOpened(true)} />
      <ShoppingModal open={modalOpened} onClose={() => setModalOpened(false)} />
    </div>
  );
};

export default Shopping;
