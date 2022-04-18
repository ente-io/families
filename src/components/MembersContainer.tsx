import { Button, Container } from '@mui/material';
import React, { useContext } from 'react';
import customTheme from '../theme';
import { MembersList } from './MembersList';
import { PersonIconContainer } from './FamilyMembers';
import { AppContext } from '../pages';
import { BsPlusLg } from 'react-icons/bs';

export function MembersContainer() {
    const { mediaQuery, members, setOpenInviteDialog } = useContext(AppContext);

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
                        marginTop: mediaQuery ? '48px' : '24px',
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginLeft: '0',
                            alignItems: 'center',
                        }}>
                        {members.map((member, index) =>
                            member.status === 'ACCEPTED' ||
                            member.status === 'SELF' ? (
                                <PersonIconContainer
                                    fill={customTheme.palette.primary.main}
                                    key={index}
                                    mq={mediaQuery}
                                />
                            ) : (
                                <PersonIconContainer
                                    key={index}
                                    mq={mediaQuery}
                                />
                            )
                        )}
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => setOpenInviteDialog(true)}
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
                        marginBottom: mediaQuery ? '48px' : '32px',
                    }}></div>
            </div>
        </Container>
    );
}
