import React from "react";
import styled, { keyframes } from "styled-components";

import BackgroundOn from "./images/On/Background.png";
import ButtonOn from "./images/On/Button.png";
import IconOn from "./images/On/Icon.png";
import SpinnerOn from "./images/On/Spinner.png";
import BackgroundOff from "./images/Off/Background.png";
import ButtonOff from "./images/Off/Button.png";
import IconOff from "./images/Off/Icon.png";
import SpinnerOff from "./images/Off/Spinner.png";

const ButtonLayer = styled.div`
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const Background = styled(ButtonLayer)`
    width: 183px;
    height: 183px;
    background-image: url(${({ state }) =>
        state ? BackgroundOn : BackgroundOff});
`;

const Spinner = styled(ButtonLayer)`
    width: 159px;
    height: 159px;
    background-image: url(${({ state }) => (state ? SpinnerOn : SpinnerOff)});
    animation: ${() => spinnerKeyframes};
    animation-duration: 10s;
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

const Button = styled(ButtonLayer)`
    width: 127px;
    height: 127px;
    background-image: url(${({ state }) => (state ? ButtonOn : ButtonOff)});

    &:active {
        width: 120px;
        height: 120px;
    }
`;

const Icon = styled(ButtonLayer)`
    width: 45px;
    height: 91px;
    background-image: url(${({ state }) => (state ? IconOn : IconOff)});
    pointer-events: none;
`;

export default function ({ state, onClick }) {
    return (
        <>
            <Background state={state} />
            <Spinner state={state} />
            <Button state={state} onClick={onClick} />
            <Icon state={state} />
        </>
    );
}
