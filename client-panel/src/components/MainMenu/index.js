import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MainMenuButton from "./MainMenuButton";
import LightIcon from "./LightIcon";
import RoutinesIcon from "./RoutinesIcon";
import SettingsIcon from "./SettingsIcon";

const Container = styled.div`
    width: 100%;
    height: 110px;
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
            <MainMenuButton label={"Light"} Icon={LightIcon} />
            <MainMenuButton label={"Routines"} Icon={RoutinesIcon} />
            <MainMenuButton label={"Settings"} Icon={SettingsIcon} />
        </Container>
    );
}
