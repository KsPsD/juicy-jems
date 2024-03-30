import WalletConnect, { WalletConnectProvider } from './walletConnect';

import { Paper, Box, useMediaQuery, useTheme } from '@mui/material';


export const Home = () => {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Paper
          sx={{
            border: '5px solid yellow', 
            padding: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: isDesktop ? '700px' : '90vw',
            height: isDesktop ? '700px' : 'auto',
            justifyContent: isDesktop ? 'center' : 'flex-start',
          }}
        >
          <h4>Home</h4>
          <WalletConnect />
        </Paper>
      </Box>
    )};
  