import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow: hidden;
    background-color: ${(props) => props.theme.backgroundColor};
    background: ${(props) => props.theme.backgroundGradient};
`;

export default function Background() {
    const { theme } = useSelector((state) => state.theme);
    return <Container theme={theme} />;
}
