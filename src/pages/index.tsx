import { CircularProgress, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import Landing from '../components/Landing';
import theme from '../theme';
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
import { CenteredContainer } from '../styles/utils';

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
    isSmallerDisplay: boolean;
    isUserAdmin: boolean;
    members: Member[];
    setMembers: (members: Member[]) => void;
    shouldSyncMembers: boolean;
    setShouldSyncMembers: (shouldSyncMembers: boolean) => void;
    familyManagerEmail: string;
    setFamilyManagerEmail: (email: string) => void;
    totalStorage: number;
    setTotalStorage: (storage: number) => void;
    authToken: string;
    setAuthToken: (token: string) => void;
    inviteDialogView: boolean;
    setInviteDialogView: (open: boolean) => void;
    messageDialogView: boolean;
    setMessageDialogView: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    actionDialogView: boolean;
    setActionDialogView: (open: boolean) => void;
    actionDialogOptions: ActionDialogOptions;
    setActionDialogOptions: (options: ActionDialogOptions) => void;
    setIsLoading: (isLoading: boolean) => void;
}

const defaultAppContext: AppContextType = {
    isSmallerDisplay: false,
    isUserAdmin: false,
    members: [],
    setMembers: () => {},
    shouldSyncMembers: false,
    setShouldSyncMembers: () => {},
    familyManagerEmail: '',
    setFamilyManagerEmail: () => {},
    totalStorage: 0,
    setTotalStorage: () => {},
    authToken: '',
    setAuthToken: () => {},
    inviteDialogView: false,
    setInviteDialogView: () => {},
    messageDialogView: false,
    setMessageDialogView: () => {},
    message: '',
    setMessage: () => {},
    actionDialogView: false,
    setActionDialogView: () => {},
    actionDialogOptions: defaultActionDialogOptions,
    setActionDialogOptions: () => {},
    setIsLoading: () => {},
};

export const AppContext = createContext(defaultAppContext);

function App() {
    const isSmallerDisplay = useMediaQuery(theme.breakpoints.up('md'));
    const [page, setPage] = useState(PageState.Landing);
    const [isLoading, setIsLoading] = useState(false);
    const [inviteDialogView, setInviteDialogView] = useState(false);
    const [messageDialogView, setMessageDialogView] = useState(false);
    const [message, setMessage] = useState('');
    const [actionDialogView, setActionDialogView] = useState(false);
    const [actionDialogOptions, setActionDialogOptions] = useState(
        defaultActionDialogOptions
    );
    const [members, setMembers] = useState([]);
    const [shouldSyncMembers, setShouldSyncMembers] = useState(false);
    const [totalStorage, setTotalStorage] = useState(0);
    const [authToken, setAuthToken] = useState('');
    const [familyManagerEmail, setFamilyManagerEmail] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const inviteToken = params.get('inviteToken');
        if (inviteToken) {
            handleAcceptInvite(inviteToken);
        }
        const token = params.get('token');
        if (token) {
            setAuthToken(token);
        }
        if (
            (params.get('familyCreated') &&
                params.get('familyCreated') === 'true') || // handle both flag till internal APK is released
            (params.get('isFamilyCreated') &&
                params.get('isFamilyCreated') === 'true')
        ) {
            syncMembers(token).then(() => {
                setPage(PageState.FamilyMembers);
            });
        }
    }, []);

    const handleAcceptInvite = async (inviteToken) => {
        setIsLoading(true);
        const acceptInviteRes = await acceptInvite(inviteToken);
        setIsLoading(false);
        if (acceptInviteRes.success) {
            setFamilyManagerEmail(acceptInviteRes.data.adminEmail);
            setTotalStorage(acceptInviteRes.data.storage);
            setPage(PageState.InviteAccepted);
        } else {
            setMessage(acceptInviteRes.msg);
            setMessageDialogView(true);
        }
    };

    const syncMembers = async (authToken) => {
        const res = await getMembers(authToken);
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
            setPage(PageState.Landing);
            setMessage(res.msg);
            setMessageDialogView(true);
        }
    };

    useEffect(() => {
        if (shouldSyncMembers) {
            syncMembers(authToken);
            setShouldSyncMembers(false);
        }
    }, [shouldSyncMembers]);

    return (
        <AppContext.Provider
            value={{
                ...defaultAppContext,
                isSmallerDisplay,
                familyManagerEmail,
                setFamilyManagerEmail,
                members,
                setMembers,
                shouldSyncMembers,
                setShouldSyncMembers,
                totalStorage,
                setTotalStorage,
                authToken,
                setAuthToken,
                inviteDialogView,
                setInviteDialogView,
                messageDialogView,
                setMessageDialogView,
                message,
                setMessage,
                actionDialogView,
                setActionDialogView,
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
                        <InviteAccepted
                            familyManagerEmail={familyManagerEmail}
                            totalStorage={totalStorage}
                        />
                    )}
                    <InviteDialog
                        open={inviteDialogView}
                        setOpen={setInviteDialogView}
                    />
                    <MessageDialog
                        open={messageDialogView}
                        setOpen={setMessageDialogView}
                        msg={message}
                    />
                    <ActionDialog
                        open={actionDialogView}
                        setOpen={setActionDialogView}
                        options={actionDialogOptions}
                    />
                </>
            ) : (
                <CenteredContainer style={{ width: '60px', height: '60px' }}>
                    <CircularProgress color="primary" size={60} />
                </CenteredContainer>
            )}
        </AppContext.Provider>
    );
}

export default App;
