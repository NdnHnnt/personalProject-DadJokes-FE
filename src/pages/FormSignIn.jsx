/* eslint-disable no-undef */
import { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/users/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="bg-white h-screen w-screen flex items-center">
      <div className="h-max mx-auto flex flex-col items-center">
        <img className="h-[40px] w-[47px] mb-5" src="/dad.svg" alt="" />
        <h1 className="text-xl font-bold text-center pb-10">
          Sign in to your account
        </h1>
        <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
          <div>
            <label
              className="text-gray-600 font-bold inline-block pb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
              type="email"
              name="email"
              placeholder="mehedi@jaman.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="text-gray-600 font-bold inline-block pb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
              type="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex">
            <div className="w-1/2">
              <input type="checkbox" name="remeberMe" />
              <label htmlFor="remeberMe">Remeber me</label>
            </div>
            <div className="w-1/2">
              <a className="font-bold text-blue-600" href="">
                Forgot password ?
              </a>
            </div>
          </div>
          <div>
            <input
              className="bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
              type="submit"
              value="Login"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-10">
          Not a member?{" "}
          <a href="#" className="text-[#4F46E5] font-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
