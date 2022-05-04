import { Grid, Container } from '@mui/material';
import React, { useContext } from 'react';
import theme from '../theme';
import UsageData from './UsageData';
import { MembersContainer } from './MembersContainer';
import { AppContext } from '../pages/_app';
import { BsPlusLg } from 'react-icons/bs';
import constants from '../util/strings/constants';
import { ContentContainer, InviteButton, ImageContainer } from '../styles/FamilyMembers';

function FamilyMembers() {
    const {
        isSmallerDisplay,
        familyManagerEmail,
        members,
        setInviteDialogView,
    } = useContext(AppContext);

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
                                {constants.MEMBERS}
                            </div>
                            <div
                                style={{
                                    fontSize: isSmallerDisplay
                                        ? '20px'
                                        : '16px',
                                    lineHeight: isSmallerDisplay
                                        ? '30px'
                                        : '24px',
                                    marginBottom: isSmallerDisplay
                                        ? '60px'
                                        : '30px',
                                    color: theme.palette.lightgray.main,
                                }}>
                                {constants.INVITE_UPTO} <b>5</b>{' '}
                                {constants.MEMBERS_LOWERCASE}
                            </div>
                            <div
                                style={{
                                    fontSize: isSmallerDisplay
                                        ? '16px'
                                        : '12px',
                                    color: theme.palette.primary.main,
                                    marginBottom: '8px',
                                }}>
                                {constants.FAMILY_MANAGER}
                            </div>
                            <div
                                style={{
                                    fontSize: isSmallerDisplay
                                        ? '24px'
                                        : '16px',
                                }}>
                                {familyManagerEmail}
                            </div>
                            {isSmallerDisplay && members.length === 1 && (
                                <InviteButton
                                    variant="contained"
                                    onClick={() => setInviteDialogView(true)}
                                    mq={isSmallerDisplay}>
                                    <BsPlusLg style={{ marginRight: '10px' }} />
                                    <b> Invite Member</b>
                                </InviteButton>
                            )}
                        </div>
                    </ContentContainer>
                </Grid>
                {(isSmallerDisplay || members.length === 1) && (
                    <Grid item xs={12} md={6}>
                        <ImageContainer mq={isSmallerDisplay}>
                            <div
                                style={{
                                    marginTop: '40px',
                                    width: isSmallerDisplay ? '400px' : '300px',
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
                {!isSmallerDisplay && members.length === 1 && (
                    <Container
                        maxWidth={'lg'}
                        sx={{
                            textAlign: 'center',
                        }}>
                        <InviteButton
                            variant="contained"
                            onClick={() => setInviteDialogView(true)}
                            mq={isSmallerDisplay}>
                            <b>Invite</b>
                        </InviteButton>
                        <div
                            style={{
                                fontSize: '12px',
                                color: '#9F9F9F',
                            }}>
                            {constants.INVITE_YOUR_LOVED_ONES}
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
