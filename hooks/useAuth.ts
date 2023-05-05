import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../app/context/AuthContext";
import { getCookie } from "cookies-next";

interface signupDataType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthContext);

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      console.log(error.response.data.errorMessage);
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signup = async (
    signupData: signupDataType,
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          ...signupData,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      console.log(error.response.data.errorMessage);
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const fetchUser = async () => {
    try {
      // get JWT from cookie
      const jwt = getCookie("jwt");

      if (!jwt) {
        return {
          data: null,
          error: null,
          loading: false,
        };
      }

      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      });

      // send token for every request
      axios.defaults.headers.common["authorization"] = `Bearer ${jwt}`;

      return {
        data: response.data,
        error: "full",
        loading: false,
      };
    } catch (error: any) {
      console.log(error.data.response.errorMessage);
      return {
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      };
    }
  };

  return {
    signin,
    signup,
    fetchUser,
  };
};

export default useAuth;
