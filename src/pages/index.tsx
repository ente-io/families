import { useEffect, useContext, useState } from 'react';
import {
    acceptInvite,
    createFamily,
    getWebEndpoint,
} from '../services/APIService';
import { AppContext } from './_app';
import { useRouter } from 'next/router';
import { logError } from '../util/sentry';
import { Grid, Container } from '@mui/material';
import {
    ImageContainer,
    ContentContainer,
    GetStartedButton,
} from '../components/styledComponents/Landing';
import theme from '../theme';
import constants from '../util/strings/constants';
import {
    CenteredContainer,
    OverlayContainer,
} from '../components/styledComponents/Utils';
import EnteLoader from '../components/EnteLoader';
import { isDeviceMobile } from '../util/common/deviceDetection';

function Home() {
    const {
        authToken,
        isLargerDisplay,
        syncMembers,
        setIsLoading,
        setFamilyManagerEmail,
        setTotalStorage,
        setMessage,
        setMessageDialogView,
    } = useContext(AppContext);

    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const main = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const token = params.get('token');
                const isFamilyCreated =
                    params.get('isFamilyCreated') ??
                    params.get('familyCreated'); // handle both flag till internal APK is released
                if (isFamilyCreated === 'true') {
                    await router.replace({
                        pathname: '/members',
                        query: { token },
                    });
                }
                const inviteToken = params.get('inviteToken');
                if (inviteToken) {
                    await handleAcceptInvite(inviteToken);
                }
            } catch (e) {
                logError(e, 'failed to set initial query params state');
            } finally {
                setIsReady(true);
            }
        };
        main();
    }, []);

    const handleAcceptInvite = async (inviteToken: string) => {
        try {
            const acceptInviteRes = await acceptInvite(inviteToken);
            if (acceptInviteRes.success) {
                setFamilyManagerEmail(acceptInviteRes.data.adminEmail);
                setTotalStorage(acceptInviteRes.data.storage);
                await router.replace({ pathname: '/invite' });
            } else {
                setMessage(acceptInviteRes.msg);
                setMessageDialogView(true);
            }
        } catch (e) {
            logError(e, 'failed to accept invite');
        }
    };

    const setPageToMembers = () => {
        router.replace({
            pathname: '/members',
            query: { token: authToken },
        });
    };

    const onGetStartedClick = async () => {
        try {
            if (authToken) {
                setIsLoading(true);
                const res = await createFamily(authToken);
                setIsLoading(false);
                if (res.success) {
                    setPageToMembers();
                    syncMembers();
                } else {
                    setMessageDialogView(true);
                    setMessage(res.msg);
                }
            } else {
                if (isDeviceMobile()) {
                    window.location.href = 'ente://home';
                    setTimeout(function () {
                        window.location.href =
                            getWebEndpoint() + '?redirect=families';
                    }, 250);
                } else {
                    window.location.href =
                        getWebEndpoint() + '?redirect=families';
                }
            }
        } catch (e) {
            logError(e, 'getStarted click failed');
        }
    };

    return !isReady ? (
        <OverlayContainer>
            <CenteredContainer>
                <EnteLoader />
            </CenteredContainer>
        </OverlayContainer>
    ) : (
        <>
            <Grid
                container
                spacing={0}
                style={{
                    marginTop: isLargerDisplay ? '72px' : '40px',
                }}>
                <Grid item xs={12} md={6}>
                    <ContentContainer mq={isLargerDisplay ? true : undefined}>
                        <div>
                            <div
                                style={{
                                    fontSize: isLargerDisplay ? '48px' : '32px',
                                    marginBottom: '16px',
                                    fontWeight: 700,
                                    lineHeight: isLargerDisplay
                                        ? '52px'
                                        : '36px',
                                }}>
                                {constants.FAMILY}
                                <br />
                                {constants.SHARING}
                            </div>
                            <div
                                style={{
                                    fontSize: isLargerDisplay ? '20px' : '16px',
                                    lineHeight: isLargerDisplay
                                        ? '30px'
                                        : '24px',
                                    marginBottom: '16px',
                                    color: theme.palette.lightgray.main,
                                }}>
                                {constants.INTRODUCING}{' '}
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        color: theme.palette.primary.main,
                                    }}>
                                    {constants.FAMILY_SHARING}
                                </span>
                                . <br /> {constants.SHARE_YOUR_PLAN} <br />
                                {constants.EACH_MEMBER_GETS_OWN_SPACE}
                                <br />
                            </div>
                            {isLargerDisplay && (
                                <GetStartedButton
                                    variant="contained"
                                    mq={isLargerDisplay ? true : undefined}
                                    onClick={onGetStartedClick}>
                                    <b>{constants.GET_STARTED}</b>
                                </GetStartedButton>
                            )}
                        </div>
                    </ContentContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ImageContainer mq={isLargerDisplay ? true : undefined}>
                        <div
                            style={{
                                width: isLargerDisplay ? '500px' : '400px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                            }}>
                            <img
                                src="images/family_sharing.png"
                                height={'100%'}
                                width={'100%'}></img>
                        </div>
                    </ImageContainer>
                </Grid>
            </Grid>
            {!isLargerDisplay && (
                <Container
                    maxWidth={'lg'}
                    sx={{
                        textAlign: 'center',
                    }}>
                    <GetStartedButton
                        variant="contained"
                        mq={isLargerDisplay ? true : undefined}
                        onClick={onGetStartedClick}>
                        <b>{constants.GET_STARTED}</b>
                    </GetStartedButton>
                </Container>
            )}
        </>
    );
}

export default Home;
