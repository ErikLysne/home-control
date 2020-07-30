import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    background-color: ${(props) => props.theme.boxBackgroundColor};
    box-shadow: ${(props) => props.theme.boxInnerShadow};

    &:active {
        background-color: ${(props) => props.theme.buttonActiveBackgroundColor};
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

export default function MainMenuButton({ label, Icon }) {
    const { theme } = useSelector((state) => state.theme);

    return (
        <Container theme={theme}>
            <Label theme={theme}>{label}</Label>
            <Icon />
        </Container>
    );
}
