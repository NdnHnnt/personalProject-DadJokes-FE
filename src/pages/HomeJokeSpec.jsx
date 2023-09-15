/* eslint-disable no-unused-vars */
import axios from "axios";
import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../provider/authProvider";
import {
  HeartIcon as HeartOutline,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const navigation = [{ name: "Specific Jokes", href: "#" }];

export default function JokeSpecific() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token } = useAuth();
  const [isRequesting, setIsRequesting] = useState(false);
  const [response, setResponse] = useState(null);
  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [response3, setResponse3] = useState(null);
  const [jokeId, setJokeId] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split("/");
    const jokeId = parts[1];
    setJokeId(jokeId);
    console.log(jokeId);
  }, []);

  const handleClear = () => {
    setComment("");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDataSpecific = async (jokeId) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/jokes/${jokeId}`,
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.request(config);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRequesting) {
      return; // Prevent multiple requests
    }
    setIsRequesting(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/jokes/${jokeId}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response1 = await axios.request(config);
      setResponse1(response1.data);
    } catch (error) {
      console.log(error);
      setResponse1(error.response.data);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      console.log("Comment is empty or null. Please enter a comment.");
      return;
    }

    let data = JSON.stringify({
      comment: comment,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/jokes/${jokeId}/comment`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response1 = await axios.request(config);
      setResponse3(response1.data);
    } catch (error) {
      console.log(error);
      setResponse3(error.response.data);
    }
  };

  useEffect(() => {
    if (jokeId) {
      fetchDataSpecific(jokeId);
    }
  }, [fetchDataSpecific, jokeId, token]);

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
                href="/logout"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log Out <span aria-hidden="true">&rarr;</span>
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
                      href="/logout"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
      </div>

      <div className="pt-24 px-8">
        {response &&
          response.data.map((item) => (
            <div key={jokeId}>
              <div className="flex items-center gap-4">
                <div className="rounded-full w-12 h-12 bg-black overflow-hidden">
                  <img src="https://rairaksa.github.io/assets/img/rai.jpg" />
                </div>
                <div className="flex flex-col tracking-wider">
                  <label className="text-gray-600 font-bold text-base">
                    {item.author}
                  </label>
                  <label className="text-gray-400 font-normal text-sm">
                    Author
                  </label>
                </div>
              </div>
              <div className="w-full h-max flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-600 text-justify w-full pt-4">
                  {item.jokes_question}
                </h1>
                <h2 className="text-3xl text-gray-600 leading-relaxed text-justify w-full">
                  {item.jokes_answer}
                </h2>
              </div>
              <div className="flex items-center">
                <div className="flex pr-2">
                  <button className="btn bg-red" onClick={handleLike}>
                    <HeartSolid
                      className={`h-6 w-6 ${
                        item.is_liked === 1 ? "" : "hidden"
                      }`}
                      onClick={handleLike}
                    />
                    <HeartOutline
                      className={`h-6 w-6 ${
                        item.is_liked === 0 ? "" : "hidden"
                      }`}
                      onClick={handleLike}
                    />
                    {item.like_count}
                  </button>
                </div>
                <div className="flex pr-2">
                  <button className="btn bg-blue">
                    <ChatBubbleLeftRightIcon className="h-7 w-7" />
                    <p>{item.comment_count}</p>
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <ul
                  aria-label="User feed"
                  role="feed"
                  className={`relative flex-col gap-2 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200  flex`}
                >
                  <p
                    className={`py-3 pl-8 flex ${
                      item.comments === null ? "" : "hidden"
                    }`}
                  >
                    {" "}
                    Belum ditemukan komentar.
                  </p>
                  {item.comments &&
                    item.comments.length > 0 &&
                    item.comments.map((commentItem) => (
                      <li
                        // eslint-disable-next-line react/no-unknown-property
                        role="article"
                        className="relative pl-8"
                        key={commentItem.comment_id}
                      >
                        <div className="flex flex-col flex-1 ">
                          <h4 className="flex flex-col items-start text-lg font-medium leading-8 text-slate-700 md:flex-row lg:items-center">
                            <span className="flex-1">
                              {commentItem.username}
                              <span className="text-base font-normal text-slate-500">
                                {" "}
                                commented
                              </span>
                            </span>
                            <span className="text-sm font-normal text-slate-400">
                              {commentItem.timestamp}
                            </span>
                          </h4>
                          <p className=" text-slate-500">
                            {commentItem.comment}
                          </p>
                        </div>
                      </li>
                    ))}
                  <li role="article" className="relative pl-8">
                    <div className="flex flex-col flex-1">
                      <h4 className="flex flex-col items-start text-lg font-medium leading-8 text-slate-700 md:flex-row lg:items-center">
                        <span className="flex-1 pt-2">
                          Berkomentarlah
                          <span className="text-base font-normal text-slate-500">
                            {" "}
                            terkait candaan ini!
                          </span>
                        </span>
                      </h4>
                      {/* <p className=" text-slate-500">sss</p> */}
                      <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                        <div className="relative my-3">
                          <input
                            id="id-b02"
                            type="text"
                            name="id-b02"
                            placeholder="Pertanyaan Anda"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
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
                        <div className="flex">
                          <button
                            className="btn bg-turqoise"
                            onClick={handleComment}
                          >
                            Submit
                          </button>
                          <button className="btn bg-red" onClick={handleClear}>
                            Clear
                          </button>
                        </div>
                      </summary>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
