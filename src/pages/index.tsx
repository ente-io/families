import { useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import Landing from '../components/Landing';
import customTheme from '../theme';
import FamilyMembers from '../components/FamilyMembers';
import { useState, createContext } from 'react';
import InviteDialog from '../components/InviteDialog';
import ActionDialog, {
    ActionDialogOptions,
    defaultActionDialogOptions,
} from '../components/ActionDialog';
import MessageDialog from '../components/MessageDialog';

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
    openInviteDialog: boolean;
    setOpenInviteDialog: (open: boolean) => void;
    openMessageDialog: boolean;
    setOpenMessageDialog: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    openActionDialog: boolean;
    setOpenActionDialog: (open: boolean) => void;
    actionDialogOptions: ActionDialogOptions;
    setActionDialogOptions: (options: ActionDialogOptions) => void;
}

const defaultAppContext: AppContextType = {
    mediaQuery: false,
    isUserAdmin: false,
    members: [],
    familyManagerEmail: '',
    openInviteDialog: false,
    setOpenInviteDialog: () => {},
    openMessageDialog: false,
    setOpenMessageDialog: () => {},
    message: '',
    setMessage: () => {},
    openActionDialog: false,
    setOpenActionDialog: () => {},
    actionDialogOptions: defaultActionDialogOptions,
    setActionDialogOptions: () => {},
};

export const AppContext = createContext(defaultAppContext);

function App() {
    const mediaQuery = useMediaQuery(customTheme.breakpoints.up('md'));
    const [page, setPage] = useState(PageState.Landing);
    const [openInviteDialog, setOpenInviteDialog] = useState(false);
    const [openMessageDialog, setOpenMessageDialog] = useState(false);
    const [message, setMessage] = useState('');
    const [openActionDialog, setOpenActionDialog] = useState(false);
    const [actionDialogOptions, setActionDialogOptions] = useState(
        defaultActionDialogOptions
    );

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
                    openInviteDialog,
                    setOpenInviteDialog,
                    openMessageDialog,
                    setOpenMessageDialog,
                    message,
                    setMessage,
                    openActionDialog,
                    setOpenActionDialog,
                    actionDialogOptions,
                    setActionDialogOptions,
                }}>
                <Navbar />
                {page === PageState.Landing ? (
                    <Landing setPage={setPage} />
                ) : (
                    <FamilyMembers />
                )}
                <InviteDialog
                    open={openInviteDialog}
                    setOpen={setOpenInviteDialog}
                />
                <MessageDialog
                    open={openMessageDialog}
                    setOpen={setOpenMessageDialog}
                    msg={message}
                />
                <ActionDialog
                    open={openActionDialog}
                    setOpen={setOpenActionDialog}
                    options={actionDialogOptions}
                />
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;
