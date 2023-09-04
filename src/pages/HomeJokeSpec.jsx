/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../provider/authProvider";

export default function JokeSpecific() {
  const { token } = useAuth();
  const [response, setResponse] = useState(null); // Changed to setResponse

//   const fetchDataSpecific = async () => {
//     let config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: `http://localhost:3000/jokes/${item.id}`,
//       headers: { Authorization: `Bearer ${token}` },
//     };

//     try {
//       const response = await axios.request(config);
//       setResponse(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl text-gray-600 leading-relaxed text-justify w-4/5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s
        </h1>
        <div className="flex items-center gap-4">
          <div className="rounded-full w-12 h-12 bg-black overflow-hidden">
            <img src="https://rairaksa.github.io/assets/img/rai.jpg" />
          </div>
          <div className="flex flex-col tracking-wider">
            <label className="text-gray-600 font-bold text-base">
              Rai Raksa Muhamad
            </label>
            <label className="text-gray-400 font-normal text-sm">
              Fullstack PHP Developer
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
