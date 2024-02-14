"use client";

import Landing from "../components/Pages/Landing";
import NavBar from "../components/UI/NavBar";
import Login from "../components/Pages/Login";
import "./globals.css";

export default function Home() {
  return (
    <>
      <NavBar />
      <Landing />
      <Login />
    </>
  );
}
