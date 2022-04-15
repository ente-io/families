import { useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import Landing from '../components/Landing';
import customTheme from '../theme';
import FamilyMembers from '../components/FamilyMembers';
import { useState, createContext } from 'react';

export enum PageState {
    Landing,
    FamilyMembers,
}

interface AppContextType {
    mediaQuery: boolean;
    isUserAdmin: boolean;
    members: {
        email: string;
        status: string;
        used: number;
    }[];
    familyManagerEmail: string;
}

const defaultAppContext: AppContextType = {
    mediaQuery: false,
    isUserAdmin: false,
    members: [],
    familyManagerEmail: '',
};

export const AppContext = createContext(defaultAppContext);

function App() {
    const mediaQuery = useMediaQuery(customTheme.breakpoints.up('md'));
    const [page, setPage] = useState(PageState.Landing);

    const familyManagerEmail = 'bonafidethat@hotmail.com';
    const members = [
        { email: 'bonafidethat@hotmail.com', status: 'Admin', used: 40 },
        { email: 'dad@family.com', status: 'Member', used: 20 },
        { email: 'son@family.com', status: 'Member', used: 16 },
        { email: 'mom@family.com', status: 'Invited', used: 2 },
    ];

    return (
        <ThemeProvider theme={customTheme}>
            <AppContext.Provider
                value={{
                    ...defaultAppContext,
                    mediaQuery,
                    familyManagerEmail,
                    members,
                }}>
                <Navbar />
                {page === PageState.Landing ? (
                    <Landing setPage={setPage} />
                ) : (
                    <FamilyMembers />
                )}
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;
