import React, { useContext } from 'react';
import { BsTrash as TrashIcon } from 'react-icons/bs';
import { IoReload as ResendIcon } from 'react-icons/io5';
import { AppContext, Member } from '../pages';
import {
    inviteMember,
    removeMember,
    revokeInvite,
} from '../services/APIService';
import theme from '../theme';

const StatusMap = {
    SELF: 'Admin',
    ACCEPTED: 'Member',
    INVITED: 'Invited',
};

export function MembersList() {
    const {
        mediaQuery,
        members,
        setShouldSyncMembers,
        authToken,
        setActionDialogOptions,
        setOpenActionDialog,
        setOpenMessageDialog,
        setMessage,
    } = useContext(AppContext);

    const handleResendInvite = (member: Member) => {
        setActionDialogOptions({
            title: 'Resend Invite?',
            msg: (
                <>
                    Are you sure that you want to resend an invite to{' '}
                    <span
                        style={{
                            color: theme.palette.primary.main,
                        }}>
                        {member.email}
                    </span>
                    ?
                </>
            ),
            defaultText: 'Invite',
            onDefaultClick: async () => {
                const res = await inviteMember(authToken, member.email);
                setOpenActionDialog(false);
                if (!res.success) {
                    setMessage('Sorry, something went wrong.');
                    setOpenMessageDialog(true);
                }
            },
        });
        setOpenActionDialog(true);
    };

    const handleRevokeInvite = (member: Member) => {
        setActionDialogOptions({
            title: 'Revoke Invite?',
            msg: (
                <>
                    Are you sure that you want to revoke invite to{' '}
                    <span
                        style={{
                            color: theme.palette.primary.main,
                        }}>
                        {member.email}
                    </span>
                    ?
                </>
            ),
            defaultText: 'Cancel',
            onDefaultClick: async () => {
                setOpenActionDialog(false);
            },
            warningText: 'Revoke',
            onWarningClick: async () => {
                const res = await revokeInvite(authToken, member.id);
                setOpenActionDialog(false);
                if (res.success) {
                    setMessage('Invite revoked.');
                    setOpenMessageDialog(true);
                    setShouldSyncMembers(true);
                } else {
                    setMessage('Sorry, something went wrong.');
                    setOpenMessageDialog(true);
                }
            },
        });
    };

    const handleRemoveMember = (member: Member) => {
        setActionDialogOptions({
            title: 'Remove member?',
            msg: (
                <>
                    Are you sure that you want to remove{' '}
                    <span
                        style={{
                            color: theme.palette.primary.main,
                        }}>
                        {member.email}
                    </span>
                    ?
                </>
            ),
            defaultText: 'Cancel',
            onDefaultClick: async () => {
                setOpenActionDialog(false);
            },
            warningText: 'Remove',
            onWarningClick: async () => {
                const res = await removeMember(authToken, member.id);
                setOpenActionDialog(false);
                if (res.success) {
                    setMessage('Member removed.');
                    setOpenMessageDialog(true);
                    setShouldSyncMembers(true);
                } else {
                    setMessage('Sorry, something went wrong.');
                    setOpenMessageDialog(true);
                }
            },
        });
    };

    const handleTrashClick = (member: Member) => {
        if (member.status === 'INVITED') {
            handleRevokeInvite(member);
        } else {
            handleRemoveMember(member);
        }
        setOpenActionDialog(true);
    };

    return (
        <>
            {members.map(
                (member, index) =>
                    member.status !== 'SELF' && (
                        <div style={{ width: '90%' }} key={index}>
                            <div
                                style={{
                                    fontSize: mediaQuery ? '16px' : '12px',
                                    color: '#7d7d7d',
                                    fontWeight: 'bold',
                                    marginBottom: '4px',
                                }}>
                                {StatusMap[member.status]}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    fontSize: mediaQuery ? '24px' : '16px',
                                    marginBottom:
                                        index === members.length - 1
                                            ? '0px'
                                            : '16px',
                                }}>
                                <div>{member.email}</div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        color: '#7d7d7d',
                                    }}>
                                    {member.status !== 'ACCEPTED' && (
                                        <div
                                            style={{
                                                marginLeft: '8px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                handleResendInvite(member)
                                            }>
                                            <ResendIcon />
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            marginLeft: '8px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            handleTrashClick(member)
                                        }>
                                        <TrashIcon />
                                    </div>
                                </div>
                            </div>
                            {index !== members.length - 1 && (
                                <div
                                    style={{
                                        height: '2px',
                                        backgroundColor: '#7d7d7d',
                                        marginBottom: '16px',
                                    }}></div>
                            )}
                        </div>
                    )
            )}
        </>
    );
}
