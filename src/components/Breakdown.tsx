import React, { useContext } from 'react';
import { AppContext } from '../pages/_app';
import { UsageChartColors as colors } from '../util/constants';
import constants from '../util/strings/constants';
import { UsageEntry } from './UsageEntry';

export function Breakdown() {
    const { members, isSmallerDisplay } = useContext(AppContext);
    return (
        <div
            style={{
                color: '#848484',
                width: isSmallerDisplay ? '50%' : '100%',
                marginLeft: isSmallerDisplay ? '40px' : '0',
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
                    alignItems: isSmallerDisplay ? 'flex-start' : 'center',
                }}>
                {members.map((entry, index) => (
                    <UsageEntry
                        key={index}
                        index={index}
                        isSmallerDisplay={isSmallerDisplay}
                        entry={entry}
                        colors={colors}
                    />
                ))}
            </div>
        </div>
    );
}
