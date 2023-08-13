"use client";
import { useContext, useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";

const Form = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const { data } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    bookerFirstName: data?.first_name || "",
    bookerLastName: data?.last_name || "",
    bookerEmail: data?.email || "",
    bookerPhone: data?.phone || "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [disabled, setDisabled] = useState(true);

  const { loading, error, createReservation } = useReservation();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [day, time] = date.split("T");

  const [didBook, setDidBook] = useState<boolean>(false);

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize: Number(partySize),
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      return setDisabled(false);
    }

    setDisabled(true);
  }, [inputs]);

  return (
    <div className="mt-10 sm:mt-4 max-w-[650px]">
      {didBook ? (
        <div>Booking Done!</div>
      ) : (
        <>
          <div className="flex sm:flex-col">
            <input
              type="text"
              className="border p-3 w-[50%]  mb-1 inline-block mr-1 sm:w-[100%]  sm:mr-auto"
              placeholder="First name"
              name="bookerFirstName"
              value={inputs.bookerFirstName}
              onChange={(e) => handleChangeInput(e)}
            />
            <input
              type="text"
              className="border p-3 w-[50%] mb-1 sm:w-[100%]   "
              placeholder="Last name"
              name="bookerLastName"
              value={inputs.bookerLastName}
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="flex sm:flex-col">
            <input
              type="text"
              className="border p-3 w-[50%] mb-1 inline-block mr-1 sm:w-[100%]  sm:mr-auto"
              placeholder="Phone number"
              name="bookerPhone"
              value={inputs.bookerPhone}
              onChange={(e) => handleChangeInput(e)}
            />
            <input
              type="text"
              className="border p-3 w-[50%] mb-1 sm:w-[100%] "
              placeholder="Email"
              name="bookerEmail"
              value={inputs.bookerEmail}
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="flex sm:flex-col">
            <input
              type="text"
              className="border p-3 w-[50%] mb-1 inline-block mr-1 sm:w-[100%]  sm:mr-auto"
              placeholder="Occasion (optional)"
              name="bookerOccasion"
              value={inputs.bookerOccasion}
              onChange={(e) => handleChangeInput(e)}
            />
            <input
              type="text"
              className="border p-3 w-[50%] mb-1 sm:w-[100%] "
              placeholder="Requests (optional)"
              name="bookerRequest"
              value={inputs.bookerRequest}
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <button
            disabled={disabled || loading}
            className="bg-red-500 hover:bg-red-600 w-full sm:w-[100%]  mt-2 p-3 text-white disabled:bg-gray-300 flex items-center justify-center"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
