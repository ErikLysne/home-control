import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import MenuButton from "./MenuButton";

import settings from "./images/Settings.png";

const Container = styled.div`
    width: 100%;
    height: 100px;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function MainMenu() {
    const { theme } = useSelector((state) => state.theme);
    return (
        <Container theme={theme}>
            <MenuButton label={"Lights"} icon={settings} spin={true} />
            <MenuButton label={"Rooms"} icon={settings} spin={true} />
            <MenuButton label={"Home"} icon={settings} spin={true} />
            <MenuButton label={"Settings"} icon={settings} spin={true} />
        </Container>
    );
}
