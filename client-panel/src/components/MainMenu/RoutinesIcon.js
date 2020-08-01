import React from "react";
import styled, { keyframes } from "styled-components";
import IconContainer from "./IconContainer";
import iconClockBackground from "./images/ClockBackground.png";
import iconClockHandBig from "./images/ClockHandBig.png";

const Background = styled.div`
    width: 53px;
    height: 53px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-image: url(${iconClockBackground});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const BigHand = styled.div`
    width: 16px;
    height: 4px;
    position: absolute;
    top: 36px;
    left: 36px;
    transform-origin: 2px 2px;
    background-image: url(${iconClockHandBig});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    animation: ${() => spinnerKeyframes};
    animation-duration: 12s;
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

export default function RoutinesIcon() {
    return (
        <IconContainer>
            <Background />
            <BigHand />
        </IconContainer>
    );
}
