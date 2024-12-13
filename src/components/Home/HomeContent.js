import React, { useContext, useState } from 'react'
import { userContext } from '../../UserContext'
import { FaLocationDot, FaRegCircle } from "react-icons/fa6";
import './HomeContent.css'
import { Carousel, Popconfirm } from 'antd';
import HowToUse1 from './img/HowToUse1.png'
import HowToUse2 from './img/HowToUse2.png'
import HowToUse3 from './img/HowToUse3.png'
import HowToUse4 from './img/HowToUse4.png'

export const HomeContent = () => {

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

    const [user, setUser] = useContext(userContext);

    const confirmRemoveCurrentJourney = (e) =>{
        setUser((prev) =>({
            ...prev,
            onGoingJourney : null
        }))
    }

    return (
        <React.Fragment>
            <div className='main-travel-card'>
                <div className='travel-card-title'>Travel Card</div>
                <Carousel autoplay={true}>
                    <div>
                        <img alt='1' className='main-travel-card-img' src={HowToUse1} />
                    </div>
                    <div>
                        <img alt='1' className='main-travel-card-img' src={HowToUse2} />
                    </div>
                    <div>
                        <img alt='1' className='main-travel-card-img' src={HowToUse3} />
                    </div>
                    <div>
                        <img alt='1' className='main-travel-card-img' src={HowToUse4} />
                    </div>
                </Carousel>
            </div>

            <div className="travel-history">
                <p className="travel-history_title">History</p>
                <div className="travel-history_journey-items-wrapper">
                    {
                        user.onGoingJourney != null
                        &&
                        <Popconfirm
                            title='Delete the task'
                            description='Are you sure to stop this journey'
                            onConfirm={confirmRemoveCurrentJourney}
                            onCancel={() => {}}
                            okText='Confirm'
                            cancelText='No'
                        >
                            <div className={`journey-item`} key={user.onGoingJourney.id}>
                                <div className='journey-item_location-icon_wrapper'>
                                    <FaLocationDot className='journey-item_location-icon' />
                                </div>
                                <p className='journey-item_destination'>{user.onGoingJourney.destination.name}</p>
                                <p className='journey-item_notify-before'>{user.onGoingJourney.notifyBefore} minutes</p>
                            </div>
                        </Popconfirm>
                    }
                    {user.travelHistory.map((item, index) => {
                        return <div className={`journey-item`} key={item.id}>
                            <div className='journey-item_location-icon_wrapper'>
                                <FaRegCircle />
                            </div>
                            <p className='journey-item_destination'>{item.destination.name}</p>
                            <p className='journey-item_notify-before'>{item.notifyBefore} minutes</p>
                        </div>
                    })}
                </div>

            </div>
        </React.Fragment>
    )
}
