import React from "react";
import { useSelector } from "react-redux";

import Card from "../../Card";

export default function LightCard() {
    const { resource } = useSelector((state) => state.lights);
    const { action, lights } = resource;

    const items = [
        {
            label: "On",
            value: action.on ? "Yes" : "No"
        },
        {
            label: "Hue",
            value: action.hue
        },
        {
            label: "Saturation",
            value: action.brightness
        },
        {
            label: "Brightness",
            value: action.saturation
        },
        {
            label: "Color temp",
            value: action.colorTemp
        },
        {
            label: "# of lights",
            value: lights.length
        }
    ];

    return <Card header={{ first: "Lights" }} items={items} />;
}
