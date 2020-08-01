import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { serviceOperations } from "../../../redux/services";

const Window = styled.div`
    width: 250px;
    height: 200px;
    position: absolute;
    left: 20px;
    top: 50px;
    z-index: 10;
    backdrop-filter: ${(props) => props.theme.windowBackdropFilter};
    box-shadow: ${(props) => props.theme.windowInnerShadow};
    color: ${(props) => props.theme.textColorAlternative1};
    background-color: ${(props) => props.theme.windowBackgroundColor};
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
        onClose();
    };

    return (
        <Window theme={theme}>
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
                                <TdLabel>{`${service.displayName}:`}</TdLabel>
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
