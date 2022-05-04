import { Button, Container, styled } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../pages/_app';
import theme from '../theme';
import { convertBytesToHumanReadable } from '../util/common';
import constants from '../util/strings/constants';

const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    marginLeft: mq ? '16px' : '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-start' : 'center',
    justifyContent: 'center',
    marginTop: mq ? '0px' : '24px',
}));

function InviteAccepted() {
    const { isSmallerDisplay, familyManagerEmail, totalStorage } =
        useContext(AppContext);

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
                    {constants.CONGRATULATIONS}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: isSmallerDisplay ? 'nowrap' : 'wrap',
                    }}>
                    <div>
                        <div
                            style={{
                                marginTop: isSmallerDisplay ? '52px' : '32px',
                                color: '#a5a5a5',
                                fontSize: '18px',
                            }}>
                            {constants.SUCCESSFULLY_JOINED}{' '}
                            <span
                                style={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 'bold',
                                }}>
                                {familyManagerEmail}
                            </span>
                            {constants.FAMILY_ON} <b>{constants.ENTE}</b>.
                        </div>
                        <div
                            style={{
                                marginTop: '24px',
                                color: '#a5a5a5',
                                fontSize: '18px',
                            }}>
                            {constants.YOU_NOW_HAVE_ACCESS}{' '}
                            <span
                                style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                }}>
                                {convertBytesToHumanReadable(totalStorage)}
                            </span>{' '}
                            {constants.OF_SHARED_STORAGE}
                        </div>
                        <div
                            style={{
                                marginTop: '24px',
                                color: '#a5a5a5',
                                fontSize: '18px',
                            }}>
                            {constants.PLEASE_OPEN_ENTE} <b>{constants.ENTE}</b>{' '}
                            {constants.BACKUP_PHOTOS_AND_VIDEOS}
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
                            {constants.OPEN_ENTE}
                        </Button>
                    </div>
                    <ImageContainer mq={isSmallerDisplay}>
                        <div
                            style={{
                                width: isSmallerDisplay ? '500px' : '400px',
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
