import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { roomsOperations } from "../../redux/rooms";
import { lightsOperations } from "../../redux/lights";
import RoomDisplay from "./RoomDisplay";
import ActivationButton from "./ActivationButton";
import LightCard from "./LightCard";

const Container = styled.div`
    width: 100%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    & > * {
        margin: 20px 0;
    }
`;

const ButtonRibbon = styled.div`
    width: 100%;
    height: 200px;
    background-color: rgb(9, 24, 36);
    box-shadow: inset 0 0 10px rgba(199, 219, 231, 0.75);
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CardContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function HomeScreen() {
    const remote = useSelector((store) => store.remote);
    const pending = remote.pending;

    const lights = useSelector((store) => store.lights);
    const lightsOn = lights.resource.action.on;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(roomsOperations.getRoomsRequested());
        dispatch(lightsOperations.getLightsRequested());
        return () => {
            //cleanup
        };
    }, [dispatch]);

    const handleActivationButtonPressed = () => {
        if (!pending) {
            dispatch(lightsOperations.updateLightsRequested({ on: !lightsOn }));
        }
    };

    return (
        <Container>
            <RoomDisplay />
            <ButtonRibbon>
                <ActivationButton
                    state={lightsOn}
                    onClick={handleActivationButtonPressed}
                />
            </ButtonRibbon>
            <CardContainer>
                <LightCard />
                <LightCard />
                <LightCard />
            </CardContainer>
        </Container>
    );
}
