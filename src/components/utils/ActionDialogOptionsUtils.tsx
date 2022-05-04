import React from 'react';
import {
    inviteMember,
    removeMember,
    revokeInvite,
} from '../../services/APIService';
import theme from '../../theme';
import constants from '../../util/strings/constants';
import { ActionDialogOptions } from '../ActionDialog';

export function resendInviteOptions(
    member,
    authToken,
    setOpenActionDialog,
    setMessage,
    setOpenMessageDialog
): ActionDialogOptions {
    return {
        title: constants.RESEND_INVITE,
        msg: (
            <>
                {constants.RESEND_INVITE_MESSAGE}{' '}
                <span
                    style={{
                        color: theme.palette.primary.main,
                    }}>
                    {member.email}
                </span>
                ?
            </>
        ),
        defaultText: constants.INVITE,
        onDefaultClick: async () => {
            const res = await inviteMember(authToken, member.email);
            setOpenActionDialog(false);
            if (!res.success) {
                setMessage(constants.SORRY_SOMETHING_WENT_WRONG);
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
        title: constants.REVOKE_INVITE,
        msg: (
            <>
                {constants.REVOKE_INVITE_MESSAGE}{' '}
                <span
                    style={{
                        color: theme.palette.primary.main,
                    }}>
                    {member.email}
                </span>
                ?
            </>
        ),
        defaultText: constants.CANCEL,
        onDefaultClick: async () => {
            setOpenActionDialog(false);
        },
        warningText: constants.REVOKE,
        onWarningClick: async () => {
            const res = await revokeInvite(authToken, member.id);
            setOpenActionDialog(false);
            if (res.success) {
                setMessage(constants.INVITE_REVOKED);
                setOpenMessageDialog(true);
                setShouldSyncMembers(true);
            } else {
                setMessage(constants.SORRY_SOMETHING_WENT_WRONG);
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
        title: constants.REMOVE_MEMBER,
        msg: (
            <>
                {constants.REMOVE_MEMBER_MESSAGE}{' '}
                <span
                    style={{
                        color: theme.palette.primary.main,
                    }}>
                    {member.email}
                </span>
                ?
            </>
        ),
        defaultText: constants.CANCEL,
        onDefaultClick: async () => {
            setOpenActionDialog(false);
        },
        warningText: constants.REMOVE,
        onWarningClick: async () => {
            const res = await removeMember(authToken, member.id);
            setOpenActionDialog(false);
            if (res.success) {
                setMessage(constants.MEMBER_REMOVED);
                setOpenMessageDialog(true);
                setShouldSyncMembers(true);
            } else {
                setMessage(constants.SORRY_SOMETHING_WENT_WRONG);
                setOpenMessageDialog(true);
            }
        },
    };
}
