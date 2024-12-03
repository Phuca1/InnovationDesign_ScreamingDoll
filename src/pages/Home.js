import React, {useContext, useState} from 'react'
import { userContext } from '../UserContext'
import './Home.css'
import { HomeContent } from '../components/Home/HomeContent';
import { Profile } from '../components/Profile/Profile';
import { Footer } from '../components/Footer/Footer';
import { JourneySetting } from '../components/Panel/JourneySetting';
export const Home = () => {
    const [currentIsHome, setCurrentIsHome] = useState(true);
    const [isPannelOpen, setIsPannelOpen] = useState(false);

    function getTimeOfDay() {
        const currentHour = new Date().getHours();
    
        if (currentHour >= 5 && currentHour < 12) {
            return "morning";
        } else if (currentHour >= 12 && currentHour < 17) {
            return "afternoon";
        } else {
            return "night";
        }
    }
    const timeOfDay = getTimeOfDay();

    const user = useContext(userContext);

    const handleClickStartButton = () =>{
        setIsPannelOpen(true);
    }

    return (
        <div className='flex-center-column gap-sm'>
            <div className='home-top'>
                <div className='home-top-left'>
                    <div>Good {timeOfDay}</div>
                    <div className='home-top-left_greeting'>Hello, {user.name}</div>
                </div>
                <div className='home-top-right'>
                    <img className='avatar' alt='avatar' src={user.avatar}/>
                </div>
            </div>

            {
                currentIsHome ?
                <HomeContent />
                : <Profile />
            }

            <Footer 
                currentIsHome={currentIsHome} 
                setCurrentIsHome={setCurrentIsHome} 
                handleClickStartButton={handleClickStartButton} 
            />

            <JourneySetting isPanelOpen={isPannelOpen} setIsPannelOpen={setIsPannelOpen} />
        </div>
    )
}
