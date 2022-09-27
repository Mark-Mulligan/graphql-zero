// MUI
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoader = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
