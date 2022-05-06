import { CircularProgress, ThemeProvider, useMediaQuery } from '@mui/material';
import '../styles/global.css';
import React, { createContext, useEffect, useState } from 'react';
import theme from '../theme';
import Head from 'next/head';
import ActionDialog from '../components/ActionDialog';
import { CenteredContainer } from '../components/styledComponents/Utils';
import MessageDialog from '../components/MessageDialog';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { getMembers } from '../services/APIService';
import { defaultActionDialogOptions, defaultAppContext } from '../types';
import constants from '../util/strings/constants';
import { logError } from '../util/sentry';
import createEmotionCache from '../util/createEmotionCache';
import { CacheProvider } from '@emotion/react';

export const AppContext = createContext(defaultAppContext);
const clientSideEmotionCache = createEmotionCache();

function App({ Component, pageProps }) {
    const isLargerDisplay = useMediaQuery(theme.breakpoints.up('md'));
    const [isLoading, setIsLoading] = useState(false);
    const [inviteDialogView, setInviteDialogView] = useState(false);
    const [messageDialogView, setMessageDialogView] = useState(false);
    const [message, setMessage] = useState('');
    const [actionDialogView, setActionDialogView] = useState(false);
    const [actionDialogOptions, setActionDialogOptions] = useState(
        defaultActionDialogOptions
    );
    const [members, setMembers] = useState([]);
    const [totalStorage, setTotalStorage] = useState(0);
    const [authToken, setAuthToken] = useState('');
    const [familyManagerEmail, setFamilyManagerEmail] = useState('');

    const router = useRouter();

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            if (token) {
                setAuthToken(token);
                syncMembers(token); // passing token as state of authToken might not be updated
            }
        } catch (e) {
            logError(e, 'failed to set initial query params state');
        }
    }, []);

    const syncMembers = async (token?: string) => {
        try {
            const res = await getMembers(authToken || token);
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
                router.replace({ pathname: '/' });
                setMessage(res.msg);
                setMessageDialogView(true);
            }
        } catch (e) {
            logError(e, 'failed to sync members');
        }
    };

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
        <CacheProvider value={clientSideEmotionCache}>
            <Head>
                <title>{constants.FAMILY_TITLE}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <AppContext.Provider
                value={{
                    ...defaultAppContext,
                    isLargerDisplay,
                    familyManagerEmail,
                    setFamilyManagerEmail,
                    members,
                    setMembers,
                    syncMembers,
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
                    <Navbar />
                    {isLoading ? (
                        <CenteredContainer
                            style={{ width: '60px', height: '60px' }}>
                            <CircularProgress color="primary" size={60} />
                        </CenteredContainer>
                    ) : (
                        <Component {...pageProps} />
                    )}
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
        </CacheProvider>
    );
}

export default App;
