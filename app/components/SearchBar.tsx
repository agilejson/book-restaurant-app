"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  return (
    <div className="text-lg py-3 m-auto flex justify-center xsm:flex-col xsm:items-center">
      <input
        className="mr-3 p-2 w-1/3 sm:w-2/3 xsm:w-3/4 xsm:mr-0 border text-inherit outline-none"
        type="text"
        placeholder="State, city or town"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />
      <button
        className=" bg-red-500 hover:bg-red-600 px-8 sm:px-5 xsm:w-3/4 xsm:mt-2 py-2 text-white text-bold transition delay-100"
        onClick={() => {
          if (location === "") return;
          router.push(`/search?city=${location}`);
          setLocation("");
        }}
      >
        Let's go
      </button>
    </div>
  );
};

export default SearchBar;
