import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 80%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background-image: url(${(props) => props.icon});
    background-position: center;
    background-repeat: no-repeat;
    animation: ${(props) => (props.spin ? iconSpin : "")};
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

export default function MenuButtonIcon({ icon }) {
    return <Container></Container>;
}
