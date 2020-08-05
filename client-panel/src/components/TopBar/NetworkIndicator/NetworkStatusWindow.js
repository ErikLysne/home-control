import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { serviceOperations } from "../../../redux/services";

const Window = styled.div`
    width: 300px;
    height: 200px;
    position: absolute;
    left: 20px;
    top: 50px;
    z-index: 10;
    overflow: hidden;
    backdrop-filter: ${(props) => props.theme.windowBackdropFilter};
    box-shadow: ${(props) => props.theme.windowInnerShadow};
    color: ${(props) => props.theme.textColorAlternative1};
    background-color: ${(props) => props.theme.windowBackgroundColor};
    animation: ${(props) =>
        props.transition ? windowOpenAnimation : windowCloseAnimation};
    animation-duration: ${(props) => props.duration}ms;
`;

const windowOpenAnimation = () => keyframes`
    0% {
        width: 0;
        height: 2rem;
        opacity: 0;
    }

    50% {
        width: 300px;
        height: 2rem;
        opacity: 0.5;
    }
    
    100% {
        width: 300px;
        height: 200px;
        opacity: 1.0;
    }
`;

const windowCloseAnimation = () => keyframes`
    0% {
        width: 300px;
        height: 200px;
    }

    50% {
        width: 300px;
        height: 2rem;
    }

    100% {
        width: 0;
        height: 2rem;
    }
`;

const Status = styled.span`
    color: ${(props) =>
        props.status
            ? props.theme.textColorSuccess
            : props.theme.textColorError};
`;

const Table = styled.table`
    width: 100%;
    padding: 10px;
`;

const Thead = styled.thead`
    font-size: 1.25rem;
`;

const ThLabel = styled.th`
    text-align: left;
`;

const ThValue = styled.th`
    text-align: right;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const TdLabel = styled.td`
    text-align: left;
`;

const TdValue = styled.td`
    text-align: right;
`;

const TdSpacer = styled.td`
    text-align: left;
    color: ${(props) => props.theme.textColor};
`;

const TextSpan = styled.span`
    color: ${(props) => props.theme.textColor};
`;

const CloseButton = styled.button`
    width: 100%;
    height: 2rem;
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 1.25rem;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.windowButtonBackgroundColor};
    box-shadow: ${(props) => props.theme.windowButtonInnerShadow};

    &:active {
        background-color: ${(props) => props.theme.buttonActiveBackgroundColor};
    }

    &:focus {
        outline: 0;
    }
`;

export default function NetworkStatusWindow({ onClose }) {
    const [windowTransition, setWindowTransition] = useState(1);
    const windowTransitionDuration = 1000;

    const { pingInterval } = useSelector((state) => state.config);
    const { online } = useSelector((state) => state.remote);
    const { services } = useSelector((state) => state.services);
    const { theme } = useSelector((state) => state.theme);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(serviceOperations.getServicesRequested());
        const timer = setInterval(() => {
            dispatch(serviceOperations.getServicesRequested());
        }, pingInterval);
        return () => {
            // cleanup
            clearInterval(timer);
        };
    }, [dispatch, pingInterval]);

    const handleCloseEvent = () => {
        setWindowTransition(0);
        setTimeout(() => onClose(), windowTransitionDuration);
    };

    return (
        <Window
            theme={theme}
            duration={windowTransitionDuration}
            transition={windowTransition}
        >
            <Table>
                <Thead>
                    <Tr>
                        <ThLabel>Server status:</ThLabel>
                        <ThValue>
                            <Status
                                status={online ? 1 : undefined}
                                theme={theme}
                            >
                                {online ? "Online" : "Offline"}
                            </Status>
                        </ThValue>
                    </Tr>
                </Thead>
                {online && (
                    <Tbody>
                        <Tr>
                            <TdSpacer theme={theme}>Services:</TdSpacer>
                        </Tr>
                        {services.map((service) => (
                            <Tr>
                                <TdLabel>
                                    {service.displayName}{" "}
                                    <TextSpan
                                        theme={theme}
                                    >{`(${service.provider}):`}</TextSpan>
                                </TdLabel>
                                <TdValue>
                                    <Status
                                        status={
                                            service.status === "online"
                                                ? 1
                                                : undefined
                                        }
                                        theme={theme}
                                    >
                                        {service.status === "online"
                                            ? "Online"
                                            : "Offline"}
                                    </Status>
                                </TdValue>
                            </Tr>
                        ))}
                    </Tbody>
                )}
            </Table>

            <CloseButton theme={theme} onClick={handleCloseEvent}>
                Close
            </CloseButton>
        </Window>
    );
}
