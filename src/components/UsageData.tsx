import { Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Label, Cell } from 'recharts';
import { Breakdown } from './Breakdown';
import { UsageChartColors as colors } from '../util/constants';
import { AppContext } from '../pages/_app';
import {
    convertBytesToGBs,
    convertBytesToHumanReadable,
    sortMembersByUsageDesc,
} from '../util/common';
import CustomUsageLabel from './CustomUsageLabel';
import constants from '../util/strings/constants';

export default function UsageData() {
    const { isLargerDisplay, members, totalStorage } = useContext(AppContext);

    const [data, setData] = useState([]);
    const [usedStorage, setUsedStorage] = useState<number>(0);
    useEffect(() => {
        const sortedMembers = sortMembersByUsageDesc(members);
        setData([
            ...sortedMembers.map((member) => ({
                email: member.email,
                value: member.usage,
            })),
        ]);
        let used = 0;
        for (const member of sortedMembers) {
            used += member.usage;
        }
        setUsedStorage(used);
    }, [members]);

    return (
        <>
            <Container
                maxWidth={'md'}
                sx={{
                    padding: '10px',
                    marginTop: '32px',
                }}>
                <div
                    style={{
                        fontWeight: 'bold',
                        fontSize: isLargerDisplay ? '20px' : '18px',
                        marginBottom: isLargerDisplay ? '48px' : '24px',
                    }}>
                    {constants.TOTAL_USAGE}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                    <div
                        style={{
                            marginRight: isLargerDisplay ? '30px' : '0px',
                            marginLeft: isLargerDisplay ? '30px' : '0px',
                        }}>
                        <PieChart width={320} height={320}>
                            <Pie
                                data={data}
                                innerRadius={135}
                                outerRadius={160}
                                fill="#8884d8"
                                stroke="none"
                                paddingAngle={8}
                                dataKey="value">
                                <Label
                                    content={
                                        <CustomUsageLabel
                                            usedStorage={convertBytesToHumanReadable(
                                                usedStorage
                                            )}
                                            totalStorageInGBs={convertBytesToGBs(
                                                totalStorage
                                            )}
                                        />
                                    }
                                    position="centerBottom"
                                    fontSize="20px"
                                    fill="white"
                                />
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                    <Breakdown />
                </div>
            </Container>
        </>
    );
}
