import { Grid, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import customTheme from '../theme';

const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    marginLeft: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-start' : 'center',
    justifyContent: 'center',
    marginBottom: '16px',
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

function Landing({ mediaQuery }) {
    return (
        <>
            <Grid
                container
                spacing={0}
                style={{
                    marginTop: mediaQuery ? '72px' : '0px',
                }}>
                <Grid item xs={12} md={6}>
                    <ContentContainer mq={mediaQuery ? true : undefined}>
                        <div>
                            <div
                                style={{
                                    fontSize: mediaQuery ? '48px' : '32px',
                                    marginBottom: '16px',
                                    fontWeight: 700,
                                    lineHeight: mediaQuery ? '52px' : '36px',
                                }}>
                                Family
                                <br />
                                Sharing
                            </div>
                            <div
                                style={{
                                    fontSize: mediaQuery ? '20px' : '16px',
                                    lineHeight: mediaQuery ? '30px' : '24px',
                                    marginBottom: '16px',
                                    color: customTheme.palette.lightgray.main,
                                }}>
                                Introducing{' '}
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        color: customTheme.palette.primary.main,
                                    }}>
                                    Family Sharing
                                </span>
                                . <br /> Share your plan with your family
                                members. <br />
                                Each member gets their own private space.
                                <br />
                            </div>
                            {mediaQuery && (
                                <GetStartedButton
                                    variant="contained"
                                    mq={mediaQuery}>
                                    <b>Get Started</b>
                                </GetStartedButton>
                            )}
                        </div>
                    </ContentContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ImageContainer mq={mediaQuery}>
                        <div
                            style={{
                                width: mediaQuery ? '500px' : '400px',
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
            {!mediaQuery && (
                <Container
                    maxWidth={'lg'}
                    sx={{
                        textAlign: 'center',
                    }}>
                    <GetStartedButton variant="contained" mq={mediaQuery}>
                        <b>Get Started</b>
                    </GetStartedButton>
                </Container>
            )}
        </>
    );
}

export default Landing;
