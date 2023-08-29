import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [response, setResponse] = useState(null); // Add this state for the response data

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

    const data = JSON.stringify({
      email: email,
      username: username,
      password: password,
    });

    const config = {
      method: "post",
      url: "http://localhost:3000/users/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const handleNavigate = () => {
      navigate("/signin", { replace: true });
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setResponse(response.data);
      setSuccessAlert(true);
      setErrorAlert(false);
      setTimeout(() => {
        handleNavigate();
      }, 3 * 1000);
    } catch (error) {
      console.log(error);
      setErrorAlert(true);
      setSuccessAlert(false);
      setResponse(error.response.data); // Store the API error response
    }
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
                placeholder="yourmail@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="text-gray-600 font-bold inline-block pb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                name="username"
                placeholder="Nama Pengguna"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              {/* <div className="w-1/2">
                <input type="checkbox" name="remeberMe" />
                <label htmlFor="remeberMe">Rember me</label>
              </div> */}
              {/* <div className="w-1/2">
                <a className="font-bold text-blue-600" href="">
                  Forgot password ?
                </a>
              </div> */}
            </div>
            <div>
              <input
                className="bg-yellow w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-turqoise"
                type="submit"
                value="Sign Up"
                onClick={handleSubmit}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-10">
            Have an account?{" "}
            <a href="/signin" className="text-darkblue font-bold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
