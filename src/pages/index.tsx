import { CircularProgress, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import Landing from '../components/Landing';
import customTheme from '../theme';
import FamilyMembers from '../components/FamilyMembers';
import { useState, createContext, useEffect } from 'react';
import InviteDialog from '../components/InviteDialog';
import ActionDialog, {
    ActionDialogOptions,
    defaultActionDialogOptions,
} from '../components/ActionDialog';
import MessageDialog from '../components/MessageDialog';
import InviteAccepted from '../components/InviteAccepted';
import { acceptInvite, getMembers } from '../services/APIService';

export enum PageState {
    Landing,
    FamilyMembers,
    InviteAccepted,
}

export type MemberStatusOptions = 'ACCEPTED' | 'INVITED' | 'SELF';

export interface Member {
    id: string;
    email: string;
    status: MemberStatusOptions;
    usage: number;
    isAdmin: boolean;
}

interface AppContextType {
    mediaQuery: boolean;
    isUserAdmin: boolean;
    members: Member[];
    setMembers: (members: Member[]) => void;
    familyManagerEmail: string;
    setFamilyManagerEmail: (email: string) => void;
    totalStorage: number;
    setTotalStorage: (storage: number) => void;
    authToken: string;
    setAuthToken: (token: string) => void;
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
    setIsLoading: (isLoading: boolean) => void;
}

const defaultAppContext: AppContextType = {
    mediaQuery: false,
    isUserAdmin: false,
    members: [],
    setMembers: () => {},
    familyManagerEmail: '',
    setFamilyManagerEmail: () => {},
    totalStorage: 0,
    setTotalStorage: () => {},
    authToken: '',
    setAuthToken: () => {},
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
    setIsLoading: () => {},
};

export const AppContext = createContext(defaultAppContext);

function App() {
    const mediaQuery = useMediaQuery(customTheme.breakpoints.up('md'));
    const [page, setPage] = useState(PageState.Landing);
    const [isLoading, setIsLoading] = useState(false);
    const [openInviteDialog, setOpenInviteDialog] = useState(false);
    const [openMessageDialog, setOpenMessageDialog] = useState(false);
    const [message, setMessage] = useState('');
    const [openActionDialog, setOpenActionDialog] = useState(false);
    const [actionDialogOptions, setActionDialogOptions] = useState(
        defaultActionDialogOptions
    );
    const [members, setMembers] = useState([]);
    const [totalStorage, setTotalStorage] = useState(0);
    const [authToken, setAuthToken] = useState('');
    const [familyManagerEmail, setFamilyManagerEmail] = useState('');

    const handleInviteAccept = async (inviteToken) => {
        setIsLoading(true);
        const res = await acceptInvite(inviteToken);
        setIsLoading(false);
        if (res.success) {
            setPage(PageState.InviteAccepted);
        } else {
            setMessage(res.msg);
            setOpenMessageDialog(true);
        }
    };

    const syncMembers = async (authToken) => {
        setIsLoading(true);
        const res = await getMembers(authToken);
        console.log(res);
        setIsLoading(false);
        if (res.success) {
            setMembers(res.data.members);
            setTotalStorage(res.data.storage);
            for (const member of res.data.members) {
                if (member.isAdmin) {
                    setFamilyManagerEmail(member.email);
                    break;
                }
            }
        } else {
            setMessage(res.msg);
            setOpenMessageDialog(true);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const inviteToken = params.get('inviteToken');
        if (inviteToken) {
            handleInviteAccept(inviteToken);
        }
        const token = params.get('token');
        if (token) {
            setAuthToken(token);
            syncMembers(token);
        }
    }, []);

    return (
        <ThemeProvider theme={customTheme}>
            <AppContext.Provider
                value={{
                    ...defaultAppContext,
                    mediaQuery,
                    familyManagerEmail,
                    setFamilyManagerEmail,
                    members,
                    setMembers,
                    totalStorage,
                    setTotalStorage,
                    authToken,
                    setAuthToken,
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
                    setIsLoading,
                }}>
                <Navbar />
                {!isLoading ? (
                    <>
                        {page === PageState.Landing ? (
                            <Landing setPage={setPage} />
                        ) : page === PageState.FamilyMembers ? (
                            <FamilyMembers />
                        ) : (
                            <InviteAccepted />
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
                    </>
                ) : (
                    <CircularProgress
                        color="primary"
                        size={60}
                        style={{
                            position: 'absolute',
                            top: 'calc(50% - 30px)',
                            left: 'calc(50% - 30px)',
                        }}
                    />
                )}
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;
