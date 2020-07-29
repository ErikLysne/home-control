import React from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    background-color: ${(props) => props.theme.boxBackgroundColor};
    box-shadow: ${(props) => props.theme.boxInnerShadow};

    &:active {
        width: 105%;
        height: 105%;
    }
`;

const Label = styled.p`
    position: absolute;
    left: 50%;
    bottom: 0;
    margin: 8px 0;
    transform: translateX(-50%);
    color: ${(props) => props.theme.textColorAlternative1};
`;

const Icon = styled.div`
    width: 80%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background-image: url(${(props) => props.icon});
    background-position: center;
    background-repeat: no-repeat;
    animation: ${(props) => (props.spin ? iconSpin : "")};
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

const iconSpin = keyframes`
    0% {
        transform: translateX(-50%) rotateZ(0deg);
    }
    100% {
        transform: translateX(-50%) rotateZ(360deg);
    }
`;

export default function MenuButton({ label, icon, spin }) {
    const { theme } = useSelector((state) => state.theme);

    return (
        <Container theme={theme}>
            <Label theme={theme}>{label}</Label>
            <Icon icon={icon} spin={spin} />
        </Container>
    );
}
