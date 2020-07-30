import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Clock from "./Clock";
import NetworkIndicator from "./NetworkIndicator";

const Container = styled.div`
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    background-color: ${(props) => props.theme.topBarBackgroundColor};
`;

export default function TopBar() {
    const { theme } = useSelector((state) => state.theme);

    return (
        <Container theme={theme}>
            <Clock />
            <NetworkIndicator />
        </Container>
    );
}
