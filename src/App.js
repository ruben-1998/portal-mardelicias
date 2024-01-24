import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { getLocalStorage } from 'utils/utils';
import { USERS_TYPE_DEFINITIONS } from 'utils/constants';
import { useNavigate } from 'react-router';
import { UserProvider } from 'store/UserContext';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(getLocalStorage('user'));

    if (user && user.id) {
      if (user.user_metadata.role === USERS_TYPE_DEFINITIONS.CLIENT || user.user_metadata.role === USERS_TYPE_DEFINITIONS.DRIVER) {
        navigate('/login');
      }
    }
  }, []);

  return (
    <UserProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
          <ToastContainer autoClose={2000} theme="colored" />
        </ThemeProvider>
      </StyledEngineProvider>
    </UserProvider>
  );
};

export default App;
