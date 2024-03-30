import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/base";
import { Grid,Divider, Typography } from "@mui/material";

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
  const [selectedGameId, setSelectedGameId] = React.useState<
    string|undefined
  >(undefined);
  const [selectedCurrencyId, setSelectedCurrencyId] = React.useState<
    string|undefined
  >(undefined);
  return (
    <Box 
      sx={{
        position: "absolute",
        width: "1010px",
        height: selectedGameId ? "646px" : "265px",
        top: "50%",
        left: "50%",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "20px",
        border: "1px solid var(--gray0, #FFF)",
        background: "rgba(51, 51, 51, 0.80)",
        backdropFilter: "blur(30px)",
        flexShrink: "0",
        justifyContent:"center",
      }}
    >
      <Divider sx={{background: "var(--gray6, #646464)"}}  />
      <Box sx={{display:"inline-flex",alignSelf:"flex-start", gap:"22px"}}>
      <svg  style={{width:"24px", height:"17px", alignSelf:"center"}} xmlns="http://www.w3.org/2000/svg" width="28" height="20" viewBox="0 0 28 20" fill="none">
      <path d="M23 1H14H5L2 15.6552L6.2 18L10.4 13.8966H17.6L21.8 18L26 15.6552L23 1Z" stroke="white" stroke-width="2"/>
        <line x1="7" y1="7" x2="13" y2="7" stroke="white" stroke-width="2"/>
        <line x1="10" y1="4" x2="10" y2="10" stroke="white" stroke-width="2"/>
        <circle cx="17" cy="8" r="1" fill="white"/>
        <circle cx="20" cy="6" r="1" fill="white"/>
        </svg>
        <h2 style={{color: "var(--gray0, #FFF)",
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal"}}>Game List</h2>
    </Box>
      <Box sx={{display:"flex", gap:"10px", flexWrap:"wrap"  }}>
        {[
          "game1",
          "game2",
          "game3",
          "game4",
          "game5",
          "game6",
          "game7",
          "game8",
          "game1",
          "game2",
          "game4",
          "game7",
          "game1",
          "game2",
          "game3",
          "game4",
          "game5",
          "game6",
          "game7",
         
        ].map((game,index) => {
          const gameId = `${game}-${index}`;
          return (
              <Box
                sx={{
                  display: "inline-flex",
                  padding: "12px 24px",
                  maxHeight: "30px",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: selectedGameId === gameId ? "#0C0D11" : "#333333CC",
                  color: selectedGameId === gameId? "#FBFF3D" :"var(--gray0, #FFF)",
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "300",
                  lineHeight: "normal",
                  borderRadius: "10px",
                  border: "1px solid var(--gray6, #646464)"
                }}
                onClick={() => setSelectedGameId(gameId)}
              >
                {game}
              </Box>
          );
        })}
      </Box>
      {selectedGameId && <ProbabilityDetail onClose={props.onClose} /> 
        && <>
        <Divider sx={{background: "var(--gray6, #646464)"}} />
      <Box  sx={{display:"flex",flexDirection:"row", justifyContent:"flex-start",gap:"12px"}}>
        <Box sx={{display:"flex", gap:"16px", flexDirection:"column"}}>
          <Box sx={{display: "inline-flex", gap:"14px"}}> 
            <svg style={{width:"30px", height:"30px", alignSelf:"center"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <line x1="5" y1="7.5" x2="25" y2="7.5" stroke="white" stroke-width="2.5"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 23.75L18.75 23.75L16.25 23.7499L18.75 21.25H5V23.75Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 16.25L25 16.25L22.5 16.2499L25 13.75H5V16.25Z" fill="white"/>
            </svg>
            <h2 style={{color: "var(--gray0, #FFF)",
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal"}}>Draw List</h2>
          </Box>
          <Box sx={{width:"436px", height:"192px",  backgroundColor:"#333333CC", alignContent:"center", gap:"10px",
            borderRadius:" 20px",
            border: "1px solid var(--gray6, #646464)",
            background: "var(--gray7, #353535)",
            alignSelf:"center",
        }}>
              {[
            {name:"item1", "probability": "90%"},
            {name:"item2", "probability": "80%"},
            {name:"item3", "probability": "40%"},
            {name:"item4", "probability": "10%"},

            ].map((game,index) => {
              const gameId = `${game}-${index}`;
              return (
                  <Box
                    sx={{
                      display: "inline-flex",
                      padding: "12px 24px",
                      maxHeight: "30px",
                      width:"140px",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: selectedGameId === gameId ? "#0C0D11" : "#333333CC",
                      color: selectedGameId === gameId? "#FBFF3D" :"var(--gray0, #FFF)",
                      fontFamily: "Poppins",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "normal",
                      borderRadius: "10px",
                      flexWrap:"wrap",
                    }}
                    onClick={() => setSelectedGameId(gameId)}
                  >
                    <Typography style={{ margin:"0 28px" }}>
                      {game.name}
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
                    {game.probability}
                      </Typography>
                  </Box>
              );
            })}
          </Box>
         </Box>
         <Divider sx={{background: "var(--gray6, #646464)"}}  orientation="vertical"/>
         <Box sx={{display:"flex", gap:"16px", flexDirection:"column"}}>
          <Box sx={{display: "inline-flex", gap:"14px", }}> 
          <svg style={{width:"30px", height:"30px", alignSelf:"center"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M5 13.7502L15 16.25L25 13.75M5 13.7502L15 2.5M5 13.7502L15 11.2501M25 13.75L15 2.5M25 13.75L15 11.2501M15 2.5V11.2501M6.875 18.75L15.0002 27.5L23.125 18.75L15 20.625L6.875 18.75Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            <h2 style={{color: "var(--gray0, #FFF)",
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "normal"}}>Price</h2>
          </Box>
          <Box sx={{display:"flex", flexDirection:"row", width:"436px", height:"192px", backgroundColor:"#333333CC",alignContent:"center",
           borderRadius:" 20px",
           border: "1px solid var(--gray6, #646464)",
           background: "var(--gray7, #353535)",
           justifyContent:"center",
           gap:"23px",
        }}>
          {[
         {name: "item1", currency:'USDT'},{name:"item2",currency:"stNPT"}
        ].map((game,index) => {
          console.log(game,index)
          const gameId = `${game}-${index}`;
          return (
              <Box
                sx={{
                  width:"180px",
                  height:"121px",
                  display: "flex",
                  flexDirection: "column",
                  flexWrap:"wrap",
                  justifyContent: "center",
                  alignSelf:"center",
                  alignItems: "center",
                  cursor: "pointer",
                  borderRadius: "14px",
                  border: selectedCurrencyId===gameId ? "1px solid var(--gray0, #FFF)": "1px dashed var(--gray6, #646464)",
                  background: "var(--gray7, #353535)",
                  backgroundColor: selectedCurrencyId === gameId ? "#0C0D11" : "#333333CC",
                  color: selectedCurrencyId === gameId? "#FBFF3D" :"var(--gray0, #FFF)",
                }}
                onClick={() => setSelectedCurrencyId(gameId)}
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
                  {game.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Azo Sans",
                    fontSize: "40px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",
                    letterSpacing: "-0.28px"
                  }}
                >
                  {game.currency}
                </Typography>
              </Box>
          );
        })}
          </Box>
         </Box>
        </Box>
        </>
      }
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
      <ShoppingModalBody  onClose={onClose} />
    </Modal>
  );
}
