import { Tooltip } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { BsTrash as TrashIcon } from 'react-icons/bs';
import { IoReload as ResendIcon } from 'react-icons/io5';
import { AppContext } from '../pages/_app';
import { Member } from '../types';
import {
    removeMemberOptions,
    resendInviteOptions,
    revokeInviteOptions,
} from '../util/options/ActionDialogOptionsUtils';
import { logError } from '../util/sentry';

const StatusMap = {
    SELF: 'Admin',
    ACCEPTED: 'Member',
    INVITED: 'Invited',
};

const tooltipProps = {
    tooltip: {
        sx: {
            color: '#fff',
            backgroundColor: '#454545',
            fontWeight: 'bold',
        },
    },
};

export function MembersList({ syncMembers }) {
    const {
        isLargerDisplay,
        members,
        authToken,
        setActionDialogOptions,
        setActionDialogView,
        setMessageDialogView,
        setMessage,
    } = useContext(AppContext);

    const [membersWithoutAdmin, setMembersWithoutAdmin] = useState<Member[]>(
        []
    );

    useEffect(() => {
        setMembersWithoutAdmin(
            members.filter((member) => member.status !== 'SELF')
        );
    }, [members]);

    const handleResendInvite = (member: Member) => {
        try {
            setActionDialogOptions(
                resendInviteOptions(
                    member,
                    authToken,
                    setActionDialogView,
                    setMessage,
                    setMessageDialogView
                )
            );
            setActionDialogView(true);
        } catch (e) {
            logError(e, 'failed to resend invite');
        }
    };

    const handleRevokeInvite = (member: Member) => {
        try {
            setActionDialogOptions(
                revokeInviteOptions(
                    member,
                    authToken,
                    setActionDialogView,
                    setMessage,
                    setMessageDialogView,
                    syncMembers
                )
            );
        } catch (e) {
            logError(e, 'failed to revoke invite');
        }
    };

    const handleRemoveMember = (member: Member) => {
        try {
            setActionDialogOptions(
                removeMemberOptions(
                    member,
                    authToken,
                    setActionDialogView,
                    setMessage,
                    setMessageDialogView,
                    syncMembers
                )
            );
        } catch (e) {
            logError(e, 'failed to remove member');
        }
    };

    const handleTrashClick = (member: Member) => {
        if (member.status === 'INVITED') {
            handleRevokeInvite(member);
        } else {
            handleRemoveMember(member);
        }
        setActionDialogView(true);
    };

    return (
        <>
            {membersWithoutAdmin.map((member, index) => (
                <div style={{ width: '90%' }} key={index}>
                    <div
                        style={{
                            fontSize: isLargerDisplay ? '16px' : '12px',
                            color: '#848484',
                            fontWeight: 'bold',
                            letterSpacing: '0.4px',
                            marginBottom: '4px',
                        }}>
                        {StatusMap[member.status]}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            fontSize: isLargerDisplay ? '24px' : '16px',
                            marginBottom:
                                index === membersWithoutAdmin.length - 1
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
                                <Tooltip
                                    title="Resend Invite"
                                    placement="top"
                                    componentsProps={tooltipProps}>
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
                                </Tooltip>
                            )}
                            <Tooltip
                                title={
                                    member.status === 'INVITED'
                                        ? 'Revoke Invite'
                                        : 'Remove Member'
                                }
                                placement="top"
                                componentsProps={tooltipProps}>
                                <div
                                    style={{
                                        marginLeft: '8px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleTrashClick(member)}>
                                    <TrashIcon />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    {index !== membersWithoutAdmin.length - 1 && (
                        <div
                            style={{
                                height: '1px',
                                backgroundColor: 'rgb(234, 234, 234)',
                                marginBottom: '16px',
                            }}></div>
                    )}
                </div>
            ))}
        </>
    );
}
