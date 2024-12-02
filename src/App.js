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
    onGoingJourney: {
        id: 1,
        destinationName : "Eunous",
        type: "MRT",
        lattitude: 1.3197342,
        longitude: 103.9028883,
        notifyBefore: 3,
        hasFinished: false,
        finishedAt: null
    },
    travelHistory: [
      {
          id: 2,
          destinationName : "OneNorth",
          type : "MRT",
          lattitude: 1.2998113,
          longitude: 103.7875947,
          notifyBefore: 5,
          hasFinished: true,
          finishedAt: new Date().getDate() - 10
      },
      {
        id: 3,
        destinationName : "Upp Changi Stn/Opp SUTD",
        type : "Bus",
        lattitude: 1.3415522,
        longitude: 103.9607823,
        notifyBefore: 0,
        hasFinished: true,
        finishedAt: new Date().getDate() - 5
      }
    ]
  })

  return (
    <userContext.Provider value={user}>
      <Router>
        <Nav />

        {/* Route is located at pages folder */}
        <Route />
      </Router>
    </userContext.Provider>
  );
}

export default App;
