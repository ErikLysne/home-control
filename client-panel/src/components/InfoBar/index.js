import React from "react";
import styled from "styled-components";

import Clock from "./Clock";

const Container = styled.div`
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
`;

export default function () {
    return (
        <Container>
            <Clock />
        </Container>
    );
}
