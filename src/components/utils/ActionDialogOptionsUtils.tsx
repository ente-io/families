import React from 'react';
import {
    inviteMember,
    removeMember,
    revokeInvite,
} from '../../services/APIService';
import theme from '../../theme';
import { ActionDialogOptions } from '../ActionDialog';

export function resendInviteOptions(
    member,
    authToken,
    setOpenActionDialog,
    setMessage,
    setOpenMessageDialog
): ActionDialogOptions {
    return {
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
    };
}

export function revokeInviteOptions(
    member,
    authToken,
    setOpenActionDialog,
    setMessage,
    setOpenMessageDialog,
    setShouldSyncMembers
): ActionDialogOptions {
    return {
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
    };
}

export function removeMemberOptions(
    member,
    authToken,
    setOpenActionDialog,
    setMessage,
    setOpenMessageDialog,
    setShouldSyncMembers
): ActionDialogOptions {
    return {
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
    };
}
