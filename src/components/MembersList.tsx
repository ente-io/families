import React, { useContext } from 'react';
import { BsTrash as TrashIcon } from 'react-icons/bs';
import { IoReload as ResendIcon } from 'react-icons/io5';
import { AppContext } from '../pages';

export function MembersList() {
    const { mediaQuery, members } = useContext(AppContext);

    return (
        <>
            {members.map(
                (member, index) =>
                    member.status !== 'Admin' && (
                        <div style={{ width: '90%' }} key={index}>
                            <div
                                style={{
                                    fontSize: mediaQuery ? '16px' : '12px',
                                    color: '#7d7d7d',
                                    fontWeight: 'bold',
                                    marginBottom: '4px',
                                }}>
                                {member.status}
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
                                    {member.status !== 'Member' && (
                                        <div
                                            style={{
                                                marginLeft: '8px',
                                                cursor: 'pointer',
                                            }}>
                                            <ResendIcon />
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            marginLeft: '8px',
                                            cursor: 'pointer',
                                        }}>
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
