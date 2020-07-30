import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 75px;
    height: 75px;
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    overflow: hidden;
`;

export default function IconContainer({ children }) {
    return <Container>{children}</Container>;
}
