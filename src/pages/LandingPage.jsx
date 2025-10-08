import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App_Features } from "../constants";
import { LuSparkles } from "react-icons/lu";
import { Login, SignUp } from "../pages/Auth";
import Modal from "../components/Modal";
const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const handleCTA = () => {};
  return (
    <>
      <div className="pb-36 w-full min-h-full bg-[#FFFCEP]">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold ">
              Interview Prep AI
            </div>
            <button
              className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer "
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          </header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              {/* Top Part */}
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles /> AI Powered
                </div>
              </div>
              {/*  */}
              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                For every question, the AI gives clear, detailed answers and
                explains the reasoning behind them, so you really understand.
                It&apos;s like having a mentor by your side, helping you prepare
                confidently and think on your feet. Instead of generic practice,
                you get focused guidance that saves time and builds real skills.
                By the end, you&apos;ll feel ready to tackle any interview
                scenario with ease.
              </p>

              <button className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="w-full min-h-full relative z-10 mb-56">
        <div className="">
          <section className="flex items-center justify-center -mt-36">
            <img src="" alt="" />
          </section>
        </div>

        {/* Features */}
        <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features That Make You Shine
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 ">
                {App_Features.map((item, index) => (
                  <div
                    key={item.id}
                    className={`
                      bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 border border-amber-100
                      ${index < 3 ? "md:col-span-4" : "md:col-span-6"}`}
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Modal  */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
