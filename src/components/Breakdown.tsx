import React, { useContext } from 'react';
import { AppContext } from '../pages/_app';
import { sortMembersByUsageDesc } from '../util/common';
import { UsageChartColors as colors } from '../util/constants';
import constants from '../util/strings/constants';
import { UsageEntry } from './UsageEntry';

export function Breakdown() {
    const { members, isLargerDisplay } = useContext(AppContext);
    const sortedMembers = sortMembersByUsageDesc(members);
    return (
        <div
            style={{
                color: '#848484',
                width: isLargerDisplay ? '50%' : '100%',
                marginLeft: isLargerDisplay ? '40px' : '0',
            }}>
            <div
                style={{
                    fontSize: '16px',
                    marginTop: '24px',
                    marginBottom: '32px',
                    fontWeight: 'bold',
                }}>
                {constants.BREAKDOWN}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isLargerDisplay ? 'flex-start' : 'center',
                }}>
                {sortedMembers.map((entry, index) => (
                    <UsageEntry
                        key={index}
                        index={index}
                        isLargerDisplay={isLargerDisplay}
                        entry={entry}
                        colors={colors}
                    />
                ))}
            </div>
        </div>
    );
}
