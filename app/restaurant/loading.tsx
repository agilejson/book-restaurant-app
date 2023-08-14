import React from "react";

const Loading = () => {
  return (
    <main className="h-screen">
      <div className="h-72 animate-pulse bg-slate-200">
        <div className={`bg-cover h-full`} />
      </div>
      <div className="flex m-auto w-2/3 xl:w-4/5 md:w-[100%] sm:w[98%] md:p-2 justify-between -mt-11">
        <div className="z-10 bg-white w-[70%] sm:w-[100%] p-3 animate-pulse">
          <nav className="flex text-reg border-b pb-2 animate-pulse">
            <h4 className="mr-7 animate-pulse">Overview</h4>
            <h4 className="animate-pulse">Menu</h4>
          </nav>

          <div className="mt-2 border-b pb-2 animate-pulse bg-slate-200 h-16"></div>

          <div className="flex items-end animate-pulse">
            <div className="ratings mt-2 flex items-center">
              <div className="flex items-center bg-slate-200 w-56"></div>
              <p className="text-reg ml-3"></p>
            </div>
            <div>
              <p className="text-reg ml-4"> </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
