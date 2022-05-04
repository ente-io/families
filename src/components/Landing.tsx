import { Grid, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import React, { useContext } from 'react';
import { AppContext, PageState } from '../pages/_app';
import { createFamily, getWebEndpoint } from '../services/APIService';
import theme from '../theme';
import constants from '../util/strings/constants';

const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-start' : 'center',
    justifyContent: 'center',
    marginBottom: mq ? '16px' : '0px',
}));

const GetStartedButton = styled(Button)<{ mq: boolean }>(({ mq }) => ({
    width: mq ? '50%' : '300px',
    maxWidth: '100%',
    fontSize: '20px',
    textTransform: 'none',
    marginBottom: '32px',
}));

const ContentContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    fontSize: mq ? '32px' : '16px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-end' : 'center',
    marginLeft: '20px',
    marginRight: mq ? '32px' : '16px',
    marginTop: mq ? '48px' : '16px',
}));

function Landing({ setPage }: { setPage: (page: number) => void }) {
    const {
        isSmallerDisplay,
        setMessageDialogView,
        setMessage,
        authToken,
        setIsLoading,
        setShouldSyncMembers,
    } = useContext(AppContext);

    const onGetStartedClick = async () => {
        if (authToken) {
            setIsLoading(true);
            const res = await createFamily(authToken);
            setIsLoading(false);
            if (res.success) {
                setPage(PageState.FamilyMembers);
                setShouldSyncMembers(true);
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
                                    mq={isSmallerDisplay}
                                    onClick={onGetStartedClick}>
                                    <b>{constants.GET_STARTED}</b>
                                </GetStartedButton>
                            )}
                        </div>
                    </ContentContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ImageContainer mq={isSmallerDisplay}>
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
                        mq={isSmallerDisplay}
                        onClick={onGetStartedClick}>
                        <b>{constants.GET_STARTED}</b>
                    </GetStartedButton>
                </Container>
            )}
        </>
    );
}

export default Landing;
