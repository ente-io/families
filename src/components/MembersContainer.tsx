import { Button, Container } from '@mui/material';
import React from 'react';
import customTheme from '../theme';
import { MembersList } from './MembersList';
import { PersonIconContainer } from './FamilyMembers';

export function MembersContainer({ mediaQuery, members }) {
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
                            member.status === 'Member' ||
                            member.status === 'Admin' ? (
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
                        style={{
                            textTransform: 'none',
                            height: '40px',
                        }}>
                        <b>+ Invite member</b>
                    </Button>
                </div>
                <MembersList mediaQuery={mediaQuery} members={members} />
                <div
                    style={{
                        marginBottom: mediaQuery ? '48px' : '32px',
                    }}></div>
            </div>
        </Container>
    );
}
