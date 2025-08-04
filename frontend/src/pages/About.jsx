import React from "react";
import { FaGithub, FaCode } from "react-icons/fa";
import Navigation from "../components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-black to-teal-600/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      <div className="absolute inset-0 bg-black/20"></div>

      <Navigation />
      <div className="relative z-10 pt-24 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Me
            </h1>
            <p className="text-emerald-100/60 text-lg">
              Meet the developer behind The Daily Post
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 overflow-hidden">

            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="relative">
                    <img
                      src="https://github.com/shreeteja172.png"
                      alt="Profile"
                      className="w-40 h-40 rounded-full mx-auto border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/25"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                      <span className="text-white font-bold text-sm">TDP</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Shreeteja
                  </h2>
                  <p className="text-emerald-100/80 mb-6 leading-relaxed">
                    I'm a developer passionate about building real-world apps.
                    Currently working on{" "}
                    <span className="text-emerald-400 font-medium">
                      The Daily Post
                    </span>
                    , a full-stack blogging platform that helps users share
                    their thoughts and connect with others through meaningful
                    content.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center md:justify-start">
                      <div className="bg-emerald-500/20 p-2 rounded-lg mr-3">
                        <FaGithub className="text-emerald-400" size={16} />
                      </div>
                      <a
                        href="https://github.com/shreeteja172"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 hover:underline"
                      >
                        github.com/shreeteja172
                      </a>
                    </div>

                    <div className="flex items-center justify-center md:justify-start">
                      <div className="bg-emerald-500/20 p-2 rounded-lg mr-3">
                        <FaCode className="text-emerald-400" size={16} />
                      </div>
                      <a
                        href="https://github.com/shreeteja172/The-Daily-Post"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 hover:underline"
                      >
                        Source Code: The Daily Post
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-emerald-500/20"></div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg mr-3 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                About This Project
              </h3>

              <div className="space-y-6">
                <p className="text-emerald-100/70 leading-relaxed">
                  <span className="text-emerald-400 font-medium">
                    The Daily Post
                  </span>{" "}
                  is a full-stack blogging application that allows users to
                  create, share, and discover compelling content. It features
                  user authentication, rich text editing, image uploads, and a
                  clean, modern interface.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">🎨</span>
                      <span className="text-emerald-400 font-medium">
                        Frontend
                      </span>
                    </div>
                    <p className="text-emerald-100/70 text-sm">
                      Built with <span className="text-white">React.js</span>{" "}
                      and <span className="text-white">Tailwind CSS</span> for a
                      modern, responsive, and interactive user experience.
                    </p>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">⚙️</span>
                      <span className="text-emerald-400 font-medium">
                        Backend
                      </span>
                    </div>
                    <p className="text-emerald-100/70 text-sm">
                      Powered by <span className="text-white">Node.js</span> and{" "}
                      <span className="text-white">Express.js</span> with{" "}
                      <span className="text-white">MongoDB</span> database and
                      JWT authentication.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-600/10 rounded-lg p-6 border border-emerald-500/20">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 text-emerald-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Key Features
                  </h4>
                  <ul className="text-emerald-100/70 text-sm space-y-1">
                    <li>• Rich text editor for blog creation</li>
                    <li>• Image upload with cloud storage integration</li>
                    <li>• User authentication and profile management</li>
                    <li>• Responsive design for all devices</li>
                    <li>• Real-time content management</li>
                  </ul>
                </div>

                <p className="text-emerald-100/70 leading-relaxed">
                  This project demonstrates my expertise in the{" "}
                  <span className="text-emerald-400 font-medium">
                    MERN stack
                  </span>{" "}
                  and showcases modern web development practices including
                  responsive design, state management, and secure authentication
                  systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
