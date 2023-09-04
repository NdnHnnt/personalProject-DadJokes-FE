import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useState, useEffect } from "react";
import axios from "axios";

const SignIn = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (successAlert || errorAlert) {
      const timer = setTimeout(() => {
        setSuccessAlert(false);
        setErrorAlert(false);
        setResponse(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successAlert, errorAlert]);
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

    try {
      const response = await axios.request(config);
      setResponse(response.data);
      setSuccessAlert(true);
      setErrorAlert(false);
      handleLogin(response.data.token);
    } catch (error) {
      console.log(error);
      setErrorAlert(true);
      setSuccessAlert(false);
      setResponse(error.response.data)
    }
  };

  const handleLogin = (token) => {
    setToken(token);
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="bg-white h-screen w-screen flex items-center">
        <div className="toast toast-top toast-center">
          <div
            className={`alert alert-info bg-red ${errorAlert ? "" : "hidden"}`}
          >
            <span>{response && response.msg}</span>
          </div>
          <div
            className={`alert alert-success ${successAlert ? "" : "hidden"}`}
          >
            <span>Akun telah dibuat!</span>
          </div>
        </div>
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
            </div>
            <div>
              <input
                className="bg-yellow w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-turqoise"
                type="submit"
                value="Login"
                onClick={handleSubmit}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-10">
            Not a member?{" "}
            <a href="/signup" className="text-darkblue font-bold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
