import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import { supabase } from './data/supabase';

// Import pages
import Home from "./pages/Home/Home.jsx";
import PostLost from "./pages/Post_lost_found/PostLost.jsx";
import PostFound from "./pages/Post_lost_found/PostFound.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Match from "./pages/Match/Match.jsx";

// Import MainLayout
import MainLayout from './layout/MainLayout.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  //check if user is admin or not
  const checkAdmin= async(userId) =>{
    console.log("checkAdmin start", userId);

    const{data} = await supabase
      .from("User")
      .select("admin")
      .eq("user_id",userId)
      .single()

    console.log("checkAdmin data:", data);
    console.log("checkAdmin error:", error);

    if (error) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(data?.admin==true)//sets isAdmin true ot false
  }

  // check session on page load
  useEffect(() => {
    //checks on initial load
    const getSession = async () => {
      console.log("getSession start");

      const { data } = await supabase.auth.getSession()

      console.log("getSession result", data);
      console.log("getSession error", error);

      if (data.session) {
        setIsLoggedIn(true)
        setCurrentUser(data.session.user)

        // removed await
        checkAdmin(data.session.user.id)
      }
    }
    getSession()

    // change callback since
    // Supabase specifically recommends not doing long async operations directly inside onAuthStateChange
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {

      console.log("AUTH EVENT:", event);

      if (event === "SIGNED_IN" && session) {
        setIsLoggedIn(true);
        setCurrentUser(session.user);
        // await removed
        checkAdmin(session.user.id);
      }

      if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setIsAdmin(false);
      }
    });

    return()=> subscription.unsubscribe();
  },[])
  
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
              <Home isAdmin={isAdmin}/>
            </MainLayout>
          }
        />

        <Route
          path="/match/:id"
          element={
            <MainLayout pageTitle={<>CLOSEST <span className="title-bold">MATCH</span></>}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}>
              <Match />
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
              <PostFound isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
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
