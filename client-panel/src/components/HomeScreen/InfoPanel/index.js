import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
    width: 90%;
    min-height: 150px;
    max-height: 50%;
    margin: 30px 0 !important;
    padding-left: 30px;
    position: relative;
    overflow: hidden;
    border-radius: 30px;
    color: rgb(255, 255, 255);
    background-color: ${(props) => props.theme.boxColor};
    box-shadow: 0 0 10px ${(props) => props.theme.boxColorGlow1},
        0 0 30px ${(props) => props.theme.boxColorGlow2},
        0 0 60px ${(props) => props.theme.boxColorGlow3};
`;

const Header = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 30px;
    font-size: 1.5rem;
    background-color: rgba(255, 255, 255, 0.25);
`;

const Bold = styled.span`
    font-weight: bold;
`;

const Table = styled.table`
    font-size: 1.5rem;
    padding-top: 2rem;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Td = styled.td``;

export default function InfoPanel({ room, items }) {
    const { theme } = useSelector((state) => state.theme);
    return (
        <Container theme={theme}>
            <Header>
                <Bold>{room}</Bold> Statistics
            </Header>
            <Table>
                <Tbody>
                    {items.map((item) => (
                        <Tr>
                            <Td>{`${item.label}:`}</Td>
                            <Td>{item.value}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    );
}
