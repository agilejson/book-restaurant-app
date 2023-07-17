"use client";
import Link from "next/link";
import AuthModel from "./AuthModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { data } = useContext(AuthContext);
  const { signout } = useAuth();

  return (
    // <nav className="bg-gray-100 p-2 flex justify-between items-center backdrop-filter backdrop-blur-lg bg-opacity-30">
    <nav className="p-2 flex justify-between items-center sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30">
      <Link
        href=""
        className="font-bold text-3xl font-mono text-red-500 hover:text-red-600 transition-all"
      >
        Tavolo
      </Link>
      <div>
        <div className="flex">
          {data ? (
            <button className="bg-white text-black" onClick={signout}>
              Sign Out
            </button>
          ) : (
            <>
              <AuthModel isSignin={true} />
              <AuthModel isSignin={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
