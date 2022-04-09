import { useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import Landing from '../components/Landing';
import customTheme from '../theme';

function HomePage() {
    const mediaQuery = useMediaQuery(customTheme.breakpoints.up('md'));
    return (
        <ThemeProvider theme={customTheme}>
            <Navbar mediaQuery={mediaQuery} />
            <Landing mediaQuery={mediaQuery} />
        </ThemeProvider>
    );
}

export default HomePage;
