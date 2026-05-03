import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";
import React from 'react'

// Import pages
import Home from "./pages/Home/Home";
import PostLost from "./pages/Post_lost/PostLost";
import PostFound from "./pages/Post_found/PostFound";
import Profile from "./pages/Profile/Profile";

// Import MainLayout
import MainLayout from './layout/MainLayout';

function App(){
  return (
    <BrowserRouter>
      {/* <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/post-lost">Post Lost</Link> |{" "}
        <Link to="/post-found">Post Found</Link> |{" "}

        <Link to="/profile">profile</Link>
      </nav> */}

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
    </BrowserRouter>
  );
}

export default App;
