import React, { useContext, useEffect, useState } from 'react';
import { BsTrash as TrashIcon } from 'react-icons/bs';
import { IoReload as ResendIcon } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { AppContext } from '../pages/_app';
import { Member } from '../types';
import {
    removeMemberOptions,
    resendInviteOptions,
    revokeInviteOptions,
} from '../util/options/ActionDialogOptionsUtils';
import { logError } from '../util/sentry';
import EditDialog from './EditDialog';
import { convertBytesToGBs } from '../util/common';

const StatusMap = {
    SELF: 'Admin',
    ACCEPTED: 'Member',
    INVITED: 'Invited',
};

export default function MembersList({ syncMembers }) {
    const {
        isLargerDisplay,
        members,
        authToken,
        setActionDialogOptions,
        setActionDialogView,
        setMessageDialogView,
        setMessage,
    } = useContext(AppContext);

    const [editDialog, setEditDialog] = useState(false);
    const [membersWithoutAdmin, setMembersWithoutAdmin] = useState<Member[]>(
        []
    );
    const [selectedMemberID, setSelectedMemberID] = useState<string>(null);
    const [selectedMemLimit, setSelectedMemLimit] = useState<number | null>(
        null
    );
    const [selectedMemUsage, setSelectedMemUsage] = useState<number>(null);

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

    const handleStorageUpdated = (memberId, newLimit) => {
        setSelectedMemLimit(newLimit === null ? null : newLimit);

        const updatedMembers = members.map((member) => {
            if (member.id === memberId) {
                return {
                    ...member,
                    storageLimit: newLimit === null ? null : newLimit,
                };
            }
            return member;
        });

        syncMembers();
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

    const handleEditClick = (member: Member) => {
        setSelectedMemberID(member.id);
        setSelectedMemLimit(member.storageLimit);
        setSelectedMemUsage(member.usage);

        if (member.status === 'ACCEPTED') {
            setEditDialog(true);
        } else {
            setEditDialog(false);
        }
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
                                <div
                                    style={{
                                        marginLeft: '8px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleResendInvite(member)}>
                                    <ResendIcon />
                                </div>
                            )}
                            {member.status === 'ACCEPTED' ? (
                                <div>
                                    <div
                                        style={{
                                            marginLeft: '8px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleEditClick(member)}>
                                        <MdOutlineEdit />
                                    </div>
                                    <EditDialog
                                        open={editDialog}
                                        setOpen={setEditDialog}
                                        memberID={selectedMemberID}
                                        prevLimit={
                                            selectedMemLimit === null
                                                ? null
                                                : convertBytesToGBs(
                                                      selectedMemLimit
                                                  )
                                        }
                                        memberUsage={convertBytesToGBs(
                                            selectedMemUsage
                                        )}
                                        onStorageUpdated={handleStorageUpdated}
                                    />
                                </div>
                            ) : (
                                <span></span>
                            )}
                            <div
                                style={{
                                    marginLeft: '8px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleTrashClick(member)}>
                                <TrashIcon />
                            </div>
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
