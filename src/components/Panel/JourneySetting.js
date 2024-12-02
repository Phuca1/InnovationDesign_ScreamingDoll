import React, {useState} from "react"
import { Select } from 'antd';

export const JourneySetting = (props) =>{
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [numberInput, setNumberInput] = useState("");
    const [toggle, setToggle] = useState(false);
    const [volume, setVolume] = useState(50);

    return(
        <Drawer
            title="Journey setting"
            placement="right"
            open={props.isPanelOpen}
        >
            <div style={{ marginBottom: "20px" }}>
                <label>Destination</label>
                <Select
                    showSearch
                    placeholder="Search destination"
                    style={{ width: "100%", marginTop: "10px" }}
                    onChange={(value) => setSelectedDestination(value)}
                    filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={destinations.map((dest) => ({
                    value: dest.value,
                    label: dest.label,
                    }))}
                />
            </div>

            {/* Numeric Input Field */}
            <div style={{ marginBottom: "20px" }}>
            <label>Number</label>
            <Input
                type="number"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                placeholder="Enter a number"
                style={{ marginTop: "10px" }}
            />
            </div>

            {/* Toggle Switch */}
            <div style={{ marginBottom: "20px" }}>
                <label>Toggle</label>
                <div style={{ marginTop: "10px" }}>
                    <Switch
                        checked={toggle}
                        onChange={(checked) => setToggle(checked)}
                    />
                    <span style={{ marginLeft: "10px" }}>{toggle ? "On" : "Off"}</span>
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
            Submit
            </Button>
        </Drawer>
    )
}

