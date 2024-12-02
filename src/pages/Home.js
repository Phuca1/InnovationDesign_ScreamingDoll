import React, {useContext} from 'react'
import { userContext } from '../UserContext'
import { FaLocationDot, FaRegCircle  } from "react-icons/fa6";
import './Home.css'
export const Home = () => {
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
    console.log(user.travelHistory)
    return (
        <div className='flex-center-column gap-sm'>
            <div className='home-top'>
                <div className='home-top-left'>
                    <div>Good {timeOfDay}</div>
                    <div className='home-top-left_greeting'>Hello, {user.name}</div>
                </div>
                <div className='home-top-right'>
                    <img className='avatar' src='https://static.dc.com/2024-03/bat_hub_hero_bm85_4x3f.png'/>
                </div>
            </div>

            <div className='main-travel-card'>
                <div className='travel-card-title'>Travel Card</div>
                <img className='main-travel-card-img' src='https://i.redd.it/8h7wb66ofn0a1.jpg'/>
            </div>

            <div className="travel-history">
                <p className="travel-history_title">History</p>
                <div className="travel-history_journey-items-wrapper">
                    {user.travelHistory.map((item, index) => {
                        return <div className={`journey-item`} key={item.id}>
                            <div className='journey-item_location-icon_wrapper'>
                                {item.hasFinished ? <FaRegCircle /> : <FaLocationDot className='journey-item_location-icon' />}
                            </div>
                            <p className='journey-item_destination'>{item.destinationName}</p>
                            <p className='journey-item_notify-before'>{item.notifyBefore} minutes</p>
                        </div>
                    })}
                </div>

            </div>
        </div>
    )
}
