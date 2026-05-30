import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import { supabase } from './data/supabase';

// Import pages
import Home from "./pages/Home/Home.jsx";
import PostLost from "./pages/Post_lost_found/PostLost.jsx";
import PostFound from "./pages/Post_lost_found/PostFound.jsx";
import Profile from "./pages/Profile/Profile.jsx";

// Import MainLayout
import MainLayout from './layout/MainLayout.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // check session on page load
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setIsLoggedIn(true)
        setCurrentUser(data.session.user)
      }
    }
    getSession()
  },[])
  console.log(isLoggedIn)
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout pageTitle={<>LIST OF <span className="title-bold">LOST</span> ITEMS</>}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/post-lost"
          element={
            <MainLayout pageTitle={<>POST <span className="title-bold">LOST</span> ITEM</>}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}>

              <PostLost isLoggedIn={isLoggedIn}/>
            </MainLayout>
          }
        />

        <Route
          path="/post-found"
          element={
            <MainLayout pageTitle={<>POST <span className="title-bold">FOUND</span> ITEM</>}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}>
              <PostFound />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout pageTitle={<>USER <span className="title-bold">PROFILE</span></>}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}>
              <Profile />
            </MainLayout>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
