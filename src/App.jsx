import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'

// Import pages
import Home from "./pages/Home/Home.jsx";
import PostLost from "./pages/Post_lost/PostLost.jsx";
import PostFound from "./pages/Post_found/PostFound.jsx";
import Profile from "./pages/Profile/Profile.jsx";

// Import MainLayout
import MainLayout from './layout/MainLayout.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/post-lost"
          element={
            <MainLayout>
              <PostLost />
            </MainLayout>
          }
        />

        <Route
          path="/post-found"
          element={
            <MainLayout>
              <PostFound />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout>
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
