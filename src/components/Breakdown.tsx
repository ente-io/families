import React, { useContext } from 'react';
import { FaCircle } from 'react-icons/fa';
import { AppContext } from '../pages';
import { convertBytesToHumanReadable } from '../util/common';
import { UsageChartColors as colors } from '../util/constants';

export function Breakdown() {
    const { members, mediaQuery } = useContext(AppContext);
    return (
        <div
            style={{
                color: '#848484',
                width: mediaQuery ? '50%' : '100%',
                marginLeft: mediaQuery ? '40px' : '0',
            }}>
            <div
                style={{
                    fontSize: '16px',
                    marginTop: '24px',
                    marginBottom: '32px',
                    fontWeight: 'bold',
                }}>
                Breakdown
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: mediaQuery ? 'flex-start' : 'center',
                }}>
                {members.map((entry, index) => (
                    <UsageEntry
                        key={index}
                        index={index}
                        mediaQuery={mediaQuery}
                        entry={entry}
                        colors={colors}
                    />
                ))}
            </div>
        </div>
    );
}
function UsageEntry({ colors, index, mediaQuery, entry }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                width: mediaQuery ? '80%' : '90%',
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
                        fontSize: mediaQuery ? '16px' : '12px',
                        marginLeft: '10px',
                    }}>
                    {entry.email}
                </div>
            </div>
            <div
                style={{
                    color: '#fff',
                    fontSize: mediaQuery ? '16px' : '12px',
                }}>
                {convertBytesToHumanReadable(entry.usage)}
            </div>
        </div>
    );
}
