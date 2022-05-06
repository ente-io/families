import { Button, Container } from '@mui/material';
import React, { useContext } from 'react';
import theme from '../theme';
import { MembersList } from './MembersList';
import { PersonIconContainer } from './styledComponents/FamilyMembers';
import { AppContext } from '../pages/_app';
import { BsPlusLg } from 'react-icons/bs';
import { MAX_FAMILY_MEMBERS } from '../util/constants';
import constants from '../util/strings/constants';

export function MembersContainer() {
    const { isLargerDisplay, members, setInviteDialogView } =
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
                        marginTop: isLargerDisplay ? '48px' : '24px',
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
                                    mq={isLargerDisplay}
                                />
                            );
                        })}
                        {[...Array(MAX_FAMILY_MEMBERS - members.length)].map(
                            (_, index) => {
                                return (
                                    <PersonIconContainer
                                        key={index}
                                        mq={isLargerDisplay}
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
                        <b> {constants.INVITE_MEMBER}</b>
                    </Button>
                </div>
                <MembersList />
                <div
                    style={{
                        marginBottom: isLargerDisplay ? '48px' : '32px',
                    }}></div>
            </div>
        </Container>
    );
}
