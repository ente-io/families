import React from 'react';
import constants from '../util/strings/constants';

function CustomUsageLable({ usedStorage, totalStorageInGBs }) {
    return (
        <svg>
            <defs>
                <linearGradient id="circleGradient" x1="100%" y1="100%">
                    <stop offset="5%" stop-color="#292929" />
                    <stop offset="95%" stop-color="#4D544A" />
                </linearGradient>
            </defs>
            <circle cx="160" cy="160" r="110" fill="url(#circleGradient)" />
            <text
                x="160"
                y="160"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="20"
                fontWeight="bold">
                <tspan>{usedStorage} / </tspan>
                <tspan fill="#8b8b8b">{totalStorageInGBs} GB</tspan>
            </text>
            <text
                x="160"
                y="190"
                textAnchor="middle"
                fill="#8b8b8b"
                fontSize="20"
                fontWeight="bold">
                {constants.USED}
            </text>
        </svg>
    );
}

export default CustomUsageLable;
