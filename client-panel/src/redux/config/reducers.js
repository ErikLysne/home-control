const initialState = {
    host: {
        ipAddr: "localhost",
        port: 3000,
        requestHeaders: {
            "Content-Type": "application/json"
        }
    },
    target: "living-room"
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        default:
            return state;
    }
};
