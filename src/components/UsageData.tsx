import { Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Label, Cell } from 'recharts';
import { Breakdown } from './Breakdown';
import { UsageChartColors as colors } from '../util/constants';
import { AppContext } from '../pages';

export default function UsageData() {
    const { mediaQuery, members } = useContext(AppContext);

    const [data, setData] = useState([]);
    useEffect(() => {
        setData([
            ...members.map((member) => ({
                email: member.email,
                value: member.usage,
            })),
        ]);
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
                        fontSize: mediaQuery ? '20px' : '18px',
                        marginBottom: mediaQuery ? '48px' : '24px',
                    }}>
                    Total Usage
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
                            marginRight: mediaQuery ? '30px' : '0px',
                            marginLeft: '30px',
                        }}>
                        <PieChart width={320} height={320}>
                            <Pie
                                data={data}
                                innerRadius={135}
                                outerRadius={160}
                                fill="#8884d8"
                                paddingAngle={8}
                                dataKey="value">
                                <Label
                                    value="78 GB/ 100 GB"
                                    position="center"
                                    fontSize="20px"
                                    fill="white"
                                />

                                {data.map((entry, index) => (
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
