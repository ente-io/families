import { Button, Container, styled } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../pages';
import theme from '../theme';
import { convertBytesToHumanReadable } from '../util/common';

const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    marginLeft: mq ? '16px' : '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-start' : 'center',
    justifyContent: 'center',
    marginTop: mq ? '0px' : '24px',
}));

function InviteAccepted({ familyManagerEmail, totalStorage }) {
    const { mediaQuery } = useContext(AppContext);

    const handleClick = () => {
        window.open('https://web.ente.io', '_self');
    };

    return (
        <>
            <Container
                maxWidth="md"
                style={{
                    marginTop: '50px',
                }}>
                <div
                    style={{
                        fontSize: '40px',
                        fontWeight: 700,
                    }}>
                    Congratulations!
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: mediaQuery ? 'nowrap' : 'wrap',
                    }}>
                    <div>
                        <div
                            style={{
                                marginTop: mediaQuery ? '52px' : '32px',
                                color: '#a5a5a5',
                                fontSize: '18px',
                            }}>
                            You have successfully joined{' '}
                            <span
                                style={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 'bold',
                                }}>
                                {familyManagerEmail}
                            </span>
                            's family on <b>ente</b>.
                        </div>
                        <div
                            style={{
                                marginTop: '24px',
                                color: '#a5a5a5',
                                fontSize: '18px',
                            }}>
                            You now have access to{' '}
                            <span
                                style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                }}>
                                {convertBytesToHumanReadable(totalStorage)}
                            </span>{' '}
                            of shared storage.
                        </div>
                        <div
                            style={{
                                marginTop: '24px',
                                color: '#a5a5a5',
                                fontSize: '18px',
                            }}>
                            Please open your <b>ente</b> app to backup photos
                            and videos.
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginTop: '30px',
                                width: '200px',
                            }}>
                            Open ente
                        </Button>
                    </div>
                    <ImageContainer mq={mediaQuery}>
                        <div
                            style={{
                                width: mediaQuery ? '500px' : '400px',
                                maxWidth: '90vw',
                                objectFit: 'contain',
                            }}>
                            <img
                                src="images/family_sharing.png"
                                height={'100%'}
                                width={'100%'}></img>
                        </div>
                    </ImageContainer>
                </div>
            </Container>
        </>
    );
}

export default InviteAccepted;
