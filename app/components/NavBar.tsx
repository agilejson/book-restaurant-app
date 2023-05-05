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
      <Link href="" className="font-bold text-gray-700 text-2xl">
        Tavolo
      </Link>
      <div>
        {!loading && (
          <div className="flex">
            {data ? (
              <button
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                onClick={signout}
              >
                Sign Out
              </button>
            ) : (
              <>
                <AuthModel isSignin={true} />
                <AuthModel isSignin={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
