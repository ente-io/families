import React from 'react';
import FooterPatternIcon from './icons/FooterPatternIcon';
import {
    RelativePosContainer,
    FadedOverlay,
} from './styledComponents/FooterPattern';

function FooterPattern() {
    return (
        <RelativePosContainer>
            <FadedOverlay />
            <div
                style={{
                    zIndex: -1,
                }}>
                <FooterPatternIcon />
                <div
                    style={{
                        marginTop: '-25px',
                    }}>
                    <FooterPatternIcon x="100" />
                </div>
                <div
                    style={{
                        marginTop: '-25px',
                    }}>
                    <FooterPatternIcon x="-100" viewBox="0 0 2158 175" />
                </div>
            </div>
        </RelativePosContainer>
    );
}

export default FooterPattern;
