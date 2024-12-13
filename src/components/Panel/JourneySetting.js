import React, { useState, useContext, useEffect } from "react"
import { Select, Drawer, Input, Switch, Slider, Button } from 'antd';
import './JourneySetting.css';
import { userContext } from "../../UserContext";

let timeout;
function debounce(fn, input, wait) {
    return function () {
        if (timeout) {
            console.log("no timeout")
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            console.log("start execution");
            fn(input);
        }, wait);
    };
}

export const JourneySetting = (props) => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [numberInput, setNumberInput] = useState("");
    const [vibrationLevel, setVibrationLevel] = useState(50);
    const [volume, setVolume] = useState(50);
    const [destinationOptions, setDestinationOptions] = useState([])
    const [user, setUser] = useContext(userContext);


    const handleSubmit = () => {
        setUser((prev) =>({
            ...prev,
            onGoingJourney:{
                id: Math.floor(Math.random() * 1000),
                destination : {
                  name: selectedDestination.label,
                  address: selectedDestination.value,
                  latitude: selectedDestination.latitude,
                  longitude: selectedDestination.longitude,
                  postal: selectedDestination.postal
                },
                type: selectedDestination.value.includes('MRT') ? "MRT" : "BUS",
                notifyBefore: numberInput,
                hasFinished: false,
                finishedAt: null
            },
        }))
        props.setIsPanelOpen(false);
    }

    function fetchSearchLocation(value) {
        console.log("HERE" + value);
        if (!value) return;
        fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${value}&returnGeom=Y&getAddrDetails=Y`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDestinationOptions(data.results.map(item => {
                    return {
                        value: item.ADDRESS,
                        label: item.SEARCHVAL,
                        longitude: item.LONGITUDE,
                        latitude: item.LATITUDE,
                        postal: item.POSTAL
                    }
                }))
            });
    }

    function chooseDestinationHandle(value) {

        const selectedDestination = destinationOptions.find(item => item.value = value);
        console.log("CHoosed:", selectedDestination);
        setSelectedDestination(selectedDestination);
        document.querySelector('#om-minimap-preview')
            .setAttribute('src', `https://www.onemap.gov.sg/amm/amm.html?marker=latLng:${selectedDestination.latitude},${selectedDestination.longitude}`);

    }

    return (
        <Drawer
            title="Journey setting"
            placement="right"
            open={props.isPanelOpen}
            onClose={() => props.setIsPanelOpen(false)}
        >
            <div style={{ marginBottom: "20px" }}>
                <label>Destination</label>
                <Select
                    showSearch
                    placeholder="Search destination"
                    style={{ width: "100%", marginTop: "10px" }}
                    onChange={(value) => chooseDestinationHandle(value)}
                    onKeyUp={function (element) {
                        debounce(fetchSearchLocation, element.target.value, 300)()
                    }}
                    options={destinationOptions}
                    onSearch={() => { }}
                />
                <div className="map-wrapper">
                    <iframe
                        title="map"
                        id="om-minimap-preview"
                        src="https://www.onemap.gov.sg/amm/amm.html"
                        scrolling="no"
                        frameborder="0"
                        allowfullscreen="allowfullscreen">

                    </iframe>
                </div>
            </div>

            {/* Numeric Input Field */}
            <div className="journey-setting_notify-before">
                <p>Notify before</p>
                <Input
                    type="number"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                    placeholder="Enter a number"
                    style={{ marginTop: "10px" }}
                    className="journey-setting_notify-before_input"
                />
                <p>minutes</p>
            </div>

            {/* Vibration */}
            <div style={{ marginBottom: "20px" }}>
                <label>Vibration level</label>
                <div style={{ marginTop: "10px" }}>
                    <Slider
                        value={vibrationLevel}
                        onChange={(value) => setVibrationLevel(value)}
                        max={100}
                    />
                    <div>Volume Level: {volume}</div>
                </div>
            </div>

            {/* Volume Slider */}
            <div style={{ marginBottom: "20px" }}>
                <label>Volume</label>
                <div style={{ marginTop: "10px" }}>
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                        max={100}
                    />
                    <div>Volume Level: {volume}</div>
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="primary"
                block
                onClick={handleSubmit}
                style={{ marginTop: "20px" }}
            >
                Start Journey
            </Button>
        </Drawer>
    )
}

