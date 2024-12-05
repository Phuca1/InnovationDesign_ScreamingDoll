import React, {useContext, useState, useEffect} from 'react';
import { userContext } from '../../UserContext';
import { FaArrowRight } from "react-icons/fa6";
import './Profile.css';
import { Divider } from 'antd/es';
import { IoVolumeMedium, IoLogOutSharp } from "react-icons/io5";
import { SoundLib } from '../SoundLib/SoundLib';

export const Profile = () =>{
    const [isSoundLibPannelOpen, setIsSoundLibPannelOpen] = useState(false);

    const user = useContext(userContext);

    
    function handleOpenSoundLib(){
        setIsSoundLibPannelOpen(true);
    }
    useEffect(() =>{
        setIsSoundLibPannelOpen(false);
    }, [])
    return(
        <React.Fragment>
            <div className='profile-content'>
                <div className='profile_manage-profile'>
                    <img className='avatar' alt='avatar' src={user.avatar}/>
                    <div className='profile_manage-profile_text_wrapper'>
                        <p className='profile_manage-profile_text-upper'>Profile</p>
                        <p className='profile_manage-profile_text-lower'>Manage profile</p>
                    </div>
                    <FaArrowRight className='profile_arrow' />
                </div>
                <div className='profile-content_divider_wrapper'>
                    <Divider className='profile-content_divider' />
                </div>
                <div className='profile_manage-sound' onClick={handleOpenSoundLib}>
                    <IoVolumeMedium className='profile_manage-sound_icon'/>
                    <div className='profile_manage-volumn_text_wrapper'>
                        <p className='profile_manage-volumn_text-upper'>Sound Library</p>
                        <p className='profile_manage-volumn_text-lower'>Configure your sound</p>
                    </div>
                    <FaArrowRight className='profile_arrow' />
                </div>

                <div style={{marginTop : '400px'}} className='profile-content_divider_wrapper'>
                    <Divider className='profile-content_divider' />
                </div>
                <div className='profile-content_logout'>
                    <IoLogOutSharp className='profile-content_logout-icon'/>
                    <p className='profile-content_logout-text'>Logout</p>
                </div>
            </div>
            <SoundLib isPanelOpen={isSoundLibPannelOpen} setIsPanelOpen={setIsSoundLibPannelOpen} />
        </React.Fragment>
    )
}

