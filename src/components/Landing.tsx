import { Grid, Container } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../pages/_app';
import { createFamily, getWebEndpoint } from '../services/APIService';
import theme from '../theme';
import constants from '../util/strings/constants';
import {
    ContentContainer,
    GetStartedButton,
    ImageContainer,
} from '../styles/Landing';

function Landing({ setPageToMembers }: { setPageToMembers: () => void }) {
    const {
        isSmallerDisplay,
        setMessageDialogView,
        setMessage,
        authToken,
        setIsLoading,
        syncMembers
    } = useContext(AppContext);

    const onGetStartedClick = async () => {
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
            window.location.href = getWebEndpoint() + '?redirect=families';
        }
    };

    return (
        <>
            <Grid
                container
                spacing={0}
                style={{
                    marginTop: isSmallerDisplay ? '72px' : '40px',
                }}>
                <Grid item xs={12} md={6}>
                    <ContentContainer mq={isSmallerDisplay ? true : undefined}>
                        <div>
                            <div
                                style={{
                                    fontSize: isSmallerDisplay
                                        ? '48px'
                                        : '32px',
                                    marginBottom: '16px',
                                    fontWeight: 700,
                                    lineHeight: isSmallerDisplay
                                        ? '52px'
                                        : '36px',
                                }}>
                                {constants.FAMILY}
                                <br />
                                {constants.SHARING}
                            </div>
                            <div
                                style={{
                                    fontSize: isSmallerDisplay
                                        ? '20px'
                                        : '16px',
                                    lineHeight: isSmallerDisplay
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
                            {isSmallerDisplay && (
                                <GetStartedButton
                                    variant="contained"
                                    mq={isSmallerDisplay ? true : undefined}
                                    onClick={onGetStartedClick}>
                                    <b>{constants.GET_STARTED}</b>
                                </GetStartedButton>
                            )}
                        </div>
                    </ContentContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ImageContainer mq={isSmallerDisplay ? true : undefined}>
                        <div
                            style={{
                                width: isSmallerDisplay ? '500px' : '400px',
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
            {!isSmallerDisplay && (
                <Container
                    maxWidth={'lg'}
                    sx={{
                        textAlign: 'center',
                    }}>
                    <GetStartedButton
                        variant="contained"
                        mq={isSmallerDisplay ? true : undefined}
                        onClick={onGetStartedClick}>
                        <b>{constants.GET_STARTED}</b>
                    </GetStartedButton>
                </Container>
            )}
        </>
    );
}

export default Landing;
