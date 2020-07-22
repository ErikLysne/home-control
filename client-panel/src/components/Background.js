import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(rgb(3, 20, 30), rgb(0, 0, 0));
`;

export default function Background() {
    return <Container />;
}
