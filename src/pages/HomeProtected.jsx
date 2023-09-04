/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Bars3Icon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "What is DadJokes?", href: "#" },
  { name: "Features", href: "#" },
  { name: "How?", href: "#" },
];

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [response, setResponse] = useState(null); // Changed to setResponse
  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { token } = useAuth();

  const handleClear = () => {
    setQuestion('');
    setAnswer('');
  };

  const fetchData = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/jokes/",
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.request(config);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleLike = async () => {
  //   //unfunctional and uncalled
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: `http://localhost:3000/jokes/${item.jokes_id}`,
  //     headers: { Authorization: `Bearer ${token}` },
  //   };

  //   try {
  //     const response2 = await axios.request(config);
  //     setResponse2(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handlePost = async (e) => {
    e.preventDefault();
  
    let data = JSON.stringify({
      question: question,
      answer: answer,
    });
  
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/jokes",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
  
    try {
      const response1 = await axios.request(config);
      setResponse1(response1.data);
      fetchData();
    } catch (error) {
      console.log(error);
      setResponse1(error.response.data);
    }
  };

  useEffect(() => {
    fetchData(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Dad Jokes</span>
                <img className="h-8 w-auto" src="dad.svg" alt="" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">DadJokes</span>
                  <img className="h-8 w-auto" src="dad.svg" alt="" />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
      </div>

      <div className="pt-20 px-20 m-auto">
        <section className="w-full divide-y divide-slate-200 rounded bg-white shadow-md shadow-slate-200">
          <details className="group p-4">
            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              <div className="relative my-6">
                <input
                  id="id-b02"
                  type="text"
                  name="id-b02"
                  placeholder="Pertanyaan Anda"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  required
                />
                <label
                  htmlFor="id-b02"
                  className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Posting pertanyaan bapak-bapak milik Anda!
                </label>
              </div>
              <div className="relative my-6">
                <input
                  id="id-b02"
                  type="text"
                  name="id-b02"
                  placeholder="Jawaban Anda"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  required
                />
                <label
                  htmlFor="id-b02"
                  className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Beri jawaban atas pertanyaan apak-bapak Anda!
                </label>
              </div>
              <div className="flex">
                <button className="btn bg-turqoise" onClick={handlePost}>Submit</button>

                <button className="btn bg-red" onClick={handleClear}>Clear</button>
              </div>
            </summary>
          </details>
        </section>
      </div>

      <div className="px-20 m-auto">
        {response &&
          response.data.map((item) => (
            <section
              className="w-full divide-y divide-slate-200 rounded bg-white shadow-md shadow-slate-200"
              key={item.jokes_id}
            >
              <details className="group p-4">
                <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                  {item.jokes_question}
                  <div className="flex p-2 items-center">
                    <div className="flex">
                      <HeartIcon className="h-5 w-5" />
                    </div>
                    <div className="pr-2 flex">
                      <p>{item.like_count}</p>
                    </div>
                    <div>
                      <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    </div>
                    <div className="pr-2 flex">
                      <p>{item.comment_count}</p>
                    </div>
                    <div className="flex">
                      <Link to={`/${item.jokes_id}`} className="btn bg-orange">See More</Link>
                    </div>
                    <div className=" items-center hidden lg:flex lg:flex-1 lg:justify-end">
                      <p>{item.author}</p>
                      <UserIcon className="ml-2 h-5 w-5" />
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-labelledby="title-ac13 desc-ac13"
                  >
                    <title id="title-ac13">Open icon</title>
                    <desc id="desc-ac13">
                      icon that represents the state of the summary
                    </desc>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-slate-500">{item.jokes_answer}</p>
                <div className="row"></div>
              </details>
            </section>
          ))}
      </div>
    </>
  );
};

export default Dashboard;
