import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { convertBytesToHumanReadable } from '../util/common';

export function UsageEntry({ colors, index, isSmallerDisplay, entry }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                width: isSmallerDisplay ? '80%' : '90%',
            }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <FaCircle color={colors[index % colors.length]} />
                <div
                    style={{
                        fontSize: isSmallerDisplay ? '16px' : '12px',
                        marginLeft: '10px',
                    }}>
                    {entry.email}
                </div>
            </div>
            <div
                style={{
                    color: '#fff',
                    fontSize: isSmallerDisplay ? '16px' : '12px',
                }}>
                {convertBytesToHumanReadable(entry.usage)}
            </div>
        </div>
    );
}
