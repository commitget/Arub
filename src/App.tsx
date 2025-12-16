import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Review from "./pages/Review.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Layout>
  );
}

export default App;