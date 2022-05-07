import { Grid, Container } from '@mui/material';
import React, { useContext } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import InviteDialog from '../components/InviteDialog';
import { MembersContainer } from '../components/MembersContainer';
import UsageData from '../components/UsageData';
import {
    ContentContainer,
    InviteButton,
    ImageContainer,
    NoMembersInviteLine,
    BgImageContainer,
} from '../components/styledComponents/FamilyMembers';
import theme from '../theme';
import constants from '../util/strings/constants';
import { AppContext } from './_app';
import FooterPatternIcon from '../components/icons/FooterPatternIcon';
import FooterPattern from '../components/FooterPattern';

function Members() {
    const {
        isLargerDisplay,
        familyManagerEmail,
        members,
        inviteDialogView,
        setInviteDialogView,
    } = useContext(AppContext);
    return (
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
                                {constants.MEMBERS}
                            </div>
                            <div
                                style={{
                                    fontSize: isLargerDisplay ? '20px' : '16px',
                                    lineHeight: isLargerDisplay
                                        ? '30px'
                                        : '24px',
                                    marginBottom: isLargerDisplay
                                        ? '60px'
                                        : '30px',
                                    color: theme.palette.lightgray.main,
                                }}>
                                {constants.INVITE_UPTO} <b>5</b>{' '}
                                {constants.MEMBERS_LOWERCASE}
                            </div>
                            <div
                                style={{
                                    fontSize: isLargerDisplay ? '16px' : '12px',
                                    color: theme.palette.primary.main,
                                    marginBottom: '8px',
                                }}>
                                {constants.FAMILY_MANAGER}
                            </div>
                            <div
                                style={{
                                    fontSize: isLargerDisplay ? '24px' : '16px',
                                }}>
                                {familyManagerEmail}
                            </div>
                            {isLargerDisplay && members.length === 1 && (
                                <InviteButton
                                    variant="contained"
                                    onClick={() => setInviteDialogView(true)}
                                    mq={isLargerDisplay}>
                                    <BsPlusLg style={{ marginRight: '10px' }} />
                                    <b> Invite Member</b>
                                </InviteButton>
                            )}
                        </div>
                    </ContentContainer>
                </Grid>
                {(isLargerDisplay || members.length === 1) && (
                    <Grid item xs={12} md={6}>
                        <ImageContainer mq={isLargerDisplay}>
                            <BgImageContainer mq={isLargerDisplay}>
                                <div
                                    style={{
                                        marginTop: '40px',
                                        width: isLargerDisplay
                                            ? '400px'
                                            : '300px',
                                        maxWidth: '100%',
                                        objectFit: 'contain',
                                    }}>
                                    <img
                                        src="images/add_family.png"
                                        height={'100%'}
                                        width={'100%'}></img>
                                </div>
                            </BgImageContainer>
                        </ImageContainer>
                    </Grid>
                )}
                {!isLargerDisplay && members.length === 1 && (
                    <Container
                        maxWidth={'lg'}
                        sx={{
                            textAlign: 'center',
                        }}>
                        <InviteButton
                            variant="contained"
                            onClick={() => setInviteDialogView(true)}
                            mq={isLargerDisplay}>
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
            <InviteDialog
                open={inviteDialogView}
                setOpen={setInviteDialogView}
            />
            {members?.length === 1 && isLargerDisplay && (
                <>
                    <NoMembersInviteLine>
                        {constants.INVITE_YOUR_LOVED_ONES}
                    </NoMembersInviteLine>
                    <FooterPattern />
                </>
            )}
        </>
    );
}

export default Members;
