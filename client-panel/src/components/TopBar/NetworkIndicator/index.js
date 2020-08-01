import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { remoteOperations } from "../../../redux/remote";
import NetworkStatusWindow from "./NetworkStatusWindow";
import iconNetwork from "./images/Network.png";
import iconNoNetwork from "./images/NoNetwork.png";
import iconLoadingSpinner from "./images/LoadingSpinner.gif";

const Container = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(${(props) =>
        props.loading
            ? iconLoadingSpinner
            : props.networkStatus
            ? iconNetwork
            : iconNoNetwork});
    background-repeat: no-repeat;
    background-position: center;
`;

export default function NetworkIndicator() {
    const [networkStatusWindowActive, setNetworkStatusWindowActive] = useState(
        false
    );

    const remote = useSelector((state) => state.remote);
    const { pingInterval } = useSelector((state) => state.config);
    const { online, loading, previousSuccessful } = remote;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(remoteOperations.serverPingRequested());
        const timer = setInterval(() => {
            dispatch(remoteOperations.serverPingRequested());
        }, pingInterval);
        return () => {
            // cleanup
            clearInterval(timer);
        };
    }, []);

    const handleClickEvent = () => {
        setNetworkStatusWindowActive(!networkStatusWindowActive);
    };

    return (
        <>
            <Container
                loading={loading ? 1 : undefined}
                networkStatus={previousSuccessful}
                onClick={handleClickEvent}
            />
            {networkStatusWindowActive && (
                <NetworkStatusWindow
                    onClose={() => {
                        setNetworkStatusWindowActive(false);
                    }}
                />
            )}
        </>
    );
}
