import React from "react";
import styled, { keyframes } from "styled-components";
import IconContainer from "./IconContainer";
import iconBulbBase from "./images/BulbBase.png";
import iconBulbLight from "./images/BulbLight.png";

const BulbBase = styled.div`
    width: 23px;
    height: 30px;
    position: absolute;
    top: 31px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url(${iconBulbBase});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const BulbLight = styled.div`
    width: 30px;
    height: 14px;
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
    mask-image: url(${iconBulbLight});
    mask-mode: alpha;
    overflow: hidden;
`;

const BulbColor = styled.div`
    width: 45px;
    height: 45px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(253, 239, 158, 1) 25%,
        rgba(250, 214, 110, 1) 50%,
        rgba(237, 31, 121, 1) 75%,
        rgba(132, 198, 84, 1) 100%
    );
    animation: ${() => rotateGradient};
    animation-duration: 6s;
    animation-direction: normal;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

const rotateGradient = () => keyframes`
    0% {
        transform: translateX(-50%) translateY(-50%) rotateZ(0deg);
    }

    100% {
        transform: translateX(-50%) translateY(-50%) rotateZ(360deg);
    }
`;

export default function LightIcon() {
    return (
        <IconContainer>
            <BulbBase />
            <BulbLight>
                <BulbColor />
            </BulbLight>
        </IconContainer>
    );
}
