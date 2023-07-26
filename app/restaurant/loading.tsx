import React from "react";

const Loading = () => {
  return (
    <main>
      <div className="h-72 animate-pulse bg-slate-200">
        <div className={`bg-cover h-full`} />
      </div>
      <div className="flex m-auto w-2/3 xl:w-4/5 md:w-[100%] sm:w[98%] md:p-2 justify-between -mt-11">
        <div className="bg-white w-[70%] sm:w-[100%] p-3">
          <nav className="flex text-reg border-b pb-2">
            <h4 className="mr-7">Overview</h4>
            <p className="mr-7">Menu</p>
          </nav>

          <div className="mt-4 border-b pb-6 animate-pulse bg-slate-200 w-[400px] h-16 rounded"></div>

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
