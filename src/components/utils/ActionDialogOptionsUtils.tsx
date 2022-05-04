import React from 'react';
import {
    inviteMember,
    removeMember,
    revokeInvite,
} from '../../services/APIService';
import theme from '../../theme';
import { ActionDialogOptions, Member } from '../../types';
import constants from '../../util/strings/constants';

export function resendInviteOptions(
    member: Member,
    authToken: string,
    setOpenActionDialog: (value: boolean) => void,
    setMessage: (msg: string) => void,
    setOpenMessageDialog: (value: boolean) => void
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
    member: Member,
    authToken: string,
    setOpenActionDialog: (value: boolean) => void,
    setMessage: (msg: string) => void,
    setOpenMessageDialog: (value: boolean) => void,
    setShouldSyncMembers: (value: boolean) => void
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
    member: Member,
    authToken: string,
    setOpenActionDialog: (value: boolean) => void,
    setMessage: (msg: string) => void,
    setOpenMessageDialog: (value: boolean) => void,
    setShouldSyncMembers: (value: boolean) => void
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
