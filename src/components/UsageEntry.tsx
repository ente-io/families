import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { convertBytesToHumanReadable } from '../util/common';

export function UsageEntry({ colors, index, isLargerDisplay, entry }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                width: isLargerDisplay ? '80%' : '90%',
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
                        fontSize: isLargerDisplay ? '16px' : '14px',
                        marginLeft: '10px',
                    }}>
                    {entry.email}
                </div>
            </div>
            <div
                style={{
                    color: '#fff',
                    fontSize: isLargerDisplay ? '16px' : '14px',
                }}>
                {convertBytesToHumanReadable(entry.usage)}
            </div>
        </div>
    );
}
