import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
    height: 2.5rem;
    width: 100%;
    position: relative;
`;

const Text = styled.h1`
    margin: 0;
    font-weight: bold;
    font-family: arial;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.h1Color};
    animation: ${(props) => textGlow(props.theme)};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
`;

const textGlow = (theme) => keyframes`
 0% {
    text-shadow: 0px 0px 20px ${theme.h1ColorGlowStart};
 }

 100% {
    text-shadow: 0px 0px 5px ${theme.h1ColorGlowStop};
 }
`;

export default function RoomDisplay() {
    const { theme } = useSelector((state) => state.theme);
    return (
        <Container>
            <Text theme={theme}>Living Room</Text>
        </Container>
    );
}
