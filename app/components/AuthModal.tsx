"use client";
import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";
import { Alert } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  background: "#f3f4f6",
};

export interface AuthInputType extends Object {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
  [key: string]: any;
}

const AuthModel = ({ isSignin }: { isSignin: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const [disabled, setDisabled] = useState(true);

  const [inputs, setInputs] = useState<AuthInputType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const { signin, signup } = useAuth();
  const { error, loading, setAuthState } = useContext(AuthContext);

  // this function will just return the content based on if we have to signin content or not
  const renderContent = (
    signinContent: string,
    signupContent: string
  ): string => {
    return isSignin ? signinContent : signupContent;
  };

  const handleSignin = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    const res = await signin({
      email: inputs.email,
      password: inputs.password,
    });
    setAuthState({ ...res });
    if (res.error === null) {
      handleClose();
    }
  };

  const submitHandler = () => {
    if (isSignin) {
      handleSignin();
    } else {
      // ! NEED TO IMPLEMENT LIKE SIGN IN
      signup({ ...inputs }, handleClose);
    }
  };

  useEffect(() => {
    // if any of input filed is empty disable the submit button
    if (isSignin) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      let isEmpty: boolean = false;
      // let input: string;
      // let inputs: AuthModalInputs;
      for (let input in inputs) {
        if (!inputs[input]) {
          isEmpty = true;
        }
      }
      if (!isEmpty) return setDisabled(false);
    }
    setDisabled(true);
  }, [inputs]);

  return (
    <div className="flex">
      <button onClick={handleOpen} className="text-md p-1 pl-4">
        {renderContent("Sign in", "Sign up")}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center text-red-500 mb-5">
                {renderContent(
                  "Log Into Your Account",
                  "Create Your Tavolo Account"
                )}
              </h2>
              <AuthModalInputs
                inputs={inputs}
                handleChange={handleChange}
                isSignin={isSignin}
                loading={loading}
              />
              {error && (
                <Alert severity="error" className="my-2">
                  {error}
                </Alert>
              )}
              <button
                className="mb-3 bg-red-500 hover:bg-red-600 transition-all mt-3 w-full p-3 text-white disabled:bg-gray-400"
                disabled={disabled}
                onClick={submitHandler}
              >
                {loading
                  ? renderContent("Signing In", "Creating Account")
                  : renderContent("Sign In", "Create Account")}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
