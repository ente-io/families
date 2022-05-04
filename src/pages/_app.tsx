import {
    CircularProgress,
    GlobalStyles,
    ThemeProvider,
    useMediaQuery,
} from '@mui/material';
import '../styles/global.css';
import React, { createContext, useEffect, useState } from 'react';
import theme from '../theme';
import Head from 'next/head';
import ActionDialog, {
    ActionDialogOptions,
    defaultActionDialogOptions,
} from '../components/ActionDialog';
import { CenteredContainer } from '../styles/Utils';
import InviteDialog from '../components/InviteDialog';
import MessageDialog from '../components/MessageDialog';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { getMembers } from '../services/APIService';

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

function App({ Component, pageProps }) {
    const isSmallerDisplay = useMediaQuery(theme.breakpoints.up('md'));
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

    const router = useRouter();

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
            // TODO: handle this better
            if (router.asPath !== '/members') {
                router.push('/members');
            }
        } else {
            router.push('/');
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

    // handles loading across pages
    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleEnd = async () => {
            setIsLoading(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleEnd);
        router.events.on('routeChangeError', handleEnd);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleEnd);
            router.events.off('routeChangeError', handleEnd);
        };
    }, [router]);

    return (
        <>
            <Head>
                <title>Family</title>
            </Head>
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
                <ThemeProvider theme={theme}>
                    <GlobalStyles
                        styles={{
                            body: {
                                backgroundColor: '#212121',
                                color: '#fff',
                                fontFamily: 'Inter',
                            },
                        }}
                    />
                    <Navbar />
                    {isLoading ? (
                        <CenteredContainer
                            style={{ width: '60px', height: '60px' }}>
                            <CircularProgress color="primary" size={60} />
                        </CenteredContainer>
                    ) : (
                        <Component {...pageProps} />
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
                </ThemeProvider>
            </AppContext.Provider>
        </>
    );
}

export default App;
