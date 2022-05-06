import React from 'react';

export default function PersonIcon(props) {
    return (
        <svg
            width={props.width}
            height={props.height}
            viewBox={props.viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.9456" cy="5.69608" r="5.69608" fill={props.fill} />
            <ellipse
                cx="10.9447"
                cy="19.9367"
                rx="9.96814"
                ry="7.1201"
                fill={props.fill}
            />
        </svg>
    );
}

PersonIcon.defaultProps = {
    height: 16,
    width: 16,
    viewBox: '0 0 24 24',
    fill: '#3D3D3D',
};
