import { Container, Button } from '@mui/material';
import React, { useContext } from 'react';
import { ImageContainer } from '../components/styledComponents/InviteAccepted';
import { getWebEndpoint } from '../services/APIService';
import theme from '../theme';
import { convertBytesToHumanReadable } from '../util/common';
import { isDeviceMobile } from '../util/common/deviceDetection';
import constants from '../util/strings/constants';
import { AppContext } from './_app';

function Invite() {
    const { isLargerDisplay, familyManagerEmail, totalStorage } =
        useContext(AppContext);

    const handleClick = () => {
        if (isDeviceMobile()) {
            window.location.href = 'ente://home';
            setTimeout(function () {
                window.location.href = getWebEndpoint();
            }, 250);
        } else {
            window.location.href = getWebEndpoint();
        }
    };
    return (
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
                    flexWrap: isLargerDisplay ? 'nowrap' : 'wrap',
                }}>
                <div>
                    <div
                        style={{
                            marginTop: isLargerDisplay ? '52px' : '32px',
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
                <ImageContainer mq={isLargerDisplay}>
                    <div
                        style={{
                            width: isLargerDisplay ? '500px' : '400px',
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
    );
}

export default Invite;
