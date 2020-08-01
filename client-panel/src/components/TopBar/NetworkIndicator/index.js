import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
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

const NetworkStatusWindow = styled.div`
    width: 50%;
    heigth: 200px;
    position: absolute;
    left: 20px;
    top: 50px;
`;

export default function NetworkIndicator() {
    const remote = useSelector((state) => state.remote);
    const { loading, previousSuccessful } = remote;

    return (
        <Container
            loading={loading ? 1 : undefined}
            networkStatus={previousSuccessful}
        />
    );
}
