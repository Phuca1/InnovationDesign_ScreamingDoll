import React, { useState, useRef, useContext, useEffect } from "react"
import { Select, Drawer, Button, Progress, Upload, message } from 'antd';
import './SoundLib.css';
import { PlayCircleOutlined, PauseCircleOutlined, UploadOutlined, SaveOutlined } from "@ant-design/icons";
import { userContext } from "../../UserContext";

export function SoundLib(props) {

    const [sounds, setSounds] = useState([
        {
            id: 1,
            name: 'guitar 1',
            src: "https://cdn.pixabay.com/audio/2024/09/29/audio_5c67567261.mp3",
        },
        {
            id: 2,
            name: 'mystical music',
            src: 'https://cdn.pixabay.com/audio/2022/03/13/audio_d0add212b7.mp3'
        }
    ])
    const [selectedSound, setSelectedSound] = useState(null); // ID of selected sound
    const [currentAudio, setCurrentAudio] = useState(null); // Audio instance for playback
    const [progress, setProgress] = useState({}); // Playback progress for each sound
    const progressRefs = useRef({});
    const [user, setUser] = useContext(userContext);

    useEffect(() => {
        setSelectedSound(user.currentSound.id);
    }, [])

    // Handle play/pause logic
    const playSound = (sound) => {
        if (currentAudio) {
            currentAudio.audio.pause();
            if (currentAudio.id === sound.id) {
                setCurrentAudio(null); // Stop the current audio if it's clicked again
                return;
            }
        }

        const audio = new Audio(sound.src);
        setCurrentAudio({ id: sound.id, audio });
        setProgress((prev) => ({ ...prev, [sound.id]: 0 }));

        audio.play();

        // Update progress bar while playing
        audio.ontimeupdate = () => {
            setProgress((prev) => ({
                ...prev,
                [sound.id]: (audio.currentTime / audio.duration) * 100,
            }));
        };

        // Reset progress when the sound ends
        audio.onended = () => {
            setProgress((prev) => ({ ...prev, [sound.id]: 0 }));
            setCurrentAudio(null);
        };
    };

    // Select a sound
    const selectSound = (soundId) => {
        setSelectedSound(soundId);
        setProgress((prev) => {
            var newObj = { ...prev }
            for (const [key, value] of Object.entries(prev)) {
                if (key != soundId) {
                    newObj[key] = 0
                }
            }
            return newObj;
        })

        const sound = sounds.find((item) => item.id == soundId);
        const audio = new Audio(sound.src);
        setCurrentAudio({ id: soundId, audio });
    };


    const handleProgressClick = (e, soundId) => {
        if (!currentAudio || currentAudio.id !== soundId) return;

        const progressBar = progressRefs.current[soundId];
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;

        const newTime = (clickX / width) * currentAudio.audio.duration;
        currentAudio.audio.currentTime = newTime;
        setProgress((prev) => ({
            ...prev,
            [soundId]: (newTime / currentAudio.audio.duration) * 100,
        }));
    };

    const handleUpload = (file) => {
        const newSound = {
            id: sounds.length + 1,
            name: file.name,
            src: URL.createObjectURL(file),
        };
        setSounds((prevList) => [...prevList, newSound]);
        message.success(`Uploaded: ${file.name}`);
        return false; // Prevent default upload behavior
    };

    const handleSave = () => {
        setUser((prev) =>({
            ...prev,
            currentSound : sounds.find((item) => item.id == selectedSound)
        }))
    };

    return (
        <Drawer
            title="Sound library"
            placement="right"
            open={props.isPanelOpen}
            onClose={() => props.setIsPanelOpen(false)}
        >
            <div className="profile_sound-management_container">
                {sounds.map((sound) => (
                    <div
                        key={sound.id}
                        onClick={() => selectSound(sound.id)}
                        className={`sound-item ${selectedSound === sound.id ? "sound-item-selected" : ""
                            }`}
                    >
                        <Button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent onClick
                                playSound(sound);
                            }}
                            type="primary"
                            shape="circle"
                            className="play-button"
                            icon={
                                currentAudio && currentAudio.id === sound.id ? (
                                    <PauseCircleOutlined />
                                ) : (
                                    <PlayCircleOutlined />
                                )
                            }
                        />
                        <div className="sound-info">
                            <span>{sound.name}</span>
                            <div
                                ref={(el) => (progressRefs.current[sound.id] = el)}
                                onClick={(e) => handleProgressClick(e, sound.id)}
                            >
                                <Progress
                                    percent={Math.round(progress[sound.id] || 0)}
                                    showInfo={false}
                                    strokeColor="#1890ff"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Upload
                beforeUpload={handleUpload}
                showUploadList={false}
                accept=".mp3,.wav,.ogg"
            >
                <Button icon={<UploadOutlined />} type="dashed" className="upload-button">
                    Upload Sound
                </Button>
            </Upload>

            <Button
                type="primary"
                icon={<SaveOutlined />}
                className="save-button"
                onClick={handleSave}
            >
                Save
            </Button>
        </Drawer>
    )
}


const listSound = [
    {
        name: 'guitar 1',
        link: "https://cdn.pixabay.com/audio/2024/09/29/audio_5c67567261.mp3",
    },
    {
        name: 'mystical music',
        link: 'https://cdn.pixabay.com/audio/2022/03/13/audio_d0add212b7.mp3'
    }
]