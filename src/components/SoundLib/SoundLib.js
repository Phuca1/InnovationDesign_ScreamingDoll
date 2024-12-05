import React, {useState} from "react"
import { Select, Drawer, Input, Switch, Slider, Button } from 'antd';


export function SoundLib (props){

    const [selectedSound, setSelectedSound] = useState(null); // ID of selected sound
    const [currentAudio, setCurrentAudio] = useState(null); // Audio instance for playback
    const [progress, setProgress] = useState({}); // Playback progress for each sound

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

    return (
        <Drawer
            title="Sound library"
            placement="right"
            open={props.isPanelOpen}
            onClose={() => props.setIsPanelOpen(false)}
        >
            <div className='sound-lib_sound-list'>
                {
                    listSound.map((item) => {
                        return <audio controls>
                        <source src={item.link} type="audio/mpeg"/>
                    </audio>
                    })
                }
            </div>

        </Drawer>
    )
}