// Invest.tsx
import React, { useState ,useEffect } from "react";
import { Grid, Paper, Typography, Modal, Box, LinearProgress ,Button } from "@mui/material";
import  { LinearProgressProps } from '@mui/material/LinearProgress';
import { useAccount  } from "wagmi";

const Items = [
    { id: 1, title: "game 1", description: "Description of game 1", progress: 30, imageUrl: "https://picsum.photos/200/300?random=1" },
    { id: 2, title: "game 2", description: "Description of game 2", progress: 60, imageUrl: "https://picsum.photos/200/300?random=2" },
    { id: 3, title: "game 3", description: "Description of game 3", progress: 90, imageUrl: "https://picsum.photos/200/300?random=3" },
    { id: 4, title: "game 4", description: "Description of game 4", progress: 20, imageUrl: "https://picsum.photos/200/300?random=4" },
    { id: 5, title: "game 5", description: "Description of game 5", progress: 75, imageUrl: "https://picsum.photos/200/300?random=5" },
  ];
  

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

const Invest: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    title: string;
    description: string;
    progress: number;
  } | null>(null);

  const { isConnected, address } = useAccount();

  useEffect(() => {

    console.log(isConnected, address);
  }, [isConnected, address]);


  const [progress, setProgress] = useState(Items.map((item) => item.progress));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress.map((value) => (value >= 100 ? 10 : value + 10))
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleOpen = (item: typeof Items[0]) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Game Invest
      </Typography>
      <Grid container spacing={2}>
      {Items.map((item, index) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Paper
              elevation={3}
              sx={{ padding: "16px", cursor: "pointer", display: "flex", flexDirection: "column" , gap:"2em"}}
            >
                <img src={item.imageUrl} alt={item.title} style={{ width: "50%" , alignSelf:'center'}} />
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body1">{item.description}</Typography>
              <LinearProgressWithLabel value={progress[index]} />
              <Button variant="contained" color="primary" onClick={() => handleOpen(item)}  sx={{ marginLeft:"auto",  padding: "4px 8px", fontSize: "0.8rem" }}>
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
    </div>
  );
};

export default Invest;

