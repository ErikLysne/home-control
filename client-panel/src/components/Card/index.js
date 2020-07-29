import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    width: 30%;
    height: 100%;
    margin: 30px 5px !important;
    position: relative;
    overflow: hidden;
    color: rgb(255, 255, 255);
    background-color: ${(props) => props.theme.boxBackgroundColor};
    box-shadow: ${(props) => props.theme.boxInnerShadow};

    & > * {
        padding: 10px 10px;
    }
`;

const Header = styled.div`
    width: 100%;
    color: ${(props) => props.theme.textColorAlternative1};
    background-color: rgba(255, 255, 255, 0.25);
`;

const Table = styled.table`
    width: 100%;
    font-size: 0.75rem;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const TdLabel = styled.td`
    text-align: left;
`;

const TdValue = styled.td`
    text-align: right;
`;

export default function Card({ header, items }) {
    const { theme } = useSelector((state) => state.theme);
    return (
        <Container theme={theme}>
            <Header theme={theme}>
                <b>{header.first}</b> {header.second}
            </Header>
            <Table>
                <Tbody>
                    {items.map((item) => (
                        <Tr>
                            <TdLabel>{`${item.label}:`}</TdLabel>
                            <TdValue>{item.value}</TdValue>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    );
}

Card.defaultProps = {
    header: {
        first: "",
        second: ""
    },
    items: []
};
