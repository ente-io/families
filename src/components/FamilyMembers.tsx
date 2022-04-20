import { Grid, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import customTheme from '../theme';
import UsageData from './UsageData';
import PersonIcon from './icons/PersonIcon';
import { MembersContainer } from './MembersContainer';
import { AppContext } from '../pages';
import { BsPlusLg } from 'react-icons/bs';

const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-start' : 'center',
    justifyContent: 'center',
}));

const InviteButton = styled(Button)<{ mq: boolean }>(({ mq }) => ({
    width: mq ? '70%' : '250px',
    maxWidth: '100%',
    fontSize: '20px',
    textTransform: 'none',
    marginTop: mq ? '64px' : '0px',
    marginBottom: '32px',
}));

const ContentContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    fontSize: mq ? '32px' : '16px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-end' : 'flex-start',
    marginLeft: '20px',
    marginRight: mq ? '96px' : '16px',
    marginTop: mq ? '48px' : '16px',
}));

export const PersonIconContainer = ({
    fill,
    mq,
}: {
    fill?: string;
    mq: boolean;
}) => {
    return (
        <div
            style={{
                marginRight: mq ? '8px' : '4px',
            }}>
            <PersonIcon fill={fill ? fill : undefined} />
        </div>
    );
};

function FamilyMembers() {
    const { mediaQuery, familyManagerEmail, members, setOpenInviteDialog } =
        useContext(AppContext);

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
                                Members
                            </div>
                            <div
                                style={{
                                    fontSize: mediaQuery ? '20px' : '16px',
                                    lineHeight: mediaQuery ? '30px' : '24px',
                                    marginBottom: mediaQuery ? '60px' : '30px',
                                    color: customTheme.palette.lightgray.main,
                                }}>
                                You can invite upto <b>5</b> members
                            </div>
                            <div
                                style={{
                                    fontSize: mediaQuery ? '16px' : '12px',
                                    color: customTheme.palette.primary.main,
                                    marginBottom: '8px',
                                }}>
                                Family Manager
                            </div>
                            <div
                                style={{
                                    fontSize: mediaQuery ? '24px' : '16px',
                                }}>
                                {familyManagerEmail}
                            </div>
                            {mediaQuery && members.length === 1 && (
                                <InviteButton
                                    variant="contained"
                                    onClick={() => setOpenInviteDialog(true)}
                                    mq={mediaQuery}>
                                    <BsPlusLg style={{ marginRight: '10px' }} />
                                    <b> Invite Member</b>
                                </InviteButton>
                            )}
                        </div>
                    </ContentContainer>
                </Grid>
                {(mediaQuery || members.length === 1) && (
                    <Grid item xs={12} md={6}>
                        <ImageContainer mq={mediaQuery}>
                            <div
                                style={{
                                    marginTop: '40px',
                                    width: mediaQuery ? '400px' : '300px',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                }}>
                                <img
                                    src="images/add_family.png"
                                    height={'100%'}
                                    width={'100%'}></img>
                            </div>
                        </ImageContainer>
                    </Grid>
                )}
                {!mediaQuery && members.length === 1 && (
                    <Container
                        maxWidth={'lg'}
                        sx={{
                            textAlign: 'center',
                        }}>
                        <InviteButton
                            variant="contained"
                            onClick={() => setOpenInviteDialog(true)}
                            mq={mediaQuery}>
                            <b>Invite</b>
                        </InviteButton>
                        <div
                            style={{
                                fontSize: '12px',
                                color: '#9F9F9F',
                            }}>
                            Invite your loved ones to share your storage plan.
                        </div>
                    </Container>
                )}
            </Grid>
            {members?.length > 1 && (
                <>
                    <MembersContainer />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '32px',
                        }}>
                        <UsageData />
                    </div>
                </>
            )}
        </>
    );
}

export default FamilyMembers;
