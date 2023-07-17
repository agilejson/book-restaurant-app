import React from "react";
import Header from "./components/Header";

const Loading = () => {
  return (
    <main>
      <Header />
      <div className="py-3 mt-10 flex flex-wrap  justify-center max-w-6xl m-auto">
        {Array(12)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white w-64 sm:w-80 h-78 m-3 overflow-hidden cursor-pointer"
            ></div>
          ))}
      </div>
    </main>
  );
};

export default Loading;
