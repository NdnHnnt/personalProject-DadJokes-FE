/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function CTA() {
  return (
    <div className="container my-12 mx-auto md:px-6">
      <section className="mb-32 text-center">
        <div className="px-6 py-12 md:px-12">
          <h2 className="my-12 text-5xl text-black font-bold tracking-tight">
            Apakah Anda siap <br />
            <span className="text-turqoise">
              untuk ke-cringe-an ini?
            </span>
          </h2>
          <a
            className="mb-2 inline-block rounded bg-yellow px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-turqoise hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] md:mr-2 md:mb-0"
            data-te-ripple-init
            data-te-ripple-color="light"
            href="#!"
            role="button"
          >
            Mulai bercanda!
          </a>
          <a
            className="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-darkblue transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-blue focus:text-blue focus:outline-none focus:ring-0 active:text-darkblue-700"
            data-te-ripple-init
            data-te-ripple-color="light"
            href="#!"
            role="button"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>
    </div>
  );
}
