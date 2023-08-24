/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import { useState } from "react";
import Navbar from "./components/Navbar";
import Features from "./components/Feature";
import CTA from "./components/CTA";

function App() {
  return (
    <>
      <Navbar />
      <Features />
      <CTA />
    </>
  );
}

export default App;
