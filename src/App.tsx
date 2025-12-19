import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Review from "./pages/Review.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import Info from "./pages/Info.tsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/inf" element={<Info/>} />
      </Routes>
    </Layout>
  );
}

export default App;