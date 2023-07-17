"use client";
import Link from "next/link";
import AuthModel from "./AuthModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { data, loading } = useContext(AuthContext);
  const { signout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="" className="text-gray-700 text-3xl">
        Tavolo
      </Link>
      <div>
        <div className="flex">
          {data ? (
            <button className="bg-white text-black px-4" onClick={signout}>
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
