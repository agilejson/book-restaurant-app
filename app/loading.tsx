import React from "react";
import Header from "./components/Header";

const Loading = () => {
  return (
    <main>
      <Header />
      <div className="bg-gray-100 py-3 mt-10 max-w-6xl sm:w-full m-auto flex flex-wrap justify-center">
        {Array(12)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white w-64 sm:w-80 h-72 m-3 overflow-hidden"
            ></div>
          ))}
      </div>
    </main>
  );
};

export default Loading;
