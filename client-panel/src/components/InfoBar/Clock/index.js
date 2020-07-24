import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.5rem;
`;

const convertDateToTime = (date) => {
    return date.toLocaleTimeString();
};

export default function Clock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => {
            // Cleanup
            clearInterval(interval);
        };
    }, []);

    return <Container>{convertDateToTime(date)}</Container>;
}
