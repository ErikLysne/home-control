import React from "react";
import styled, { keyframes } from "styled-components";
import IconContainer from "./IconContainer";
import iconBigGear from "./images/BigGear.png";
import iconSmallGear from "./images/SmallGear.png";

const BigGear = styled.div`
    width: 48px;
    height: 48px;
    position: absolute;
    top: 6px;
    left: 6px;
    background-image: url(${iconBigGear});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    animation: ${() => spinnerKeyframes};
    animation-duration: 12s;
    animation-direction: reverse;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

const SmallGear = styled.div`
    width: 28px;
    height: 28px;
    position: absolute;
    bottom: 6px;
    right: 6px;
    background-image: url(${iconSmallGear});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    animation: ${() => spinnerKeyframes};
    animation-duration: 6s;
    animation-direction: normal;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

const spinnerKeyframes = keyframes`
    0% {
        transform: rotateZ(0);
    }
    100% {
        transform: rotateZ(360deg);
    }
`;

export default function SettingsIcon() {
    return (
        <IconContainer>
            <BigGear />
            <SmallGear />
        </IconContainer>
    );
}
