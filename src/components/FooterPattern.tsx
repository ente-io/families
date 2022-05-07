import React from 'react';
import FooterPatternIcon from './icons/FooterPatternIcon';
import { RelativePosContainer, FadedOverlay } from './styledComponents/FooterPattern';

function FooterPattern() {
    return (
        <RelativePosContainer>
            <FadedOverlay />
            <div
                style={{
                    zIndex: -1,
                }}>
                <FooterPatternIcon
                    width={'100%'}
                    height={'100%'}
                    viewBox={'0 0 2158 197'}
                />
                <div
                    style={{
                        marginTop: '-25px',
                        marginLeft: '20px',
                    }}>
                    <FooterPatternIcon
                        width={'100%'}
                        height={'100%'}
                        viewBox={'0 0 2158 197'}
                    />
                </div>
                <div
                    style={{
                        marginTop: '-25px',
                        marginLeft: '-20px',
                    }}>
                    <FooterPatternIcon
                        width={'100%'}
                        height={'100%'}
                        viewBox={'0 0 2158 197'}
                    />
                </div>
            </div>
        </RelativePosContainer>
    );
}

export default FooterPattern;
