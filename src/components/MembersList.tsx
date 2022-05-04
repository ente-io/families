import { Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import { BsTrash as TrashIcon } from 'react-icons/bs';
import { IoReload as ResendIcon } from 'react-icons/io5';
import { AppContext } from '../pages/_app';
import { Member } from "../types";
import {
    removeMemberOptions,
    resendInviteOptions,
    revokeInviteOptions,
} from './utils/ActionDialogOptionsUtils';

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

export function MembersList() {
    const {
        isSmallerDisplay,
        members,
        setShouldSyncMembers,
        authToken,
        setActionDialogOptions,
        setActionDialogView,
        setMessageDialogView,
        setMessage,
    } = useContext(AppContext);

    const handleResendInvite = (member: Member) => {
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
    };

    const handleRevokeInvite = (member: Member) => {
        setActionDialogOptions(
            revokeInviteOptions(
                member,
                authToken,
                setActionDialogView,
                setMessage,
                setMessageDialogView,
                setShouldSyncMembers
            )
        );
    };

    const handleRemoveMember = (member: Member) => {
        setActionDialogOptions(
            removeMemberOptions(
                member,
                authToken,
                setActionDialogView,
                setMessage,
                setMessageDialogView,
                setShouldSyncMembers
            )
        );
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
            {members.map(
                (member, index) =>
                    member.status !== 'SELF' && (
                        <div style={{ width: '90%' }} key={index}>
                            <div
                                style={{
                                    fontSize: isSmallerDisplay
                                        ? '16px'
                                        : '12px',
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
                                    fontSize: isSmallerDisplay
                                        ? '24px'
                                        : '16px',
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
                                            onClick={() =>
                                                handleTrashClick(member)
                                            }>
                                            <TrashIcon />
                                        </div>
                                    </Tooltip>
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
