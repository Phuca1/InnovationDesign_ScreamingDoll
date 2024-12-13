import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Theme } from './components/Theme';
import { router as Route } from './pages/router'
import { solarize } from './components/asset-icons'
import { Nav } from './components/Header/Nav';
import { NavSub } from './components/Header/NavSub';
import { useEffect, useState } from "react";
import { userContext } from './UserContext';

const App = () => {
  const [user, setUser] = useState({
    name: 'Batman',
    email: 'helloworld@gmail.com',
    avatar: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT_G-KNolRrea45aEIyGJHFWZd2xe4t29E2i20GMf7vAlRTwg1SS-QV-VQ5vzxkWCpFL1_mDNehSXTp9eFUAzcb2m3MP5XNt4E37YbROAIpw17w9EjYgh4aPp_Q&usqp=CAc',
    currentSound: {
      id: 1,
      name: 'guitar 1',
      src: "https://cdn.pixabay.com/audio/2024/09/29/audio_5c67567261.mp3",
    },
    onGoingJourney: {
        id: 1,
        destination : {
          name: "Upp Changi Stn/Opp SUTD",
          address: "690 UPPER CHANGI ROAD EAST UPPER CHANGI MRT STATION (DT34) SINGAPORE 485990",
          latitude: 1.34173977444995,
          longitude: 103.961472788634,
          postal: 485990
        },
        type: "MRT",
        notifyBefore: 3,
        hasFinished: false,
        finishedAt: null
    },
    travelHistory: [
      {
        id: 2,
        destination: {
          name: "RAFFLES PLACE MRT STATION",
          address: "5 RAFFLES PLACE RAFFLES PLACE MRT STATION SINGAPORE 048618",
          latitude: 1.28393326234538,
          longitude: 103.851463066212,
          postal: "048618"
        },
        type: "MRT",
        notifyBefore: 5,
        hasFinished: true,
        finishedAt: new Date().getDate() - 10
      },
      {
        id: 3,
        destination: {
          name: "Upp Changi Stn/Opp SUTD",
          address: "690 UPPER CHANGI ROAD EAST UPPER CHANGI MRT STATION (DT34) SINGAPORE 485990",
          latitude: 1.34173977444995,
          longitude: 103.961472788634,
          postal: "485990"
        },
        type: "Bus",
        notifyBefore: 0,
        hasFinished: true,
        finishedAt: new Date().getDate() - 5
      }
    ]
  })

  return (
    <userContext.Provider value={[user, setUser]}>
      <Router>
        <Nav />

        {/* Route is located at pages folder */}
        <Route />
      </Router>
    </userContext.Provider>
  );
}

export default App;
