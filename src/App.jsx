import './App.css';
import { Box, Button } from '@mui/material';

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <Box>
        <Button variant="contained" color="primary" onClick={() => alert('test')}>
          Is satori in stock?
        </Button>
      </Box>
    </div>
  );
};

export default App;
