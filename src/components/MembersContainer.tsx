import { Button, Container } from '@mui/material';
import React, { useContext } from 'react';
import theme from '../theme';
import { MembersList } from './MembersList';
import { PersonIconContainer } from './FamilyMembers';
import { AppContext } from '../pages';
import { BsPlusLg } from 'react-icons/bs';
import { MAX_FAMILY_MEMBERS } from '../util/constants';

export function MembersContainer() {
    const { isSmallerDisplay, members, setInviteDialogView } =
        useContext(AppContext);

    return (
        <Container
            maxWidth={'md'}
            sx={{
                padding: '10px',
                marginTop: '32px',
            }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    color: '#000',
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        marginBottom: '24px',
                        marginTop: isSmallerDisplay ? '48px' : '24px',
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginLeft: '0',
                            alignItems: 'center',
                        }}>
                        {[...Array(members.length - 1)].map((_, index) => {
                            return (
                                <PersonIconContainer
                                    fill={theme.palette.primary.main}
                                    key={index}
                                    mq={isSmallerDisplay}
                                />
                            );
                        })}
                        {[...Array(MAX_FAMILY_MEMBERS - members.length)].map(
                            (_, index) => {
                                return (
                                    <PersonIconContainer
                                        key={index}
                                        mq={isSmallerDisplay}
                                    />
                                );
                            }
                        )}
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => setInviteDialogView(true)}
                        style={{
                            textTransform: 'none',
                            height: '40px',
                        }}>
                        <BsPlusLg style={{ marginRight: '10px' }} />
                        <b> Invite member</b>
                    </Button>
                </div>
                <MembersList />
                <div
                    style={{
                        marginBottom: isSmallerDisplay ? '48px' : '32px',
                    }}></div>
            </div>
        </Container>
    );
}
