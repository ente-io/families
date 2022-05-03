import React, { useContext } from 'react';
import { AppContext } from '../pages';
import { UsageChartColors as colors } from '../util/constants';
import { UsageEntry } from './UsageEntry';

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
