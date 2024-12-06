import React, {useContext} from 'react';
import './Footer.css';
import { userContext } from '../../UserContext';
import { MdHomeFilled } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export const Footer = (props) => {
    const [user, setUser] = useContext(userContext);
    

    return(
        <div className='footer_wrapper'>
            <div 
                className={`footer_button ${props.currentIsHome ? 'footer_button_highlight' : 'footer_button_dim'}`}
                onClick={() => {props.setCurrentIsHome(true)}}
                >
                <MdHomeFilled className={`footer_home-icon`} />
                <div>Home</div>
            </div>

            <div 
                className={`footer_start-button ${user.onGoingJourney?.id != null ? 'start-disabled' : 'start-enabled'}`}
                onClick={props.handleClickStartButton}
            >
                Start
            </div>
            
            <div 
                className={`footer_button ${props.currentIsHome ? 'footer_button_dim' : 'footer_button_highlight'}`}
                onClick={() => {props.setCurrentIsHome(false)}}
                >
                <CgProfile className={`footer_home-icon`}/>
                <div>Profile</div>
            </div>
        </div>
    )
}

