import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { homeScreenActions } from "../../redux/homeScreen";
import { lightsOperations } from "../../redux/lights";

import ActivationButton from "./ActivationButton";

const Container = styled.div`
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border: solid red;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonRibbon = styled.div`
    width: 100%;
    height: 200px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgb(255, 255, 255);
    opacity: 0.025;
    z-index: 0;
`;

export default function HomeScreen({}) {
    const lightsState = useSelector((store) => store.lights);
    const lightsPending = lightsState.remote.pending;
    const lightsOn = lightsState.resource.action.on;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(lightsOperations.getLightsRequested());
        return () => {
            //cleanup
        };
    }, []);

    const handleActivationButtonPressed = () => {
        if (!lightsPending) {
            dispatch(lightsOperations.updateLightsRequested({ on: !lightsOn }));
        }
    };

    return (
        <Container>
            <ButtonRibbon />
            <ActivationButton
                state={lightsOn}
                onClick={handleActivationButtonPressed}
            />
        </Container>
    );
}
