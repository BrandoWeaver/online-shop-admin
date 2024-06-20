import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { AuthWrapper } from 'contexts/AuthContext';
import { router } from 'routes';
import theme from 'themes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthWrapper>
        <RouterProvider router={router} />
      </AuthWrapper>
    </ThemeProvider>
  );
}

export default App;
