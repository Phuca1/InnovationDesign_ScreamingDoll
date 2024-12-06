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
    avatar: 'https://static.dc.com/2024-03/bat_hub_hero_bm85_4x3f.png',
    currentSound: {
      id: 1,
      name: 'guitar 1',
      src: "https://cdn.pixabay.com/audio/2024/09/29/audio_5c67567261.mp3",
    },
    // onGoingJourney: {
    //     id: 1,
    //     destination : {
    //       name: "Upp Changi Stn/Opp SUTD",
    //       address: "690 UPPER CHANGI ROAD EAST UPPER CHANGI MRT STATION (DT34) SINGAPORE 485990",
    //       latitude: 1.34173977444995,
    //       longitude: 103.961472788634,
    //       postal: 485990
    //     },
    //     type: "MRT",
    //     latitude: 1.3197342,
    //     longitude: 103.9028883,
    //     notifyBefore: 3,
    //     hasFinished: false,
    //     finishedAt: null
    // },
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
        latitude: 1.2998113,
        longitude: 103.7875947,
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
        latitude: 1.3415522,
        longitude: 103.9607823,
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
